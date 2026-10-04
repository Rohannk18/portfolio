'use client';

import { motion } from 'framer-motion';
import {
  Award,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Trophy,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardTilt } from '@/components/ui/CardTilt';

export function AchievementsSection() {
  const { achievements, certifications } = portfolioData;

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="07"
          badge="MILESTONES & CREDENTIALS"
          title="Achievements &"
          highlightedText="Certifications"
          description="Recognitions, academic milestones, verified engineering skillsets, and continuous professional development."
        />

        {/* 2-Column Layout: Left Achievements, Right Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Key Milestones & Recognition</span>
            </h3>

            {achievements.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <CardTilt maxTilt={5}>
                  <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs font-mono text-zinc-500">{item.category}</span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-mono">
                        {item.highlight}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardTilt>
              </motion.div>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 mb-4 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" />
              <span>Technical Certifications & Training</span>
            </h3>

            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <CardTilt maxTilt={5}>
                  <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-xs font-mono text-zinc-500">{cert.issuer}</span>
                        <span className="text-xs font-mono text-sky-400">{cert.date}</span>
                      </div>

                      <h4 className="text-base font-bold text-white mb-3">{cert.title}</h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardTilt>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
