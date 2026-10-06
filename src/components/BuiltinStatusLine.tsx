import React, { useEffect, useState } from 'react';
import { Box, Text, stringWidth } from '@anthropic/ink';
import { formatTokens } from '../utils/format.js';
import { useTerminalSize } from '../hooks/useTerminalSize.js';

type RateLimitBucket = {
  utilization: number;
  resets_at: number;
};

type BuiltinStatusLineProps = {
  modelName: string;
  effortLabel: string;
  totalInputTokens: number;
  totalOutputTokens: number;
  contextUsedPct: number | null;
  usedTokens: number | null;
  contextWindowSize: number;
  rateLimits: {
    five_hour?: RateLimitBucket;
    seven_day?: RateLimitBucket;
  };
};

/**
 * Format a countdown from now until the given epoch time (in seconds).
 * Returns a compact human-readable string like "3h12m", "5d20h", "45m", or "now".
 */
export function formatCountdown(epochSeconds: number): string {
  const diff = epochSeconds - Date.now() / 1000;
  if (diff <= 0) return '现在';

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days >= 1) return `${days}d${hours}h`;
  if (hours >= 1) return `${hours}h${minutes}m`;
  return `${minutes}m`;
}

function BuiltinStatusLineInner({
  modelName,
  effortLabel,
  totalInputTokens,
  totalOutputTokens,
  contextUsedPct,
  usedTokens,
  contextWindowSize,
  rateLimits,
}: BuiltinStatusLineProps) {
  const { columns } = useTerminalSize();
  // Force re-render every 60s so countdowns stay current
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const hasResetTime = (rateLimits.five_hour?.resets_at ?? 0) || (rateLimits.seven_day?.resets_at ?? 0);
    if (!hasResetTime) return;
    const id = setInterval(() => setTick(t => t + 1), 60_000);
    return () => clearInterval(id);
  }, [rateLimits.five_hour?.resets_at, rateLimits.seven_day?.resets_at]);

  // Suppress unused-variable lint for tick (it exists only to trigger re-renders)
  void tick;

  const hasFiveHour = rateLimits.five_hour != null;
  const hasSevenDay = rateLimits.seven_day != null;

  const fiveHourPct = hasFiveHour ? Math.round(rateLimits.five_hour!.utilization * 100) : 0;
  const sevenDayPct = hasSevenDay ? Math.round(rateLimits.seven_day!.utilization * 100) : 0;

  // Token display: "50k/1M"
  const tokenDisplay = `${usedTokens === null ? '--' : formatTokens(usedTokens)}/${formatTokens(contextWindowSize)}`;
  const inputDisplay = formatTokens(totalInputTokens);
  const outputDisplay = formatTokens(totalOutputTokens);
  const percentageDisplay = `${contextUsedPct === null ? '--' : contextUsedPct}%`;
  const fullWidth = stringWidth(
    `模型 ${modelName}  思考强度 ${effortLabel}  累计输入 ${inputDisplay} tokens  累计输出 ${outputDisplay} tokens  上下文 ${tokenDisplay} tokens（${percentageDisplay}）`,
  );
  const compact = fullWidth > Math.max(1, columns - 4);
  const contextColor = (contextUsedPct ?? 0) >= 90 ? 'error' : (contextUsedPct ?? 0) >= 70 ? 'warning' : 'claude';

  return (
    <Box flexWrap="wrap" columnGap={2} width="100%">
      <Text>
        <Text dimColor>模型 </Text>
        <Text color="professionalBlue" bold>
          {modelName}
        </Text>
      </Text>
      <Text>
        <Text dimColor>{compact ? '思考 ' : '思考强度 '}</Text>
        <Text color="merged">{effortLabel}</Text>
      </Text>
      <Text>
        <Text dimColor>{compact ? '输入 ' : '累计输入 '}</Text>
        <Text color="success">{inputDisplay}</Text>
        {!compact && <Text dimColor> tokens</Text>}
      </Text>
      <Text>
        <Text dimColor>{compact ? '输出 ' : '累计输出 '}</Text>
        <Text color="professionalBlue">{outputDisplay}</Text>
        {!compact && <Text dimColor> tokens</Text>}
      </Text>
      <Text>
        <Text dimColor>上下文 </Text>
        <Text color={contextColor}>{tokenDisplay}</Text>
        <Text dimColor> tokens</Text>
        <Text color={contextColor}>（{percentageDisplay}）</Text>
      </Text>

      {/* 5-hour session rate limit */}
      {hasFiveHour && (
        <Text>
          <Text dimColor>会话 </Text>
          <Text>{fiveHourPct}%</Text>
          {rateLimits.five_hour!.resets_at > 0 && (
            <Text dimColor> {formatCountdown(rateLimits.five_hour!.resets_at)}</Text>
          )}
        </Text>
      )}

      {/* 7-day weekly rate limit */}
      {hasSevenDay && (
        <Text>
          <Text dimColor>本周 </Text>
          <Text>{sevenDayPct}%</Text>
          {rateLimits.seven_day!.resets_at > 0 && (
            <Text dimColor> {formatCountdown(rateLimits.seven_day!.resets_at)}</Text>
          )}
        </Text>
      )}
    </Box>
  );
}

export const BuiltinStatusLine = React.memo(BuiltinStatusLineInner);
