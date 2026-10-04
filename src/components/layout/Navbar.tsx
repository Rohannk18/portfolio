'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { soundFx } from '@/lib/sound';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Resume', id: 'resume' },
    { label: 'AI & Labs', id: 'ai' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }

      // Active section spy
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navbar Container */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isScrolled ? 'pt-3 md:pt-4' : 'pt-5 md:pt-6'
        }`}
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between pointer-events-auto">
          {/* Logo / Monogram */}
          <button
            onClick={() => handleNavClick('hero')}
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-mono font-bold text-xs shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              RN
            </div>
            <span className="text-sm font-semibold tracking-tight text-white font-mono hidden sm:inline">
              rohan.naik
            </span>
          </button>

          {/* Desktop Navigation Glass Capsule */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-xl shadow-xl shadow-black/40">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/60 to-sky-600/60 border border-indigo-400/40 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenCommandPalette();
              }}
              title="Open Command Palette (Ctrl+K)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white backdrop-blur-md transition-all duration-200 shadow-sm"
            >
              <Command className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">⌘K</span>
            </button>

            {/* Sound Toggle */}
            <SoundToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-zinc-300 hover:text-white backdrop-blur-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-4 rounded-2xl bg-[#0d111a]/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-1.5"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
