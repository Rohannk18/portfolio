'use client';

import { useState } from 'react';
import { Mail, FileText, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { portfolioData } from '@/data/portfolio';
import { scrollToSection } from '@/lib/utils';
import { soundFx } from '@/lib/sound';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0e17] pt-16 pb-12 overflow-hidden text-zinc-400">
      {/* Background subtle radial light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Identity & Status */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-indigo-500/20">
                RN
              </div>
              <div>
                <h3 className="text-white font-bold tracking-tight text-lg">ROHAN M NAIK</h3>
                <p className="text-xs font-mono text-zinc-400">Full-Stack Software Developer • Class of 2026</p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Engineering full-stack web applications, resilient backend architectures, and enterprise ERP solutions. Committed to clean code, robust architectures, and continuous learning.
            </p>

            {/* Live Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to Software Engineering Opportunities</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About Me
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('experience')}
                  className="hover:text-white transition-colors"
                >
                  Experience & Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="hover:text-white transition-colors"
                >
                  Skills & Tech Stack
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-white transition-colors"
                >
                  Projects & Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Rohan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Socials & Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300">Connect</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-zinc-400" />
                <span>GitHub</span>
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-zinc-400" />
                <span>LinkedIn</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 text-left hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                <span className="truncate">{portfolioData.personal.email}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('resume')}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <FileText className="w-4 h-4 text-zinc-400" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© 2026 Rohan Naik. Built with code, curiosity & AI.</p>
          <p className="flex items-center gap-2">
            <span>Next.js • TypeScript • Three.js • Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
