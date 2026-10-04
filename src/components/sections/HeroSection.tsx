'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Mail,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { portfolioData } from '@/data/portfolio';
import { HeroCanvas } from '@/components/3d/HeroCanvas';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { scrollToSection } from '@/lib/utils';

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = portfolioData.personal.roleSwitcher;

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden select-none"
    >
      {/* 3D Background Canvas */}
      <HeroCanvas />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-xs font-mono text-indigo-300 mb-8 backdrop-blur-md shadow-lg shadow-indigo-950/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{portfolioData.personal.availability}</span>
        </motion.div>

        {/* Main Name & Title Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 mb-6"
        >
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-zinc-400 uppercase">
            B.Tech Computer Science • Sapthagiri College of Engineering (2026)
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none">
            ROHAN M <span className="gradient-text-accent">NAIK</span>
          </h1>
        </motion.div>

        {/* Animated Role Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="h-10 sm:h-12 flex items-center justify-center mb-6 overflow-hidden"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-300 flex items-center gap-2 font-mono">
            <span>&gt;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="gradient-text font-bold text-white"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="inline-block w-2.5 h-6 bg-indigo-400 animate-pulse ml-0.5" />
          </span>
        </motion.div>

        {/* Core Pillars Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed mb-10"
        >
          <span className="text-zinc-200 font-medium">React.js • Node.js • Express • MongoDB • Java • Python.</span>{' '}
          Crafting full-stack web applications, resilient RESTful backend APIs, and enterprise ERP solutions.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-12"
        >
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={() => scrollToSection('projects')}
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            size="lg"
            asLink
            href="/resume.pdf"
            download="Rohan_Naik_Software_Developer_Resume.pdf"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Download Resume</span>
          </MagneticButton>

          <MagneticButton
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
          >
            <Mail className="w-4 h-4" />
            <span>Let&apos;s Connect</span>
          </MagneticButton>
        </motion.div>

        {/* Social Icons & Terminal Jump Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-4 py-2 px-5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm"
        >
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="text-zinc-400 hover:text-white transition-colors p-1"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <div className="w-[1px] h-3 bg-white/10" />
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="text-zinc-400 hover:text-sky-400 transition-colors p-1"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <div className="w-[1px] h-3 bg-white/10" />
          <button
            onClick={() => scrollToSection('ai')}
            title="AI Exploration & Labs"
            className="text-zinc-400 hover:text-purple-400 transition-colors flex items-center gap-1 text-xs font-mono p-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Labs</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollToSection('marquee')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-zinc-300 transition-colors flex flex-col items-center gap-1 font-mono text-[10px] tracking-widest uppercase cursor-pointer"
      >
        <span>SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
