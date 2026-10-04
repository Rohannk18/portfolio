'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Server,
  Layout,
  Database,
  BrainCircuit,
  Cloud,
  Layers,
  Sparkles,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardTilt } from '@/components/ui/CardTilt';
import { soundFx } from '@/lib/sound';
import { scrollToSection } from '@/lib/utils';

export function SkillsSection() {
  const categories = portfolioData.skills;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allSkills = categories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, categoryName: cat.category }))
  );

  const displayedSkills =
    selectedCategory === 'All'
      ? allSkills
      : allSkills.filter((s) => s.categoryName === selectedCategory);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Advanced':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
            Advanced
          </span>
        );
      case 'Proficient':
        return (
          <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-mono">
            Proficient
          </span>
        );
      case 'Exploring':
        return (
          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono">
            Exploring / Hands-on
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="03"
          badge="TECH STACK & SKILLS"
          title="Technical Capabilities &"
          highlightedText="Core Tooling"
          description="A categorized breakdown of programming languages, backend frameworks, relational databases, AI toolchains, and developer environments."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => {
              soundFx.playHover();
              setSelectedCategory('All');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            All Skills ({allSkills.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                soundFx.playHover();
                setSelectedCategory(cat.category);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat.category
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {displayedSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CardTilt maxTilt={8}>
                  <div className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between h-full border border-white/10 group">
                    <div>
                      {/* Top Row: Name & Level Badge */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 text-indigo-400 flex items-center justify-center transition-colors">
                            <Code2 className="w-4 h-4" />
                          </div>
                          <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {skill.name}
                          </h3>
                        </div>
                        {getLevelBadge(skill.level)}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                        {skill.description}
                      </p>
                    </div>

                    {/* Applied In Projects */}
                    {skill.relatedProjects.length > 0 && (
                      <div className="pt-3 border-t border-white/5">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                          Applied In:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {skill.relatedProjects.map((proj) => (
                            <button
                              key={proj}
                              onClick={() => scrollToSection('projects')}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-400/30 text-zinc-400 hover:text-indigo-200 transition-colors"
                            >
                              {proj}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardTilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
