import React, { useEffect, useState } from 'react';
import type { CommandResultDisplay } from 'src/commands.js';
import { logEvent } from 'src/services/analytics/index.js';
import { logForDebugging } from 'src/utils/debug.js';
import { Box, Text, Dialog } from '@anthropic/ink';
import { execFileNoThrow } from '../utils/execFileNoThrow.js';
import { getPlansDirectory } from '../utils/plans.js';
import { setCwd } from '../utils/Shell.js';
import { cleanupWorktree, getCurrentWorktreeSession, keepWorktree, killTmuxSession } from '../utils/worktree.js';
import { Select } from './CustomSelect/select.js';
import { Spinner } from './Spinner.js';

// Inline require breaks the cycle this file would otherwise close:
// sessionStorage → commands → exit → ExitFlow → here. All call sites
// are inside callbacks, so the lazy require never sees an undefined import.
function recordWorktreeExit(): void {
  /* eslint-disable @typescript-eslint/no-require-imports */
  (require('../utils/sessionStorage.js') as typeof import('../utils/sessionStorage.js')).saveWorktreeState(null);
  /* eslint-enable @typescript-eslint/no-require-imports */
}

type Props = {
  onDone: (result?: string, options?: { display?: CommandResultDisplay }) => void;
  onCancel?: () => void;
};

