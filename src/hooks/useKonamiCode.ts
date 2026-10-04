'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '@/lib/sound';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonamiCode(onSuccess?: () => void) {
  const [keys, setKeys] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() === 'b' ? 'b' : e.key.toLowerCase() === 'a' ? 'a' : e.key;

      setKeys((prev) => {
        const updated = [...prev, key].slice(-KONAMI_CODE.length);
        const match = KONAMI_CODE.every((val, index) => val === updated[index]);
        if (match) {
          setIsUnlocked(true);
          soundFx.playSuccess();
          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#6366f1', '#38bdf8', '#a855f7', '#ec4899', '#22c55e'],
            });
          } catch {
            // Ignore confetti errors if not in browser context
          }
          if (onSuccess) {
            onSuccess();
          }
        }
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSuccess]);

  return { isUnlocked, reset: () => setIsUnlocked(false) };
}
