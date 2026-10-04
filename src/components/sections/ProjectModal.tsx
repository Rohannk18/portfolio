'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Code2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Layers,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Project } from '@/types';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { soundFx } from '@/lib/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'architecture' | 'learnings'>(
    'overview'
  );

  if (!project) return null;

  const handleClose = () => {
    soundFx.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0d111a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                  {project.number}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {project.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">{project.subtitle}</p>
            </div>

            {/* Action Buttons & Close */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-600/30"
                >
                  <span>Repository / Code</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={handleClose}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                aria-label="Close Project Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 sm:px-8 border-b border-white/10 bg-black/20 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Key Features' },
              { id: 'architecture', label: 'Architecture & Flow' },
              { id: 'learnings', label: 'Challenges & Learnings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playHover();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`py-3.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors duration-150 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-400 text-white font-semibold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Project Summary
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Problem Statement
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Engineering Solution
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Key Technical Features & Functionality
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {project.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    System Architecture & Data Flow
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {project.architectureDescription}
                  </p>
                </div>

                {/* Render Interactive Architecture Diagram */}
                <ArchitectureDiagram type={project.architectureType} />
              </div>
            )}

            {activeTab === 'learnings' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Engineering Challenges Overcome
                  </h4>
                  <div className="space-y-3">
                    {project.challenges.map((challenge, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-amber-950/10 border border-amber-500/20 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                      >
                        {challenge}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Key Architectural Takeaways
                  </h4>
                  <div className="space-y-3">
                    {project.learnings.map((learning, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-indigo-950/10 border border-indigo-500/20 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                      >
                        {learning}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
