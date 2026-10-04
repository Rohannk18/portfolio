'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '@/lib/sound';

export function SoundToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(soundFx.getMuted());
  }, []);

  const toggleSound = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    soundFx.setMuted(newMuted);
    if (!newMuted) {
      soundFx.playHover();
    }
  };

  return (
    <button
      onClick={toggleSound}
      title={muted ? 'Enable sound effects' : 'Mute sound effects'}
      aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'}
      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-colors duration-200"
    >
      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
    </button>
  );
}
