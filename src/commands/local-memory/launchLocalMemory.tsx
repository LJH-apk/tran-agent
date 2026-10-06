import React from 'react';
import { Box, Dialog, Text, useInput } from '@anthropic/ink';
import type { LocalJSXCommandCall, LocalJSXCommandOnDone } from '../../types/command.js';
import {
  listStores,
  createStore,
  setEntry,
  getEntry,
  listEntries,
  archiveStore,
  isValidStoreName,
} from '../../services/SessionMemory/multiStore.js';
import { isValidKey } from '../../utils/localValidate.js';
import TextInput from '../../components/TextInput.js';
import { LocalMemoryView } from './LocalMemoryView.js';
import { parseLocalMemoryArgs } from './parseArgs.js';
import { launchCommand } from '../_shared/launchCommand.js';
import { padEndWidth } from '../../utils/truncate.js';

const USAGE =
  '用法：/local-memory list | create STORE | store STORE KEY VALUE | fetch STORE KEY | entries STORE | archive STORE';

type LocalMemoryViewProps = React.ComponentProps<typeof LocalMemoryView>;

type LocalMemoryAction = {
  label: string;
  description: string;
  run: () => void;
};

const ACTION_LABEL_COLUMN_WIDTH = 26;

function formatStoreList(stores: string[]): string {
  if (stores.length === 0) {
    return '未找到任何记忆库。';
  }
  return ['本地记忆库', ...stores.map(store => `- ${store}`)].join('\n');
}

function formatEntryList(store: string, keys: string[]): string {
  if (keys.length === 0) {
    return `"${store}" 中没有条目。`;
  }
  return [`"${store}" 中的条目`, ...keys.map(key => `- ${key}`)].join('\n');
}

// ── Interactive multi-step panel ───────────────────────────────────────────
// State machine:
//   menu                 — pick an action
//   collect-store        — input STORE_NAME (Create/Store/Fetch/Entries/Archive)
//   collect-key          — input KEY (Store/Fetch)
//   collect-value        — input VALUE (Store)
//   confirm-archive      — Y/N confirmation (Archive)
//   confirm-overwrite    — Y/N confirmation (Store when key exists)
// Each step has inline validation; Esc cancels back to menu (or closes from menu).

type ActionKind = 'list' | 'create' | 'store' | 'fetch' | 'entries' | 'archive' | 'about';

type Step =
  | { kind: 'menu' }
  | { kind: 'collect-store'; action: ActionKind }
  | { kind: 'collect-key'; action: ActionKind; store: string }
  | { kind: 'collect-value'; action: ActionKind; store: string; key: string }
  | {
      kind: 'confirm-archive';
      store: string;
    }
  | {
      kind: 'confirm-overwrite';
      store: string;
      key: string;
      value: string;
    };

const MENU: Array<{
  kind: ActionKind;
  label: string;
  description: string;
}> = [
  { kind: 'list', label: '列表', description: '显示所有记忆库' },
  {
    kind: 'create',
    label: '创建',
    description: '新建一个记忆库',
  },
  {
    kind: 'store',
    label: '写入',
    description: '写入条目：记忆库名称 + 键 + 值',
  },
  {
    kind: 'fetch',
    label: '读取',
    description: '按记忆库名称 + 键读取条目',
  },
  {
    kind: 'entries',
    label: '条目',
    description: '列出某个记忆库中的条目键',
  },
  {
    kind: 'archive',
    label: '归档',
    description: '归档记忆库（重命名为 *.archived）',
  },
  {
    kind: 'about',
    label: '关于',
    description: '显示命令语法',
  },
];

