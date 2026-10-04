'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  CheckCircle,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  GitBranch,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardTilt } from '@/components/ui/CardTilt';

export function ExperienceSection() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          number="02"
          badge="EXPERIENCE & SOLUTIONS"
          title="Enterprise Solutions &"
          highlightedText="Requirements Engineering"
          description="Real-world experience deconstructing enterprise workflows, delivering technical ERP software demonstrations, and translating client specifications into software architecture."
        />

        {/* Career Direction Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold">
                Career Direction: Software Engineering
              </p>
              <p className="text-xs text-zinc-400">
                Leveraging enterprise ERP domain expertise to build resilient, user-aligned backend and full-stack software.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            Active Present Role
          </span>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          {/* Vertical animated line */}
          <div className="absolute left-[11px] sm:left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500 via-sky-500 to-transparent" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 rounded-full bg-[#0a0e17] border-2 border-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              </div>

              {/* Experience Card */}
              <CardTilt maxTilt={6}>
                <div className="p-6 sm:p-8 rounded-2xl glass-panel glass-panel-hover">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.title}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                            ● Present
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-mono text-indigo-400 mt-1">
                        {exp.roleType} • {exp.company}
                      </p>
                    </div>

                    <div className="text-xs font-mono text-zinc-400 sm:text-right shrink-0">
                      <div>{exp.period}</div>
                      <div className="text-zinc-500">{exp.location}</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed my-5">
                    {exp.description}
                  </p>

                  {/* Technical Highlights */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Technical & Systems Responsibilities</span>
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {exp.technicalHighlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Transferable Engineering Capabilities */}
                  <div className="space-y-3 mb-6 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-sky-400" />
                      <span>Transferable Software Engineering Strengths</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {exp.transferableCapabilities.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 flex items-start gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
