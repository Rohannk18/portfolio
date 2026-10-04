'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Cpu,
  Bot,
  Database,
  Terminal,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { portfolioData } from '@/data/portfolio';
import { Project } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CardTilt } from '@/components/ui/CardTilt';
import { ProjectModal } from './ProjectModal';
import { soundFx } from '@/lib/sound';

interface ProjectsSectionProps {
  selectedProjectModalId?: string | null;
  onCloseProjectModal?: () => void;
  onOpenProjectModal?: (id: string) => void;
}

export function ProjectsSection({
  selectedProjectModalId,
  onCloseProjectModal,
  onOpenProjectModal,
}: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects = portfolioData.projects;

  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const handleOpenProject = (project: Project) => {
    soundFx.playClick();
    setActiveProject(project);
    if (onOpenProjectModal) onOpenProjectModal(project.id);
  };

  const handleClose = () => {
    setActiveProject(null);
    if (onCloseProjectModal) onCloseProjectModal();
  };

  // Synchronize modal state if requested externally
  const modalProject =
    activeProject ||
    (selectedProjectModalId
      ? projects.find((p) => p.id === selectedProjectModalId) || null
      : null);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="05"
          badge="FEATURED WORK & CASE STUDIES"
          title="Engineered Systems &"
          highlightedText="Projects"
          description="Explore production-oriented full-stack platforms, ERP solutions, AI query pipelines, and database systems built from first principles."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playHover();
                setSelectedFilter(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedFilter === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-semibold shadow-lg shadow-indigo-600/30'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Large Editorial Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                data-cursor-project="true"
              >
                <CardTilt maxTilt={6}>
                  <div
                    onClick={() => handleOpenProject(project)}
                    className="group cursor-pointer p-7 sm:p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between h-full border border-white/10 relative overflow-hidden transition-all duration-300"
                  >
                    {/* Top Ambient Glow based on project accent */}
                    <div
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: project.accentColor }}
                    />

                    <div>
                      {/* Number & Category Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="text-sm font-mono font-bold px-2.5 py-1 rounded-md"
                            style={{
                              backgroundColor: `${project.accentColor}15`,
                              color: project.accentColor,
                              border: `1px solid ${project.accentColor}30`,
                            }}
                          >
                            {project.number}
                          </span>
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                            {project.category}
                          </span>
                        </div>

                        {/* Quick GitHub Badge */}
                        {project.githubUrl && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.githubUrl, '_blank');
                            }}
                            title="View GitHub Repository"
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl font-black text-white group-hover:text-sky-300 transition-colors tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mb-4">
                        {project.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3 mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer: Tech Stack & CTA */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-[11px] font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        <span className="flex items-center gap-1.5">
                          <span>EXPLORE CASE STUDY</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                        </span>
                        <span className="text-zinc-500 font-normal">Click to open</span>
                      </div>
                    </div>
                  </div>
                </CardTilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Case Study Modal */}
      {modalProject && <ProjectModal project={modalProject} onClose={handleClose} />}
    </section>
  );
}
