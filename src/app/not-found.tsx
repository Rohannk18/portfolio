'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Terminal, ArrowLeft } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>ERROR 404 // ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-7xl font-black font-mono tracking-tight text-white">404</h1>

        <p className="text-sm text-zinc-400 leading-relaxed">
          The requested system node does not exist or has been relocated. Return to base terminal.
        </p>

        <div className="pt-2">
          <Link href="/">
            <MagneticButton variant="primary" size="lg">
              <Home className="w-4 h-4 mr-2" />
              <span>Return to Portfolio</span>
            </MagneticButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
