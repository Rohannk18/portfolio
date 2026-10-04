'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, ExternalLink, Check, Sparkles, GraduationCap } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { CardTilt } from '@/components/ui/CardTilt';
import { soundFx } from '@/lib/sound';

export function ResumeSection() {
  const [showPreview, setShowPreview] = useState(false);

  const resumeHighlights = [
    'B.Tech in Computer Science & Engineering (Sapthagiri College of Engineering, CGPA: 8.6 / 10)',
    'Full-Stack Developer: React.js, Node.js, Express.js, MongoDB, REST APIs, Java, Python, SQL',
    'Business Development Associate — Sixorbit ERP (Accrete Globus Technology) • ERP Demos & Solutions',
    'Software Development Intern — Edutainer (PAT Technologies) • React.js & Python Programming',
    'Key Production Projects: Full-Stack E-Commerce Platform & Centralized Enterprise ERP System',
  ];

  return (
    <section id="resume" className="relative py-24 px-4 sm:px-6 bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <CardTilt maxTilt={4}>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-[#0f172a] to-[#0a0e17] border border-indigo-500/30 shadow-2xl relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left text & action */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CURRICULUM VITAE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Want the complete <span className="gradient-text-accent">picture?</span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
                  Download my comprehensive technical resume for an in-depth breakdown of my engineering experience, projects, architecture case studies, and university credentials.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    asLink
                    href="/resume.pdf"
                    download="Rohan_Naik_Software_Developer_Resume.pdf"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume (PDF)</span>
                  </MagneticButton>

                  <MagneticButton
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      soundFx.playClick();
                      setShowPreview(!showPreview);
                    }}
                  >
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>{showPreview ? 'Hide Quick Summary' : 'View Quick Summary'}</span>
                  </MagneticButton>
                </div>
              </div>

              {/* Right Summary Card */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Profile Snapshot
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">Verified</span>
                </div>

                <ul className="space-y-2.5">
                  {resumeHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Updated for 2026 Opportunities</span>
                  <span>PDF Format</span>
                </div>
              </div>
            </div>

            {/* Expandable Preview Drawer */}
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-8 border-t border-white/10 space-y-4"
              >
                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300 space-y-3">
                  <div className="text-indigo-400 font-bold text-sm">
                    ROHAN M NAIK — FULL-STACK SOFTWARE DEVELOPER
                  </div>
                  <p className="text-zinc-400">
                    B.Tech Computer Science (2026, Sapthagiri College of Engineering, CGPA: 8.6/10) • React.js, Node.js, Express.js, MongoDB, REST APIs, TypeScript, Java, Python, SQL
                  </p>
                  <p>
                    <strong>Present Role:</strong> Business Development Associate — Sixorbit ERP (Accrete Globus Technology) • ERP modules, inventory & CRM demonstrations, translating business requirements to software workflows.
                  </p>
                  <p>
                    <strong>Previous Role:</strong> Software Development Intern — Edutainer (PAT Technologies) • React.js frontend development & Python problem-solving.
                  </p>
                  <p>
                    <strong>Key Projects:</strong> E-Commerce Platform (React.js, Node.js, Express.js, MongoDB), Centralized ERP System (Multi-module RBAC, Express, MongoDB).
                  </p>
                  <p className="text-indigo-300">
                    Direct Contact: {portfolioData.personal.email} | {portfolioData.personal.github} | {portfolioData.personal.linkedin}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </CardTilt>
      </div>
    </section>
  );
}
