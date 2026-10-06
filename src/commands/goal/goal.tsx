/**
 * `/goal` slash command — set, view, or control the persistent thread
 * goal that drives auto-continuation across turns.
 *
 * Subcommands
 * -----------
 * `/goal`              -> show current status
 * `/goal status`       -> alias of bare `/goal`
 * `/goal clear`        -> remove the active goal (persists tombstone)
 * `/goal pause`        -> pause auto-continuation
 * `/goal resume`       -> resume from paused state
 * `/goal continue`     -> reset turn counter after max-turns and continue
 * `/goal complete`     -> mark complete (manual override; tools usually do this)
 * `/goal <objective>`  -> set a new goal; if one is already active and not
 *                         complete, a confirmation dialog appears first.
 */
import * as React from 'react';

import type { LocalJSXCommandContext } from 'src/commands.js';
import {
  clearGoal,
  completeGoal,
  continueGoalFromMaxTurns,
  formatGoalElapsed,
  formatGoalStatusLabel,
  getGoal,
  incrementGoalTurns,
  MAX_GOAL_TURNS,
  pauseGoal,
  resumeGoal,
  setGoal,
} from 'src/services/goal/goalState.js';
import { persistCurrentGoal, persistGoalClear } from 'src/services/goal/goalStorage.js';
import type { LocalJSXCommandOnDone } from 'src/types/command.js';
import { removeByFilter } from 'src/utils/messageQueueManager.js';
import { GoalReplaceConfirmDialog } from './GoalReplaceConfirmDialog.js';

const MAX_OBJECTIVE_CHARS = 4000;
const MAX_DISPLAY_CHARS = 80;

function truncateForDisplay(objective: string): string {
  const firstLine = objective.split('\n')[0] ?? objective;
  if (firstLine.length <= MAX_DISPLAY_CHARS) return firstLine;
  return firstLine.slice(0, MAX_DISPLAY_CHARS) + '…';
}

function drainGoalContinuationQueue(): void {
  removeByFilter(cmd => cmd.origin === 'goal-continuation' || cmd.origin === 'goal-budget-limit');
}

function formatGoalStatus(): string {
  const goal = getGoal();
  if (!goal) {
    return '当前没有目标。可用 `/goal <目标描述>` 设置一个。';
  }
  const tokens = goal.tokenBudget !== null ? `${goal.tokensUsed} / ${goal.tokenBudget}` : `${goal.tokensUsed}`;
  const lines = [
    `目标：${goal.objective}`,
    `状态：${formatGoalStatusLabel(goal.status)}`,
    `耗时：${formatGoalElapsed(goal)}`,
    `Token：${tokens}`,
    `续接轮次：${goal.turnsExecuted}`,
  ];

  if (goal.status === 'max_turns') {
    lines.push(
      `Hint: Max continuation turns reached (${MAX_GOAL_TURNS}). Run \`/goal continue\` to reset and continue.`,
    );
  }

  return lines.join('\n');
}

function applySetGoal(objective: string): string {
  setGoal(objective);
  incrementGoalTurns();
  persistCurrentGoal();
  return '目标已设置。';
}

export async function call(
  onDone: LocalJSXCommandOnDone,
  _context: LocalJSXCommandContext,
  args: string,
): Promise<React.ReactNode> {
  const trimmed = args.trim();

  if (!trimmed || trimmed.toLowerCase() === 'status') {
    onDone(formatGoalStatus(), { display: 'system' });
    return null;
  }

  const lower = trimmed.toLowerCase();

  if (lower === 'clear') {
    const cleared = clearGoal();
    if (cleared) {
      persistGoalClear();
      drainGoalContinuationQueue();
    }
    onDone(cleared ? '目标已清除。' : '没有可清除的目标。', {
      display: 'system',
    });
    return null;
  }

  if (lower === 'pause') {
    const g = pauseGoal();
    if (g) {
      persistCurrentGoal();
      drainGoalContinuationQueue();
    }
    onDone(g ? '目标已暂停。' : '没有可暂停的目标。', {
      display: 'system',
    });
    return null;
  }

  if (lower === 'resume') {
    const current = getGoal();
    if (current?.status === 'max_turns') {
      onDone(
        `Goal reached max continuation turns (${MAX_GOAL_TURNS}). Run \`/goal continue\` to reset turn counter and continue.`,
        { display: 'system' },
      );
      return null;
    }
    const g = resumeGoal();
    if (g) persistCurrentGoal();
    onDone(g ? '目标已恢复。' : '没有已暂停的目标可恢复。', {
      display: 'system',
      shouldQuery: Boolean(g),
    });
    return null;
  }

  if (lower === 'continue') {
    const g = continueGoalFromMaxTurns();
    if (g) persistCurrentGoal();
    onDone(
      g
        ? `目标续接计数已重置（0/${MAX_GOAL_TURNS}）。继续执行...`
        : '当前目标并非处于「达到最大轮次」状态。',
      {
        display: 'system',
        shouldQuery: Boolean(g),
      },
    );
    return null;
  }

  if (lower === 'complete') {
    const g = completeGoal();
    if (g) {
      persistCurrentGoal();
      drainGoalContinuationQueue();
    }
    onDone(g ? '目标已标记为完成。' : '没有可标记完成的目标。', {
      display: 'system',
    });
    return null;
  }

  if (trimmed.length > MAX_OBJECTIVE_CHARS) {
    onDone(
      `目标描述过长（${trimmed.length} 字符；上限 ${MAX_OBJECTIVE_CHARS}）。请把详细说明保存到文件中，再用一段简短的目标引用它。`,
      { display: 'system' },
    );
    return null;
  }

  const existing = getGoal();
  const needsConfirmation = existing && existing.status !== 'complete';

  if (!needsConfirmation) {
    const summary = applySetGoal(trimmed);
    onDone(summary, {
      display: 'system',
      shouldQuery: true,
      displayArgs: truncateForDisplay(trimmed),
      metaMessages: [`<goal-objective-updated>\n${trimmed}\n</goal-objective-updated>`],
    });
    return null;
  }

  return (
    <GoalReplaceConfirmDialog
      currentGoal={existing}
      newObjective={trimmed}
      onConfirm={() => {
        drainGoalContinuationQueue();
        const summary = applySetGoal(trimmed);
        onDone(summary, {
          display: 'system',
          shouldQuery: true,
          displayArgs: truncateForDisplay(trimmed),
          metaMessages: [`<goal-objective-updated>\n${trimmed}\n</goal-objective-updated>`],
        });
      }}
      onCancel={() => {
        onDone('已保留当前目标，新目标描述已丢弃。', {
          display: 'system',
        });
      }}
    />
  );
}
