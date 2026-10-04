'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text' | 'click'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]');
      const projectCard = target.closest('[data-cursor-project]');
      const customTextEl = target.closest('[data-cursor-text]');

      if (customTextEl) {
        setCursorState('text');
        setCursorText(customTextEl.getAttribute('data-cursor-text') || 'VIEW');
      } else if (projectCard) {
        setCursorState('text');
        setCursorText('VIEW PROJECT');
      } else if (interactiveEl) {
        setCursorState('hover');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const onMouseDown = () => setCursorState('click');
    const onMouseUp = () => setCursorState('default');
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Small precision center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-white mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: cursorState === 'click' ? 0.5 : cursorState === 'hover' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.05 }}
      />

      {/* Trailing interactive ring / capsule */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border transition-colors duration-150 ${
          cursorState === 'text'
            ? 'bg-indigo-600/90 text-white font-mono text-[10px] font-bold tracking-wider uppercase border-indigo-400/50 shadow-lg shadow-indigo-500/40 px-3'
            : cursorState === 'hover'
            ? 'border-indigo-400 bg-indigo-500/20 backdrop-blur-[2px]'
            : 'border-white/30 bg-white/[0.02]'
        }`}
        animate={{
          x: cursorState === 'text' ? mousePosition.x - 45 : mousePosition.x - (cursorState === 'hover' ? 24 : 16),
          y: mousePosition.y - (cursorState === 'text' ? 16 : cursorState === 'hover' ? 24 : 16),
          width: cursorState === 'text' ? 90 : cursorState === 'hover' ? 48 : 32,
          height: cursorState === 'text' ? 32 : cursorState === 'hover' ? 48 : 32,
          scale: cursorState === 'click' ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.1 }}
      >
        {cursorState === 'text' && (
          <span className="whitespace-nowrap select-none">{cursorText}</span>
        )}
      </motion.div>
    </>
  );
}
