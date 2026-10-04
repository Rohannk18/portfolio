'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '@/lib/sound';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export function MagneticButton({
  children,
  strength = 20,
  className = '',
  variant = 'primary',
  size = 'md',
  asLink = false,
  href = '#',
  target,
  rel,
  download,
  type = 'button',
  disabled = false,
  onClick,
  onMouseEnter,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnterInternal = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    soundFx.playHover();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClickInternal = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    soundFx.playClick();
    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-indigo-400/30 hover:brightness-110',
    secondary:
      'bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 hover:border-white/20 backdrop-blur-md',
    outline:
      'bg-transparent hover:bg-white/[0.04] text-zinc-300 hover:text-white border border-white/15 hover:border-indigo-400/50',
    ghost:
      'bg-transparent hover:bg-white/[0.06] text-zinc-400 hover:text-white border border-transparent',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5',
  };

  const combinedClasses = `inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (asLink) {
    return (
      <div
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <motion.a
          href={href}
          target={target}
          rel={rel}
          download={download}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.1 }}
          onMouseEnter={handleMouseEnterInternal}
          onClick={handleClickInternal}
          className={combinedClasses}
        >
          {children}
        </motion.a>
      </div>
    );
  }

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.button
        type={type}
        disabled={disabled}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.1 }}
        onMouseEnter={handleMouseEnterInternal}
        onClick={handleClickInternal}
        className={combinedClasses}
      >
        {children}
      </motion.button>
    </div>
  );
}
