'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Code2,
  Briefcase,
  Layers,
  Sparkles,
  FileText,
  Mail,
  X,
  CornerDownLeft,
  Terminal,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { portfolioData } from '@/data/portfolio';
import { scrollToSection } from '@/lib/utils';
import { soundFx } from '@/lib/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
}

export function CommandPalette({ isOpen, onClose, onOpenProject }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commandItems = [
    {
      id: 'sec-about',
      title: 'About Rohan Naik',
      subtitle: 'Background, education & engineering ethos',
      category: 'Navigation',
      icon: Code2,
      action: () => scrollToSection('about'),
    },
    {
      id: 'sec-experience',
      title: 'Experience & Solutions',
      subtitle: 'ERP systems & requirements engineering',
      category: 'Navigation',
      icon: Briefcase,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'sec-skills',
      title: 'Skills & Tech Stack',
      subtitle: 'Languages, backend, databases, tools',
      category: 'Navigation',
      icon: Layers,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'sec-ai',
      title: 'AI & What I am Building',
      subtitle: 'LLMs, RAG, and automation pipelines',
      category: 'Navigation',
      icon: Sparkles,
      action: () => scrollToSection('ai'),
    },
    {
      id: 'sec-projects',
      title: 'All Projects',
      subtitle: 'Browse full-stack and systems builds',
      category: 'Navigation',
      icon: Layers,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'sec-contact',
      title: 'Contact Rohan',
      subtitle: 'Send a message or reach out via email',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollToSection('contact'),
    },
    // Projects direct jumps
    ...portfolioData.projects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: `${p.category} • ${p.techStack.slice(0, 3).join(', ')}`,
      category: 'Projects',
      icon: Code2,
      action: () => {
        scrollToSection('projects');
        if (onOpenProject) {
          setTimeout(() => onOpenProject(p.id), 300);
        }
      },
    })),
    // External links
    {
      id: 'ext-github',
      title: 'GitHub Profile',
      subtitle: 'github.com/Rohannk18',
      category: 'External',
      icon: GithubIcon,
      action: () => window.open(portfolioData.personal.github, '_blank'),
    },
    {
      id: 'ext-linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/rohan-naik',
      category: 'External',
      icon: LinkedinIcon,
      action: () => window.open(portfolioData.personal.linkedin, '_blank'),
    },
    {
      id: 'ext-resume',
      title: 'Download Resume (PDF)',
      subtitle: 'Rohan Naik Software Developer Resume PDF',
      category: 'External',
      icon: FileText,
      action: () => window.open('/resume.pdf', '_blank'),
    },
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (item: (typeof commandItems)[0]) => {
      soundFx.playClick();
      onClose();
      item.action();
    },
    [onClose]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundFx.playHover();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundFx.playHover();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleSelect, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#0d111a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, project, skill, or section..."
              autoFocus
              className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-zinc-400 hover:text-white rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-2 divide-y divide-white/[0.04]">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 text-sm">
                No matching results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                          : 'hover:bg-white/[0.04] text-zinc-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? 'bg-indigo-500 text-white'
                              : 'bg-white/5 text-zinc-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium leading-tight truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-zinc-400 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">↵</kbd>
              to select
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
