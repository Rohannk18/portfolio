'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  CheckCircle,
  FolderGit2,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardTilt } from '@/components/ui/CardTilt';
import { soundFx } from '@/lib/sound';

export function GitHubSection() {
  const profileUrl = portfolioData.personal.github;

  const featuredRepos = [
    {
      name: 'E-Commerce',
      desc: 'Full-stack e-commerce application with end-to-end user, product, cart, inventory, and order workflows built with React.js, Node.js, Express.js, and MongoDB.',
      language: 'JavaScript / React',
      langColor: '#38bdf8',
      url: 'https://github.com/Rohannk18/E-Commerce',
    },
    {
      name: 'ERP',
      desc: 'Centralized Enterprise Resource Planning platform integrating quotations, inventory, orders, and operational workflows with role-based access control.',
      language: 'JavaScript / Node.js',
      langColor: '#818cf8',
      url: 'https://github.com/Rohannk18/ERP',
    },
  ];

  // Deterministic representation of contribution heatmap activity blocks to guarantee hydration match
  const generateContributionWeeks = () => {
    const weeks = [];
    const intensityPattern = [0, 2, 3, 1, 4, 2, 0, 3, 1, 0, 4, 3, 2, 1, 0, 2, 4, 3, 1, 0, 2, 3, 4, 1];
    for (let w = 0; w < 32; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const index = (w * 7 + d * 3 + (w % 3) * 5) % intensityPattern.length;
        days.push(intensityPattern[index]);
      }
      weeks.push(days);
    }
    return weeks;
  };

  const [weeks] = useState(generateContributionWeeks);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-950/60 border border-emerald-800/40';
      case 2:
        return 'bg-emerald-700/60 border border-emerald-600/40';
      case 3:
        return 'bg-emerald-500/80 border border-emerald-400/50';
      case 4:
        return 'bg-emerald-400 border border-emerald-300 shadow-sm shadow-emerald-400/40';
      default:
        return 'bg-white/[0.03] border border-white/[0.04]';
    }
  };

  return (
    <section id="github" className="relative py-24 px-4 sm:px-6 bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="06"
          badge="CODE & OPEN SOURCE"
          title="GitHub Activity &"
          highlightedText="Repositories"
          description="A direct look into development activity, repository architectures, and continuous code commitments."
        />

        {/* GitHub Stats Card */}
        <div className="mb-12">
          <CardTilt maxTilt={4}>
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white text-lg font-bold font-mono shadow-lg shadow-indigo-500/20">
                    <GithubIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{portfolioData.personal.name}</span>
                      <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10">
                        @Rohannk18
                      </span>
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      github.com/Rohannk18 • Active Builder
                    </p>
                  </div>
                </div>

                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center gap-2 transition-colors self-start sm:self-auto"
                >
                  <span>Open GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                </a>
              </div>

              {/* Contribution Activity Grid Heatmap */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <span>Continuous Development & Commit Activity</span>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-zinc-500">Less</span>
                    <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-emerald-900" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                    <span className="text-zinc-500">More</span>
                  </div>
                </div>

                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-1.5 min-w-[600px]">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1.5">
                        {week.map((level, dIdx) => (
                          <div
                            key={dIdx}
                            className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 hover:scale-125 cursor-pointer ${getCellColor(
                              level
                            )}`}
                            title={`Activity Level: ${level}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardTilt>
        </div>

        {/* Selected Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <CardTilt maxTilt={6}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="block p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 group h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors font-mono">
                          {repo.name}
                        </h4>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed my-3">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span>{repo.language}</span>
                    </div>
                    <span>• Public Repo</span>
                  </div>
                </a>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
