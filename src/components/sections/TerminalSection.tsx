'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, RefreshCw } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { soundFx } from '@/lib/sound';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function TerminalSection() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'whoami',
      output: (
        <div className="text-zinc-300">
          <span className="text-indigo-400 font-bold">{portfolioData.personal.name}</span> — Full-Stack Software Developer & B.Tech Computer Science Graduate (2026, Sapthagiri College of Engineering, CGPA: 8.6/10).
        </div>
      ),
    },
    {
      command: 'focus',
      output: (
        <div className="text-zinc-300">
          Full-Stack Web Development • React.js & Node.js • Express.js REST APIs • MongoDB & SQL • ERP & Business Workflows.
        </div>
      ),
    },
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>(['whoami', 'focus']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    soundFx.playKey();
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (trimmed === 'help') {
      outputNode = (
        <div className="space-y-1.5 text-zinc-300">
          <p className="text-indigo-400 font-semibold">Available Commands:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div><span className="text-sky-300 font-mono">about</span> - Background & engineering overview</div>
            <div><span className="text-sky-300 font-mono">skills</span> - Languages, frameworks, and databases</div>
            <div><span className="text-sky-300 font-mono">projects</span> - Production-ready repositories</div>
            <div><span className="text-sky-300 font-mono">experience</span> - Sixorbit ERP & Software internship</div>
            <div><span className="text-sky-300 font-mono">education</span> - Sapthagiri College of Engineering</div>
            <div><span className="text-sky-300 font-mono">contact</span> - Email & professional socials</div>
            <div><span className="text-sky-300 font-mono">cat resume</span> - Text view of resume summary</div>
            <div><span className="text-sky-300 font-mono">sudo hire-rohan</span> - Instant interview invitation</div>
            <div><span className="text-sky-300 font-mono">matrix</span> - Toggle matrix cyber effect</div>
            <div><span className="text-sky-300 font-mono">clear</span> - Reset terminal screen</div>
          </div>
        </div>
      );
    } else if (trimmed === 'about') {
      outputNode = (
        <div className="space-y-2 text-zinc-300 text-xs sm:text-sm">
          <p>
            {portfolioData.personal.bio[0]}
          </p>
          <p className="text-zinc-400">
            {portfolioData.personal.bio[1]}
          </p>
        </div>
      );
    } else if (trimmed === 'skills') {
      outputNode = (
        <div className="space-y-2 text-xs">
          {portfolioData.skills.map((cat) => (
            <div key={cat.category}>
              <span className="text-indigo-400 font-bold">{cat.category}: </span>
              <span className="text-zinc-300">
                {cat.skills.map((s) => s.name).join(', ')}
              </span>
            </div>
          ))}
        </div>
      );
    } else if (trimmed === 'projects') {
      outputNode = (
        <div className="space-y-2 text-xs">
          {portfolioData.projects.map((p) => (
            <div key={p.id} className="flex items-start gap-2">
              <span className="text-indigo-400 font-mono">[{p.number}]</span>
              <div>
                <span className="text-white font-bold">{p.title}</span> —{' '}
                <span className="text-zinc-400">{p.techStack.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (trimmed === 'experience') {
      outputNode = (
        <div className="space-y-3 text-xs text-zinc-300">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <p className="text-indigo-400 font-bold">{exp.title} ({exp.period})</p>
              <p className="text-zinc-400">{exp.company} • {exp.location}</p>
              <p className="text-zinc-300">{exp.description}</p>
            </div>
          ))}
        </div>
      );
    } else if (trimmed === 'education') {
      const edu = portfolioData.education[0];
      outputNode = (
        <div className="text-xs text-zinc-300 space-y-1">
          <p className="text-indigo-400 font-bold">{edu.degree} — {edu.institution} ({edu.graduationYear})</p>
          <p>{edu.field}</p>
          <p className="text-zinc-400">Coursework: {edu.coursework.slice(0, 5).join(', ')}</p>
        </div>
      );
    } else if (trimmed === 'contact') {
      outputNode = (
        <div className="space-y-1 text-xs text-zinc-300">
          <p>Email: <a href={`mailto:${portfolioData.personal.email}`} className="text-indigo-400 hover:underline">{portfolioData.personal.email}</a></p>
          <p>GitHub: <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">{portfolioData.personal.github}</a></p>
          <p>LinkedIn: <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">{portfolioData.personal.linkedin}</a></p>
        </div>
      );
    } else if (trimmed === 'cat resume' || trimmed === 'resume') {
      outputNode = (
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 font-mono text-[11px] text-zinc-300 space-y-1">
          <p className="text-indigo-300 font-bold">=== {portfolioData.personal.name.toUpperCase()} | FULL-STACK SOFTWARE DEVELOPER ===</p>
          <p>Education: B.Tech Computer Science (2022–2026), Sapthagiri College of Engineering (CGPA: 8.6 / 10)</p>
          <p>Core Stack: React.js, Node.js, Express.js, MongoDB, REST APIs, Java, Python, SQL, TypeScript, Tailwind CSS</p>
          <p>Experience: Business Development Associate at Sixorbit ERP & Software Development Intern at Edutainer</p>
          <p>Projects: E-Commerce Platform (React/Node/Express/MongoDB), Centralized ERP System (RBAC/Express/MongoDB)</p>
          <p className="text-emerald-400 mt-2">✓ Resume PDF is ready for download in the #resume section.</p>
        </div>
      );
    } else if (trimmed.includes('hire-rohan') || trimmed.includes('hire')) {
      outputNode = (
        <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
          <p className="font-bold">🎉 ACCESS GRANTED: Software Engineering Candidate Selected!</p>
          <p>Status: Ready to deliver high-impact full-stack and backend software engineering.</p>
          <p className="text-white">Let&apos;s talk: {portfolioData.personal.email}</p>
        </div>
      );
    } else if (trimmed === 'matrix') {
      setIsMatrixMode(!isMatrixMode);
      outputNode = (
        <div className="text-xs text-emerald-400 font-mono">
          {isMatrixMode ? 'Matrix mode deactivated.' : 'Entering the Matrix... Welcome, Neo.'}
        </div>
      );
    } else {
      outputNode = (
        <div className="text-xs text-rose-400">
          Command not recognized: &ldquo;{trimmed}&rdquo;. Type <span className="underline text-white">help</span> for a list of valid commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  return (
    <section id="terminal" className="relative py-24 px-4 sm:px-6 bg-[#07090e]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <SectionHeader
          number="07"
          badge="DEVELOPER INTERACTION"
          title="Interactive Developer"
          highlightedText="Terminal"
          description="A Unix-style command shell to explore my background, technical stack, architecture philosophy, and developer easter eggs."
        />

        {/* Terminal Window Container */}
        <div
          className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-2xl ${
            isMatrixMode
              ? 'bg-black border-emerald-500/50 shadow-emerald-950/50'
              : 'bg-[#0d111a] border-white/15 shadow-black/80'
          }`}
        >
          {/* Terminal Titlebar */}
          <div className="px-5 py-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-zinc-400">
                rohan@developer:~ (zsh)
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span className="hidden sm:inline">Type &apos;help&apos; for commands</span>
              <button
                onClick={() => setHistory([])}
                title="Clear Terminal"
                className="hover:text-zinc-300 transition-colors p-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Buffer */}
          <div className="p-6 font-mono text-xs sm:text-sm space-y-4 max-h-96 overflow-y-auto">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400">
                  <span className="text-emerald-400">rohan@portfolio:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 text-indigo-400 pt-2">
              <span className="text-emerald-400">rohan@portfolio:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'projects', 'cat resume'..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder-zinc-600 font-mono text-xs sm:text-sm"
              />
              <CornerDownLeft className="w-3.5 h-3.5 text-zinc-600" />
            </div>

            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
