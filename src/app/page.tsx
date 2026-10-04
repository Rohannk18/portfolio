'use client';

import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { BackToTop } from '@/components/ui/BackToTop';

import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeSection } from '@/components/sections/MarqueeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { AISection } from '@/components/sections/AISection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { ResumeSection } from '@/components/sections/ResumeSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useKonamiCode } from '@/hooks/useKonamiCode';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectModalId, setSelectedProjectModalId] = useState<string | null>(null);

  // Keyboard shortcut for Command Palette (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Konami Code easter egg listener
  useKonamiCode();

  return (
    <SmoothScroll>
      {/* Initial High-Tech Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      {/* Desktop Custom Glowing Cursor */}
      <CustomCursor />

      {/* Main Page Layout */}
      <div className="relative min-h-screen bg-[#0a0e17] text-white flex flex-col selection:bg-indigo-600/30 selection:text-white">
        {/* Floating Glass Navigation Bar */}
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        <main className="flex-1 flex flex-col">
          {/* 00. Hero Section with 3D Canvas */}
          <HeroSection />

          {/* Tech Stack Infinite Marquee */}
          <MarqueeSection />

          {/* 01. About Me */}
          <AboutSection />

          {/* 02. Experience & ERP Solutions (Present Active) */}
          <ExperienceSection />

          {/* 03. Skills & Technology Wall */}
          <SkillsSection />

          {/* 04. AI & What I'm Building */}
          <AISection />

          {/* 05. Projects & Case Studies */}
          <ProjectsSection
            selectedProjectModalId={selectedProjectModalId}
            onCloseProjectModal={() => setSelectedProjectModalId(null)}
            onOpenProjectModal={(id) => setSelectedProjectModalId(id)}
          />

          {/* 06. GitHub Activity & Live Repos */}
          <GitHubSection />

          {/* 07. Achievements & Certifications */}
          <AchievementsSection />

          {/* 08. Resume CTA */}
          <ResumeSection />

          {/* 09. Contact Section */}
          <ContactSection />
        </main>

        {/* Minimal Footer */}
        <Footer />

        {/* Command Palette Modal (Ctrl + K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenProject={(id) => setSelectedProjectModalId(id)}
        />

        {/* Floating Back-To-Top Button */}
        <BackToTop />
      </div>
    </SmoothScroll>
  );
}
