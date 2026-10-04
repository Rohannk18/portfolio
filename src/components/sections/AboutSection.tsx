'use client';

import { motion } from 'framer-motion';
import {
  Code,
  Layers,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardTilt } from '@/components/ui/CardTilt';
import { scrollToSection } from '@/lib/utils';

export function AboutSection() {
  const { bio, stats } = portfolioData.personal;
  const education = portfolioData.education[0];

  const pillars = [
    {
      title: 'Full-Stack Web Development',
      desc: 'Building responsive React.js frontend interfaces integrated seamlessly with Node.js and Express.js RESTful API architectures.',
      icon: Layers,
    },
    {
      title: 'Backend & Database Systems',
      desc: 'Architecting structured MongoDB collections, relational SQL schemas, JWT role-based authentication, and transaction safety.',
      icon: Cpu,
    },
    {
      title: 'Enterprise ERP & Workflows',
      desc: 'Deconstructing ERP and CRM modules (inventory, stock, quotations, accounting) and translating client requirements into technical specifications.',
      icon: Code,
    },
    {
      title: 'Modern AI & CyberOps Practices',
      desc: 'Applying certified modern AI workflows (Modern AI, Apply AI) and CyberOps security fundamentals to build resilient, protected web applications.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 bg-[#0a0e17]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="01"
          badge="ABOUT ME"
          title="Engineering Systems with"
          highlightedText="Precision & Purpose"
          description="A Computer Science graduate combining solid algorithmic principles with real-world enterprise software exposure."
        />

        {/* Top Grid: Bio Narrative & Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Editorial Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed"
          >
            {bio.map((paragraph, idx) => (
              <p key={idx} className="font-normal">
                {paragraph}
              </p>
            ))}

            {/* Quick Education Callout Box */}
            <div className="pt-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold text-base">{education.degree}</h3>
                    <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">
                      {education.graduationYear}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{education.field}</p>
                  <p className="text-xs text-zinc-500 mt-2">
                    Focus: Data Structures, RDBMS, Systems Architecture, and Software Engineering.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <CardTilt maxTilt={10}>
                  <div className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between h-40">
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {stat.value}
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-snug">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </CardTilt>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-indigo-500/10 flex items-center justify-center text-zinc-400 group-hover:text-indigo-400 transition-colors mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