export function WorktreeExitDialog({ onDone, onCancel }: Props): React.ReactNode {
  const [status, setStatus] = useState<'loading' | 'asking' | 'keeping' | 'removing' | 'done'>('loading');
  const [changes, setChanges] = useState<string[]>([]);
  const [commitCount, setCommitCount] = useState<number>(0);
  const [resultMessage, setResultMessage] = useState<string | undefined>();
  const worktreeSession = getCurrentWorktreeSession();

  useEffect(() => {
    async function loadChanges() {
      let changeLines: string[] = [];
      const gitStatus = await execFileNoThrow('git', ['status', '--porcelain']);
      if (gitStatus.stdout) {
        changeLines = gitStatus.stdout.split('\n').filter(_ => _.trim() !== '');
        setChanges(changeLines);
      }

      // Check for commits to eject
      if (worktreeSession) {
        // Get commits in worktree that are not in original branch
        const { stdout: commitsStr } = await execFileNoThrow('git', [
          'rev-list',
          '--count',
          `${worktreeSession.originalHeadCommit}..HEAD`,
        ]);
        const count = parseInt(commitsStr.trim(), 10) || 0;
        setCommitCount(count);

        // If no changes and no commits, clean up silently
        if (changeLines.length === 0 && count === 0) {
          setStatus('removing');
          void cleanupWorktree()
            .then(() => {
              process.chdir(worktreeSession.originalCwd);
              setCwd(worktreeSession.originalCwd);
              recordWorktreeExit();
              getPlansDirectory.cache.clear?.();
              setResultMessage('工作树已移除（无更改）');
            })
            .catch(error => {
              logForDebugging(`Failed to clean up worktree: ${error}`, {
                level: 'error',
              });
              setResultMessage('工作树清理失败，仍将退出');
            })
            .then(() => {
              setStatus('done');
            });
          return;
        } else {
          setStatus('asking');
        }
      }
    }
    void loadChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worktreeSession]);

  useEffect(() => {
    if (status === 'done') {
      onDone(resultMessage);
    }
  }, [status, onDone, resultMessage]);

  if (!worktreeSession) {
    onDone('未找到活动的工作树会话', { display: 'system' });
    return null;
  }

  if (status === 'loading' || status === 'done') {
    return null;
  }

  async function handleSelect(value: string) {
    if (!worktreeSession) return;

    const hasTmux = Boolean(worktreeSession.tmuxSessionName);

    if (value === 'keep' || value === 'keep-with-tmux') {
      setStatus('keeping');
      logEvent('tengu_worktree_kept', {
        commits: commitCount,
        changed_files: changes.length,
      });
      await keepWorktree();
      process.chdir(worktreeSession.originalCwd);
      setCwd(worktreeSession.originalCwd);
      recordWorktreeExit();
      getPlansDirectory.cache.clear?.();
      if (hasTmux) {
        setResultMessage(
          `工作树已保留。你的工作已保存在 ${worktreeSession.worktreePath}，分支为 ${worktreeSession.worktreeBranch}。可用以下命令重新接入 tmux 会话：tmux attach -t ${worktreeSession.tmuxSessionName}`,
        );
      } else {
        setResultMessage(
          `工作树已保留。你的工作已保存在 ${worktreeSession.worktreePath}，分支为 ${worktreeSession.worktreeBranch}`,
        );
      }
      setStatus('done');
    } else if (value === 'keep-kill-tmux') {
      setStatus('keeping');
      logEvent('tengu_worktree_kept', {
        commits: commitCount,
        changed_files: changes.length,
      });
      if (worktreeSession.tmuxSessionName) {
        await killTmuxSession(worktreeSession.tmuxSessionName);
      }
      await keepWorktree();
      process.chdir(worktreeSession.originalCwd);
      setCwd(worktreeSession.originalCwd);
      recordWorktreeExit();
      getPlansDirectory.cache.clear?.();
      setResultMessage(
        `工作树已保留在 ${worktreeSession.worktreePath}，分支为 ${worktreeSession.worktreeBranch}。Tmux 会话已终止。`,
      );
      setStatus('done');
    } else if (value === 'remove' || value === 'remove-with-tmux') {
      setStatus('removing');
      logEvent('tengu_worktree_removed', {
        commits: commitCount,
        changed_files: changes.length,
      });
      if (worktreeSession.tmuxSessionName) {
        await killTmuxSession(worktreeSession.tmuxSessionName);
      }
      try {
        await cleanupWorktree();
        process.chdir(worktreeSession.originalCwd);
        setCwd(worktreeSession.originalCwd);
        recordWorktreeExit();
        getPlansDirectory.cache.clear?.();
      } catch (error) {
        logForDebugging(`Failed to clean up worktree: ${error}`, {
          level: 'error',
        });
        setResultMessage('工作树清理失败，仍将退出');
        setStatus('done');
        return;
      }
      const tmuxNote = hasTmux ? ' Tmux 会话已终止。' : '';
      if (commitCount > 0 && changes.length > 0) {
        setResultMessage(
          `Worktree removed. ${commitCount} ${commitCount === 1 ? 'commit' : 'commits'} and uncommitted changes were discarded.${tmuxNote}`,
        );
      } else if (commitCount > 0) {
        setResultMessage(
          `Worktree removed. ${commitCount} ${commitCount === 1 ? 'commit' : 'commits'} on ${worktreeSession.worktreeBranch} ${commitCount === 1 ? 'was' : 'were'} discarded.${tmuxNote}`,
        );
      } else if (changes.length > 0) {
        setResultMessage(`工作树已移除。未提交的更改已丢弃。${tmuxNote}`);
      } else {
        setResultMessage(`工作树已移除。${tmuxNote}`);
      }
      setStatus('done');
    }
  }

  if (status === 'keeping') {
    return (
      <Box flexDirection="row" marginY={1}>
        <Spinner />
        <Text>正在保留工作树…</Text>
      </Box>
    );
  }

  if (status === 'removing') {
    return (
      <Box flexDirection="row" marginY={1}>
        <Spinner />
        <Text>正在移除工作树…</Text>
      </Box>
    );
  }

  const branchName = worktreeSession.worktreeBranch;
  const hasUncommitted = changes.length > 0;
  const hasCommits = commitCount > 0;

  let subtitle = '';
  if (hasUncommitted && hasCommits) {
    subtitle = `You have ${changes.length} uncommitted ${changes.length === 1 ? 'file' : 'files'} and ${commitCount} ${commitCount === 1 ? 'commit' : 'commits'} on ${branchName}. All will be lost if you remove.`;
  } else if (hasUncommitted) {
    subtitle = `You have ${changes.length} uncommitted ${changes.length === 1 ? 'file' : 'files'}. These will be lost if you remove the worktree.`;
  } else if (hasCommits) {
    subtitle = `You have ${commitCount} ${commitCount === 1 ? 'commit' : 'commits'} on ${branchName}. The branch will be deleted if you remove the worktree.`;
  } else {
    subtitle = '你正在工作树中工作。保留它可继续在其中工作，移除它则进行清理。';
  }

  function handleCancel() {
    if (onCancel) {
      // Abort exit and return to the session
      onCancel();
      return;
    }
    // Fallback: treat Escape as "keep" if no onCancel provided
    void handleSelect('keep');
  }

  const removeDescription =
    hasUncommitted || hasCommits ? '所有更改和提交都将丢失。' : '清理工作树目录。';

  const hasTmuxSession = Boolean(worktreeSession.tmuxSessionName);

  const options = hasTmuxSession
    ? [
        {
          label: '保留工作树和 tmux 会话',
          value: 'keep-with-tmux',
          description: `保持在 ${worktreeSession.worktreePath}。用以下命令重新接入：tmux attach -t ${worktreeSession.tmuxSessionName}`,
        },
        {
          label: '保留工作树，结束 tmux 会话',
          value: 'keep-kill-tmux',
          description: `保留工作树于 ${worktreeSession.worktreePath}，终止 tmux 会话。`,
        },
        {
          label: '移除工作树和 tmux 会话',
          value: 'remove-with-tmux',
          description: removeDescription,
        },
      ]
    : [
        {
          label: '保留工作树',
          value: 'keep',
          description: `保持在 ${worktreeSession.worktreePath}`,
        },
        {
          label: '移除工作树',
          value: 'remove',
          description: removeDescription,
        },
      ];

  const defaultValue = hasTmuxSession ? 'keep-with-tmux' : 'keep';

  return (
    <Dialog title="正在退出工作树会话" subtitle={subtitle} onCancel={handleCancel}>
      <Select defaultFocusValue={defaultValue} options={options} onChange={handleSelect} />
    </Dialog>
  );
}
