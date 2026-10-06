import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@anthropic/ink';
import { getInitialSettings } from '../../utils/settings/settings.js';
import { CLAWD_HEIGHT, Clawd, type ClawdPose } from './Clawd.js';

type Frame = { pose: ClawdPose; offset: number };

/** Hold a pose for n frames (60ms each). */
function hold(pose: ClawdPose, offset: number, frames: number): Frame[] {
  return Array.from({ length: frames }, () => ({ pose, offset }));
}

// Offset semantics: marginTop in a container pinned to CLAWD_HEIGHT. 0 = normal,
// 1 = crouched. Container height is fixed so the layout never shifts; during a
// crouch (offset=1) the mark's bottom row dips below the container and gets
// clipped — reads as "ducking below the frame" before springing back up.

// Click animation: crouch, then spring up. Twice.
const JUMP_WAVE: readonly Frame[] = [
  ...hold('default', 1, 2), // crouch
  ...hold('arms-up', 0, 3), // spring!
  ...hold('default', 0, 1),
  ...hold('default', 1, 2), // crouch again
  ...hold('arms-up', 0, 3), // spring!
  ...hold('default', 0, 1),
];

const CLICK_ANIMATIONS: readonly (readonly Frame[])[] = [JUMP_WAVE];

const IDLE: Frame = { pose: 'default', offset: 0 };
const FRAME_MS = 60;
const incrementFrame = (i: number) => i + 1;

/**
 * The mark with a click-triggered bounce. Container height is fixed at
 * CLAWD_HEIGHT — same footprint as a bare `<Clawd />` — so the surrounding
 * layout never shifts. During a crouch only the bottom row clips (see comment
 * above). Click only fires when mouse tracking is enabled (i.e. inside
 * `<AlternateScreen>` / fullscreen); elsewhere this renders and behaves
 * identically to plain `<Clawd />`.
 */
export function AnimatedClawd(): React.ReactNode {
  const { pose, bounceOffset, onClick } = useClawdAnimation();
  return (
    <Box height={CLAWD_HEIGHT} flexDirection="column" onClick={onClick}>
      <Box marginTop={bounceOffset} flexShrink={0}>
        <Clawd pose={pose} />
      </Box>
    </Box>
  );
}

function useClawdAnimation(): {
  pose: ClawdPose;
  bounceOffset: number;
  onClick: () => void;
} {
  // Read once at mount — no useSettings() subscription, since that would
  // re-render on any settings change.
  const [reducedMotion] = useState(() => getInitialSettings().prefersReducedMotion ?? false);
  const [frameIndex, setFrameIndex] = useState(-1);
  const sequenceRef = useRef<readonly Frame[]>(JUMP_WAVE);

  const onClick = () => {
    if (reducedMotion || frameIndex !== -1) return;
    sequenceRef.current = CLICK_ANIMATIONS[Math.floor(Math.random() * CLICK_ANIMATIONS.length)]!;
    setFrameIndex(0);
  };

  useEffect(() => {
    if (frameIndex === -1) return;
    if (frameIndex >= sequenceRef.current.length) {
      setFrameIndex(-1);
      return;
    }
    const timer = setTimeout(setFrameIndex, FRAME_MS, incrementFrame);
    return () => clearTimeout(timer);
  }, [frameIndex]);

  const seq = sequenceRef.current;
  const current = frameIndex >= 0 && frameIndex < seq.length ? seq[frameIndex]! : IDLE;
  return { pose: current.pose, bounceOffset: current.offset, onClick };
}
