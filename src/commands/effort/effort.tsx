import * as React from 'react';
import { EffortPanel } from '../../components/EffortPanel/EffortPanel.js';
import { useMainLoopModel } from '../../hooks/useMainLoopModel.js';
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from '../../services/analytics/index.js';
import { useAppState, useSetAppState } from '../../state/AppState.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import {
  type EffortValue,
  getDisplayedEffortLevel,
  getEffortEnvOverride,
  getEffortValueDescription,
  isEffortLevel,
  toPersistableEffort,
} from '../../utils/effort.js';
import { updateSettingsForSource } from '../../utils/settings/settings.js';

const COMMON_HELP_ARGS = ['help', '-h', '--help'];

type EffortCommandResult = {
  message: string;
  effortUpdate?: { value: EffortValue | undefined };
};

function setEffortValue(effortValue: EffortValue): EffortCommandResult {
  const persistable = toPersistableEffort(effortValue);
  if (persistable !== undefined) {
    const result = updateSettingsForSource('userSettings', {
      effortLevel: persistable,
    });
    if (result.error) {
      return {
        message: `设置推理投入级别失败：${result.error.message}`,
      };
    }
  }
  logEvent('tengu_effort_command', {
    effort: effortValue as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  });

  // Env var wins at resolveAppliedEffort time. Only flag it when it actually
  // conflicts — if env matches what the user just asked for, the outcome is
  // the same, so "Set effort to X" is true and the note is noise.
  const envOverride = getEffortEnvOverride();
  if (envOverride !== undefined && envOverride !== effortValue) {
    const envRaw = process.env.CLAUDE_CODE_EFFORT_LEVEL;
    if (persistable === undefined) {
      return {
        message: `未生效：本会话由 CLAUDE_CODE_EFFORT_LEVEL=${envRaw} 覆盖，且 ${effortValue} 仅对当前会话有效（未保存）`,
        effortUpdate: { value: effortValue },
      };
    }
    return {
      message: `本会话由 CLAUDE_CODE_EFFORT_LEVEL=${envRaw} 覆盖——清除该变量后 ${effortValue} 才会生效`,
      effortUpdate: { value: effortValue },
    };
  }

  const description = getEffortValueDescription(effortValue);
  const suffix = persistable !== undefined ? '' : ' (this session only)';
  return {
    message: `已将推理投入级别设为 ${effortValue}${suffix}：${description}`,
    effortUpdate: { value: effortValue },
  };
}

export function showCurrentEffort(appStateEffort: EffortValue | undefined, model: string): EffortCommandResult {
  const envOverride = getEffortEnvOverride();
  const effectiveValue = envOverride === null ? undefined : (envOverride ?? appStateEffort);
  if (effectiveValue === undefined) {
    const level = getDisplayedEffortLevel(model, appStateEffort);
    return { message: `推理投入级别：auto（当前为 ${level}）` };
  }
  const description = getEffortValueDescription(effectiveValue);
  return {
    message: `当前推理投入级别：${effectiveValue}（${description}）`,
  };
}

function unsetEffortLevel(): EffortCommandResult {
  const result = updateSettingsForSource('userSettings', {
    effortLevel: undefined,
  });
  if (result.error) {
    return {
      message: `设置推理投入级别失败：${result.error.message}`,
    };
  }
  logEvent('tengu_effort_command', {
    effort: 'auto' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  });
  // env=auto/unset (null) matches what /effort auto asks for, so only warn
  // when env is pinning a specific level that will keep overriding.
  const envOverride = getEffortEnvOverride();
  if (envOverride !== undefined && envOverride !== null) {
    const envRaw = process.env.CLAUDE_CODE_EFFORT_LEVEL;
    return {
      message: `已从设置中清除推理投入级别，但本会话仍由 CLAUDE_CODE_EFFORT_LEVEL=${envRaw} 控制`,
      effortUpdate: { value: undefined },
    };
  }
  return {
    message: '推理投入级别已设为 auto',
    effortUpdate: { value: undefined },
  };
}

export function executeEffort(args: string): EffortCommandResult {
  const normalized = args.toLowerCase();
  if (normalized === 'auto' || normalized === 'unset') {
    return unsetEffortLevel();
  }

  if (!isEffortLevel(normalized)) {
    return {
      message: `参数无效：${args}。可选值：low、medium、high、max、auto`,
    };
  }

  return setEffortValue(normalized);
}

function ShowCurrentEffort({ onDone }: { onDone: (result: string) => void }): React.ReactNode {
  const effortValue = useAppState(s => s.effortValue);
  const model = useMainLoopModel();
  const { message } = showCurrentEffort(effortValue, model);
  onDone(message);
  return null;
}

function ApplyEffortAndClose({
  result,
  onDone,
}: {
  result: EffortCommandResult;
  onDone: (result: string) => void;
}): React.ReactNode {
  const setAppState = useSetAppState();
  const { effortUpdate, message } = result;
  React.useEffect(() => {
    if (effortUpdate) {
      setAppState(prev => ({
        ...prev,
        effortValue: effortUpdate.value,
      }));
    }
    onDone(message);
  }, [setAppState, effortUpdate, message, onDone]);
  return null;
}

export async function call(onDone: LocalJSXCommandOnDone, _context: unknown, args?: string): Promise<React.ReactNode> {
  args = args?.trim() || '';

  if (COMMON_HELP_ARGS.includes(args)) {
    onDone(
      '用法：/effort [low|medium|high|xhigh|max|auto]\n\n推理投入级别：\n- low：快速、直接的实现\n- medium：均衡方案，常规测试\n- high：完整实现，充分测试\n- xhigh：比 high 更深、但未达 max 的扩展推理；包含 ChatGPT Codex 模型\n- max：最强能力，最深推理\n- auto：使用该模型的默认推理投入级别',
    );
    return;
  }

  if (!args || args === 'current' || args === 'status') {
    if (args === 'current' || args === 'status') {
      return <ShowCurrentEffort onDone={onDone} />;
    }
    // 完全无参 → 打开交互面板
    return <EffortPanelWrapper onDone={onDone} />;
  }

  const result = executeEffort(args);
  return <ApplyEffortAndClose result={result} onDone={onDone} />;
}

function EffortPanelWrapper({ onDone }: { onDone: (result: string) => void }): React.ReactNode {
  const effortValue = useAppState(s => s.effortValue);
  return <EffortPanel appStateEffort={effortValue} onDone={onDone} />;
}
