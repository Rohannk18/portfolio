'use client';

import {
  Code2,
  Database,
  Server,
  Cpu,
  BrainCircuit,
  Terminal,
  Layers,
  Sparkles,
  GitBranch,
} from 'lucide-react';

export function MarqueeSection() {
  const techItems = [
    { name: 'React.js', icon: Code2, color: '#38bdf8' },
    { name: 'Node.js & Express', icon: Server, color: '#818cf8' },
    { name: 'MongoDB & Mongoose', icon: Database, color: '#34d399' },
    { name: 'RESTful APIs', icon: Layers, color: '#38bdf8' },
    { name: 'TypeScript & JavaScript', icon: Code2, color: '#fbbf24' },
    { name: 'Java & OOP', icon: Cpu, color: '#f59e0b' },
    { name: 'Python', icon: Code2, color: '#38bdf8' },
    { name: 'JWT Auth & RBAC', icon: Sparkles, color: '#c084fc' },
    { name: 'Git & GitHub', icon: GitBranch, color: '#f472b6' },
    { name: 'Sixorbit ERP & CRM', icon: GitBranch, color: '#34d399' },
  ];

  // Duplicate for seamless loop
  const displayItems = [...techItems, ...techItems, ...techItems];

  return (
    <div
      id="marquee"
      className="relative w-full py-6 border-y border-white/[0.08] bg-black/30 backdrop-blur-md overflow-hidden select-none"
    >
      {/* Side gradient masks for smooth edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0e17] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0e17] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee gap-8 items-center">
        {displayItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors shrink-0"
            >
              <Icon className="w-4 h-4" style={{ color: item.color }} />
              <span className="text-xs font-mono font-medium text-zinc-300 tracking-wide">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
