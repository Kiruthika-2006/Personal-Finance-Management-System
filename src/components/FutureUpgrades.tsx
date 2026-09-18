import React, { useState } from 'react';
import { Sparkles, Copy, Check, Layers, Code, ShieldCheck, Database, FileText, Lock, Gauge } from 'lucide-react';
import { UPGRADE_MODULES } from '../data/javaSourceFiles';

export const FutureUpgrades: React.FC = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-y-auto p-5 space-y-6 text-slate-200">
      {/* Header Banner */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100">
            Roadmap & Future Extensions (Sections 13 & 14)
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          From beginner-friendly in-memory collections to enterprise-grade persistence, authentication, and budget controls.
          Explore the architecture patterns and ready-to-use Java code implementations below.
        </p>
      </div>

      {/* Upgraded Menu 12-Option Specification (Section 13) */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-sky-400" />
            <h4 className="text-sm font-semibold text-slate-200">
              Recommended Improved Menu (Section 13)
            </h4>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-sky-300 border border-slate-700">
            12-Feature Spec
          </span>
        </div>
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>1. Add Income</div>
          <div>7. Update Transaction (NEW)</div>
          <div>2. Add Expense</div>
          <div>8. Delete Transaction</div>
          <div>3. View All Transactions</div>
          <div>9. Monthly Report (NEW)</div>
          <div>4. View Balance</div>
          <div>10. Set Monthly Budget (NEW)</div>
          <div>5. Expense Summary</div>
          <div>11. Check Budget Status (NEW)</div>
          <div>6. Search Transaction</div>
          <div>12. Exit</div>
        </div>
      </div>

      {/* Upgrade Levels Grid */}
      <div className="space-y-4">
        {UPGRADE_MODULES.map((module, idx) => (
          <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {module.level}
                </span>
                <h4 className="text-sm font-bold text-slate-100">{module.title}</h4>
              </div>
              <button
                onClick={() => handleCopy(module.codeSnippet, idx)}
                className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIdx === idx ? 'Copied' : 'Copy Implementation'}
              </button>
            </div>

            <p className="text-xs text-slate-400">{module.summary}</p>

            <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-200">
              <pre>
                <code>{module.codeSnippet}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