function LocalMemoryPanel({ onDone }: { onDone: LocalJSXCommandOnDone }): React.ReactNode {
  const [step, setStep] = React.useState<Step>({ kind: 'menu' });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [textValue, setTextValue] = React.useState('');
  const [cursorOffset, setCursorOffset] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  // Reset text/error when step transitions
  const transition = React.useCallback((next: Step) => {
    setStep(next);
    setTextValue('');
    setCursorOffset(0);
    setError(null);
  }, []);

  const closeWith = React.useCallback((msg: string) => onDone(msg, { display: 'system' }), [onDone]);

  // Run an action when it has all required inputs.
  const runAction = React.useCallback(
    (
      action: ActionKind,
      store: string | undefined,
      key: string | undefined,
      value: string | undefined,
      opts: { confirmedOverwrite?: boolean } = {},
    ) => {
      try {
        if (action === 'list') {
          closeWith(formatStoreList(listStores()));
          return;
        }
        if (action === 'about') {
          closeWith(USAGE);
          return;
        }
        if (!store) {
          setError('内部错误：缺少记忆库');
          return;
        }
        if (action === 'create') {
          createStore(store);
          closeWith(`记忆库已创建：${store}`);
          return;
        }
        if (action === 'entries') {
          const keys = listEntries(store);
          closeWith(formatEntryList(store, keys));
          return;
        }
        if (action === 'archive') {
          archiveStore(store);
          closeWith(`已归档记忆库：${store}`);
          return;
        }
        if (action === 'fetch') {
          if (!key) {
            setError('内部错误：缺少键');
            return;
          }
          const v = getEntry(store, key);
          if (v === null) {
            closeWith(`未找到条目：${store}/${key}`);
            return;
          }
          closeWith(`已读取条目：${store}/${key}\n\n${v}`);
          return;
        }
        if (action === 'store') {
          if (!key || value === undefined) {
            setError('内部错误：缺少键或值');
            return;
          }
          // Confirm overwrite if key already exists (safety prompt)
          if (!opts.confirmedOverwrite && getEntry(store, key) !== null) {
            transition({
              kind: 'confirm-overwrite',
              store,
              key,
              value,
            });
            return;
          }
          setEntry(store, key, value);
          closeWith(`已写入 ${store}/${key}（${value.length} 个字符）`);
          return;
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    },
    [closeWith, transition],
  );

  // ── Menu step ──────────────────────────────────────────────────────────
  useInput(
    (input, key) => {
      if (step.kind !== 'menu') return;
      if (key.upArrow) {
        setSelectedIndex(idx => Math.max(0, idx - 1));
        return;
      }
      if (key.downArrow) {
        setSelectedIndex(idx => Math.min(MENU.length - 1, idx + 1));
        return;
      }
      if (key.return) {
        const choice = MENU[selectedIndex];
        if (!choice) return;
        if (choice.kind === 'list' || choice.kind === 'about') {
          runAction(choice.kind, undefined, undefined, undefined);
          return;
        }
        // Everything else needs a store
        transition({ kind: 'collect-store', action: choice.kind });
        return;
      }
      // Quick-key shortcuts: 1..7
      const n = Number(input);
      if (Number.isInteger(n) && n >= 1 && n <= MENU.length) {
        setSelectedIndex(n - 1);
      }
    },
    { isActive: step.kind === 'menu' },
  );

  // ── confirm-archive / confirm-overwrite Y/N handling ───────────────────
  useInput(
    (input, key) => {
      if (step.kind !== 'confirm-archive' && step.kind !== 'confirm-overwrite') {
        return;
      }
      if (key.escape) {
        transition({ kind: 'menu' });
        return;
      }
      const ch = input.toLowerCase();
      if (ch === 'y' || key.return) {
        if (step.kind === 'confirm-archive') {
          runAction('archive', step.store, undefined, undefined);
        } else {
          runAction('store', step.store, step.key, step.value, {
            confirmedOverwrite: true,
          });
        }
      } else if (ch === 'n') {
        transition({ kind: 'menu' });
      }
    },
    {
      isActive: step.kind === 'confirm-archive' || step.kind === 'confirm-overwrite',
    },
  );

  // Esc to back-step in collect-* steps
  useInput(
    (_input, key) => {
      if (step.kind !== 'collect-store' && step.kind !== 'collect-key' && step.kind !== 'collect-value') {
        return;
      }
      if (key.escape) {
        // Walk back one step
        if (step.kind === 'collect-value') {
          transition({
            kind: 'collect-key',
            action: step.action,
            store: step.store,
          });
          return;
        }
        if (step.kind === 'collect-key') {
          transition({ kind: 'collect-store', action: step.action });
          return;
        }
        // collect-store → menu
        transition({ kind: 'menu' });
      }
    },
    {
      isActive: step.kind === 'collect-store' || step.kind === 'collect-key' || step.kind === 'collect-value',
    },
  );

  // ── Render ──────────────────────────────────────────────────────────────
  if (step.kind === 'menu') {
    return (
      <Dialog
        title="本地记忆"
        subtitle={`${MENU.length} 个操作`}
        onCancel={() => closeWith('已关闭本地记忆面板')}
        color="background"
        hideInputGuide
      >
        <Box flexDirection="column">
          {MENU.map((m, i) => (
            <Box key={m.kind} flexDirection="row">
              <Text>{padEndWidth(`${i === selectedIndex ? '›' : ' '} ${m.label}`, ACTION_LABEL_COLUMN_WIDTH)}</Text>
              <Text dimColor>{m.description}</Text>
            </Box>
          ))}
          <Box marginTop={1}>
            <Text dimColor>↑/↓ 或 1-7 选择 · Enter 执行 · Esc 关闭</Text>
          </Box>
        </Box>
      </Dialog>
    );
  }

  // Confirmation prompts
  if (step.kind === 'confirm-archive') {
    return (
      <Dialog title="确认归档" onCancel={() => transition({ kind: 'menu' })} color="warning" hideInputGuide>
        <Box flexDirection="column">
          <Text>Archive store "{step.store}"? This renames it to *.archived.</Text>
          <Box marginTop={1}>
            <Text dimColor>y/Enter = 归档 · n/Esc = 取消</Text>
          </Box>
        </Box>
      </Dialog>
    );
  }
  if (step.kind === 'confirm-overwrite') {
    return (
      <Dialog title="确认覆盖" onCancel={() => transition({ kind: 'menu' })} color="warning" hideInputGuide>
        <Box flexDirection="column">
          <Text>
            Entry "{step.store}/{step.key}" already exists. Overwrite with new value ({step.value.length} chars)?
          </Text>
          <Box marginTop={1}>
            <Text dimColor>y/Enter = 覆盖 · n/Esc = 取消</Text>
          </Box>
        </Box>
      </Dialog>
    );
  }

  // collect-* steps share the same TextInput render
  const fieldLabel = step.kind === 'collect-store' ? '记忆库名称' : step.kind === 'collect-key' ? '键名称' : '值';
  const placeholder =
    step.kind === 'collect-store'
      ? '例如 my-notes'
      : step.kind === 'collect-key'
        ? '例如 todo-2026-05-08'
        : '自由文本';
  const validateAndAdvance = (raw: string) => {
    const trimmed = raw.trim();
    if (step.kind === 'collect-store') {
      if (!trimmed) {
        setError('必须填写记忆库名称');
        return;
      }
      if (!isValidStoreName(trimmed)) {
        setError('Invalid store name (no /, \\, :, null byte, or leading dot; max 255 chars)');
        return;
      }
      // Action-specific completion
      if (step.action === 'create' || step.action === 'entries' || step.action === 'archive') {
        if (step.action === 'archive') {
          transition({ kind: 'confirm-archive', store: trimmed });
        } else {
          runAction(step.action, trimmed, undefined, undefined);
        }
      } else {
        // Store / Fetch — need key next
        transition({
          kind: 'collect-key',
          action: step.action,
          store: trimmed,
        });
      }
      return;
    }
    if (step.kind === 'collect-key') {
      if (!trimmed) {
        setError('必须填写键');
        return;
      }
      if (!isValidKey(trimmed)) {
        setError('键无效（仅允许字母/数字/._-；不能以点开头；不能是 Windows 保留名称）');
        return;
      }
      if (step.action === 'fetch') {
        runAction('fetch', step.store, trimmed, undefined);
      } else {
        // store action — collect value next
        transition({
          kind: 'collect-value',
          action: 'store',
          store: step.store,
          key: trimmed,
        });
      }
      return;
    }
    if (step.kind === 'collect-value') {
      // Value can be empty (allowed). Just submit.
      runAction('store', step.store, step.key, raw);
    }
  };

  return (
    <Dialog
      title={`本地记忆 · ${step.kind.replace('collect-', '').toUpperCase()}`}
      onCancel={() => transition({ kind: 'menu' })}
      color="background"
      hideInputGuide
    >
      <Box flexDirection="column">
        <Box>
          <Text dimColor>{fieldLabel}</Text>
        </Box>
        <Box>
          <Text>{'> '}</Text>
          <TextInput
            value={textValue}
            onChange={v => {
              setTextValue(v);
              setError(null);
            }}
            cursorOffset={cursorOffset}
            onChangeCursorOffset={setCursorOffset}
            onSubmit={validateAndAdvance}
            placeholder={placeholder}
            columns={70}
            showCursor
          />
        </Box>
        {error !== null && (
          <Box marginTop={0}>
            <Text color="warning">✗ {error}</Text>
          </Box>
        )}
        <Box marginTop={1}>
          <Text dimColor>Enter = 下一步 · Esc = 返回</Text>
        </Box>
      </Box>
    </Dialog>
  );
}

async function dispatchLocalMemory(
  parsed: ReturnType<typeof parseLocalMemoryArgs>,
  onDone: LocalJSXCommandOnDone,
): Promise<LocalMemoryViewProps | null> {
  if (parsed.action === 'list') {
    const stores = listStores();
    onDone(formatStoreList(stores), { display: 'system' });
    return null;
  }

  if (parsed.action === 'create') {
    const { store } = parsed;
    createStore(store);
    onDone(`记忆库已创建：${store}`, { display: 'system' });
    return null;
  }

  if (parsed.action === 'store') {
    const { store, key, value } = parsed;
    setEntry(store, key, value);
    onDone(`已把条目 "${key}" 写入记忆库 "${store}"。`, { display: 'system' });
    return null;
  }

  if (parsed.action === 'fetch') {
    const { store, key } = parsed;
    const value = getEntry(store, key);
    if (value === null) {
      onDone(`未找到条目：${store}/${key}`, { display: 'system' });
      return null;
    }
    onDone(`已读取条目：${store}/${key}\n${value}`, { display: 'system' });
    return null;
  }

  if (parsed.action === 'entries') {
    const { store } = parsed;
    const keys = listEntries(store);
    onDone(formatEntryList(store, keys), { display: 'system' });
    return null;
  }

  if (parsed.action === 'archive') {
    const { store } = parsed;
    archiveStore(store);
    onDone(`已归档记忆库：${store}`, { display: 'system' });
    return null;
  }

  // Exhaustive guard
  onDone(USAGE, { display: 'system' });
  return null;
}

const callLocalMemoryDirect: LocalJSXCommandCall = launchCommand<
  ReturnType<typeof parseLocalMemoryArgs>,
  LocalMemoryViewProps
>({
  commandName: 'local-memory',
  parseArgs: (raw: string) => {
    const result = parseLocalMemoryArgs(raw);
    if (result.action === 'invalid') {
      return { action: 'invalid' as const, reason: `${USAGE}\n${result.reason}` };
    }
    return result;
  },
  dispatch: dispatchLocalMemory,
  View: LocalMemoryView,
  errorView: (msg: string) => React.createElement(LocalMemoryView, { mode: 'error', message: msg }),
});

export const callLocalMemory: LocalJSXCommandCall = async (onDone, context, args) => {
  if ((args ?? '').trim() === '') {
    return <LocalMemoryPanel onDone={onDone} />;
  }
  return callLocalMemoryDirect(onDone, context, args);
};
