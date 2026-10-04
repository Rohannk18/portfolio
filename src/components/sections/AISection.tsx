'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Sparkles,
  Bot,
  Layers,
  ArrowRight,
  Database,
  Cpu,
  Terminal,
  Search,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardTilt } from '@/components/ui/CardTilt';

export function AISection() {
  const initiatives = portfolioData.aiInitiatives;
  const [activeTab, setActiveTab] = useState(0);

  const pipelineSteps = [
    { step: '01', title: 'User Query / Document', desc: 'Raw prompt or domain legal document input', icon: Search },
    { step: '02', title: 'Semantic Chunking & Embedding', desc: 'Vectorization via embedding models', icon: Database },
    { step: '03', title: 'Context Retrieval (RAG)', desc: 'Cosine similarity search against vector index', icon: Layers },
    { step: '04', title: 'LLM Synthesis & Safety', desc: 'Context-injected prompt execution with guardrails', icon: Bot },
    { step: '05', title: 'Structured Output', desc: 'Streaming UI response with citations', icon: Sparkles },
  ];

  return (
    <section id="ai" className="relative py-24 px-4 sm:px-6 bg-[#0a0e17] overflow-hidden">
      {/* Background glow and subtle neural lattice */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="04"
          badge="AI & LABS"
          title="AI & What I am"
          highlightedText="Building"
          description="Hands-on experimentation with Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and intelligent developer automation."
        />

        {/* AI Philosophy & Interactive Neural Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          {/* Left Column: Conceptual Overview */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Engineering with AI</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Rather than treating AI as a black box, I explore its programmatic integration: optimizing prompts, managing context windows, analyzing customer reviews with NLP, and applying modern AI tools and certifications (<strong className="text-purple-300">Introduction to Modern AI</strong> & <strong className="text-purple-300">Apply AI</strong>) to practical software development workflows.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300">
                  ● Hands-on Experimentation
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
                  ● RAG Architectures
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Pipeline Flow */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl glass-panel border border-white/10 relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    AI Pipeline Architecture Flow
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">End-to-End Pipeline</span>
              </div>

              {/* Steps vertical/horizontal flow */}
              <div className="space-y-3">
                {pipelineSteps.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.step}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 flex items-center justify-between gap-4 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">
                          {s.step}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">{s.title}</p>
                          <p className="text-xs text-zinc-400">{s.desc}</p>
                        </div>
                      </div>
                      <Icon className="w-4 h-4 text-zinc-500 shrink-0" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* AI Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((init, idx) => (
            <motion.div
              key={init.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CardTilt maxTilt={6}>
                <div className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between h-full border border-white/10 group">
                  <div>
                    {/* Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                        {init.status}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">{init.focusArea}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-3">
                      {init.title}
                    </h3>

                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                      {init.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {init.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                      >
                        {t}
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
