'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  Server,
  Database,
  Cpu,
  Bot,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ArchitectureDiagramProps {
  type: 'fullstack' | 'erp' | 'ai' | 'iot' | 'analytics';
}

export function ArchitectureDiagram({ type }: ArchitectureDiagramProps) {
  if (type === 'ai') {
    return (
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            AI / RAG Pipeline Architecture
          </span>
          <span className="text-[11px] font-mono text-zinc-500">Data & Inference Flow</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
          {/* Node 1 */}
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex flex-col items-center">
            <Globe className="w-5 h-5 text-purple-400 mb-2" />
            <span className="text-xs font-bold text-white">Client UI</span>
            <span className="text-[10px] text-zinc-400 font-mono">User Query Prompt</span>
          </div>

          <div className="hidden md:flex justify-center text-purple-400">
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>

          {/* Node 2 */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col items-center">
            <Server className="w-5 h-5 text-indigo-400 mb-2" />
            <span className="text-xs font-bold text-white">Flask/FastAPI</span>
            <span className="text-[10px] text-zinc-400 font-mono">Intent & Validation</span>
          </div>

          <div className="hidden md:flex justify-center text-indigo-400">
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>

          {/* Node 3 */}
          <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 flex flex-col items-center">
            <Bot className="w-5 h-5 text-sky-400 mb-2" />
            <span className="text-xs font-bold text-white">LLM Pipeline</span>
            <span className="text-[10px] text-zinc-400 font-mono">Synthesis & Response</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-zinc-400 flex items-center justify-between">
          <span>Latency: ~400ms streaming</span>
          <span>Security: Prompt sanitization & disclaimers</span>
        </div>
      </div>
    );
  }

  if (type === 'erp') {
    return (
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
            Multi-Module Enterprise ERP Architecture
          </span>
          <span className="text-[11px] font-mono text-zinc-500">Atomic Transactions & RBAC</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center text-center">
          {/* Node 1 */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
            <Globe className="w-5 h-5 text-indigo-400 mb-2" />
            <span className="text-xs font-bold text-white">React.js Client</span>
            <span className="text-[10px] text-zinc-400 font-mono">Role Views & Dashboards</span>
          </div>

          {/* Node 2 */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-indigo-400 mb-2" />
            <span className="text-xs font-bold text-white">RBAC Middleware</span>
            <span className="text-[10px] text-zinc-400 font-mono">Permission Gates & JWT</span>
          </div>

          {/* Node 3 */}
          <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 flex flex-col items-center">
            <Cpu className="w-5 h-5 text-sky-400 mb-2" />
            <span className="text-xs font-bold text-white">Node / Express APIs</span>
            <span className="text-[10px] text-zinc-400 font-mono">Inventory / Orders / Quotes</span>
          </div>

          {/* Node 4 */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col items-center">
            <Database className="w-5 h-5 text-emerald-400 mb-2" />
            <span className="text-xs font-bold text-white">MongoDB Database</span>
            <span className="text-[10px] text-zinc-400 font-mono">Structured Collections</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-zinc-400 flex items-center justify-between">
          <span>Integrity: Transaction rollback safety</span>
          <span>Audit: Full modification history logs</span>
        </div>
      </div>
    );
  }

  // Default Full-Stack Architecture
  return (
    <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
          Full-Stack Web Architecture
        </span>
        <span className="text-[11px] font-mono text-zinc-500">React + Node.js + Express + MongoDB</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center text-center">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
          <Globe className="w-5 h-5 text-sky-400 mb-2" />
          <span className="text-xs font-bold text-white">React Frontend</span>
          <span className="text-[10px] text-zinc-400 font-mono">Components & State</span>
        </div>

        <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 flex flex-col items-center">
          <Zap className="w-5 h-5 text-sky-400 mb-2" />
          <span className="text-xs font-bold text-white">REST API Gateway</span>
          <span className="text-[10px] text-zinc-400 font-mono">Express.js Router & JWT</span>
        </div>

        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col items-center">
          <Server className="w-5 h-5 text-indigo-400 mb-2" />
          <span className="text-xs font-bold text-white">Business Controllers</span>
          <span className="text-[10px] text-zinc-400 font-mono">Cart, Orders & Inventory</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col items-center">
          <Database className="w-5 h-5 text-emerald-400 mb-2" />
          <span className="text-xs font-bold text-white">MongoDB Storage</span>
          <span className="text-[10px] text-zinc-400 font-mono">Mongoose Models</span>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-zinc-400 flex items-center justify-between">
        <span>Security: JWT Auth & HTTP-only Cookies</span>
        <span>Validation: Input sanitization & Bcrypt</span>
      </div>
    </div>
  );
}
