import * as React from 'react';
import { Box, Text } from '@anthropic/ink';

export type ClawdPose =
  | 'default'
  | 'arms-up' // kept for the click animation's frame table
  | 'look-left'
  | 'look-right';

type Props = {
  /**
   * Accepted and ignored — AnimatedClawd still drives its frame table through
   * this prop, but a wordmark has no poses to switch between. Only the
   * container offset moves, which reads as the mark bouncing.
   */
  pose?: ClawdPose;
};

// The mark: `TA` as solid block letters, one character per terminal cell.
// Every row is padded to the same width so the letters line up.
//
// Two rendering details this depends on:
//   - Filled cells are drawn as `█` *and* given a `clawd_body` background. The
//     glyph keeps Ink from dropping the run as trailing whitespace (a run of
//     spaces ending a row is trimmed away entirely, which would eat the top bar
//     of the `A`), while the matching background is what stops Apple's Terminal
//     from breaking the letters into horizontal stripes — it puts line spacing
//     between glyph rows but paints background colours contiguously.
//   - Four rows, not three, because `A` needs a crossbar row to read as an A.
const ART = ['██████  ████ ', '  ██   ██  ██', '  ██   ██████', '  ██   ██  ██'];

/** Rendered width of the mark. Callers reserve this much horizontal space. */
export const CLAWD_WIDTH = Math.max(...ART.map(row => row.length));

/** Rendered height of the mark. AnimatedClawd pins its container to this. */
export const CLAWD_HEIGHT = ART.length;

/** One art row: each run of filled or empty cells collapses into one span. */
function ArtRow({ row }: { row: string }): React.ReactNode {
  const spans: React.ReactNode[] = [];
  for (let start = 0; start < row.length; ) {
    const filled = row[start] === '█';
    let end = start;
    while (end < row.length && (row[end] === '█') === filled) end++;
    spans.push(
      <Text key={start} color={filled ? 'clawd_body' : undefined} backgroundColor={filled ? 'clawd_body' : undefined}>
        {row.slice(start, end)}
      </Text>,
    );
    start = end;
  }
  return <Text>{spans}</Text>;
}

export function Clawd(_props: Props = {}): React.ReactNode {
  return (
    <Box flexDirection="column">
      {ART.map((row, i) => (
        <ArtRow key={i} row={row} />
      ))}
    </Box>
  );
}
