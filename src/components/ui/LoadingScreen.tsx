'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const statuses = [
    'INITIALIZING SYSTEM...',
    'LOADING CORE MODULES...',
    'CONFIGURING ARCHITECTURE...',
    'ESTABLISHING CONNECTION...',
    'READY',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onLoadingComplete, 600);
          }, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 8;
        const next = Math.min(prev + increment, 100);

        const newIndex = Math.min(
          Math.floor((next / 100) * (statuses.length - 1)),
          statuses.length - 1
        );
        setStatusIndex(newIndex);
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onLoadingComplete, statuses.length]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0e17] text-white select-none px-6"
        >
          {/* Background subtle glow */}
          <div className="absolute w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-md flex flex-col items-center">
            {/* Monogram / Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-mono font-bold text-lg shadow-lg shadow-indigo-500/20">
                RN
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">ROHAN NAIK</h1>
                <p className="text-xs font-mono text-zinc-400">SOFTWARE DEVELOPER</p>
              </div>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full bg-white/5 border border-white/10 rounded-full h-1.5 p-0.5 overflow-hidden mb-4 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
              />
            </div>

            {/* Status & Numeric Percentage */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                {statuses[statusIndex]}
              </span>
              <span className="text-indigo-400 font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
