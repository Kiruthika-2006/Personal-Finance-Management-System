import React, { useState } from 'react';
import { Terminal, Code2, BookOpen, Sparkles, Download, Layers, ShieldCheck, Check } from 'lucide-react';
import { TransactionModel, ActiveTab } from './types';
import { ConsoleTerminal } from './components/ConsoleTerminal';
import { LiveStateInspector } from './components/LiveStateInspector';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { IdeGuideManual } from './components/IdeGuideManual';
import { FutureUpgrades } from './components/FutureUpgrades';
import { JAVA_FILES } from './data/javaSourceFiles';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('terminal');
  const [downloadedAll, setDownloadedAll] = useState(false);

  // Shared in-memory JVM heap state initialized with sample transactions matching the prompt manual
  const [transactions, setTransactions] = useState<TransactionModel[]>([
    {
      id: 1,
      type: 'Income',
      category: 'Salary',
      description: 'September Salary',
      amount: 30000.0,
      date: '2026-09-18',
    },
    {
      id: 2,
      type: 'Expense',
      category: 'Food',
      description: 'Lunch',
      amount: 150.0,
      date: '2026-09-18',
    },
  ]);

  const [nextId, setNextId] = useState(3);

  // Download all Java files as separate text triggers
  const downloadAllSourceFiles = () => {
    JAVA_FILES.forEach((file) => {
      const element = document.createElement('a');
      const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(blob);
      element.download = file.name;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
    setDownloadedAll(true);
    setTimeout(() => setDownloadedAll(false), 3000);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 font-sans selection:bg-emerald-900 selection:text-emerald-100 overflow-hidden">
      {/* Top Application Header */}
      <header className="h-16 px-4 md:px-6 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between shrink-0 z-10 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-bold text-slate-100 tracking-tight">
                Personal Finance Management System
              </h1>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                Java 17+ Console Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Modular OOP Architecture • Scanner Menu Loop • ArrayList In-Memory Store
            </p>
          </div>
        </div>

        {/* Global Action & Tabs */}
        <div className="flex items-center gap-2">
          {/* View Switcher Tabs */}
          <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              id="tab-terminal-btn"
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'terminal'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Interactive</span> Console
            </button>
            <button
              id="tab-code-btn"
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'code'
                  ? 'bg-slate-800 text-sky-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Java Code
            </button>
            <button
              id="tab-guide-btn"
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'guide'
                  ? 'bg-slate-800 text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Manual & IDE
            </button>
            <button
              id="tab-upgrades-btn"
              onClick={() => setActiveTab('upgrades')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'upgrades'
                  ? 'bg-slate-800 text-amber-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Roadmap
            </button>
          </div>

          {/* Download Java Files Button */}
          <button
            id="download-all-sources-btn"
            onClick={downloadAllSourceFiles}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/80 rounded-lg transition-colors shadow-sm"
            title="Download all Java source code files (.java)"
          >
            {downloadedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{downloadedAll ? 'Downloaded!' : 'Export Java (.java)'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 p-3 md:p-5 overflow-hidden">
        {activeTab === 'terminal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            {/* Left 7 Columns: Interactive Console Terminal */}
            <div className="lg:col-span-7 h-full">
              <ConsoleTerminal
                transactions={transactions}
                setTransactions={setTransactions}
                nextId={nextId}
                setNextId={setNextId}
              />
            </div>

            {/* Right 5 Columns: Live JVM Memory & Heap State Inspector */}
            <div className="lg:col-span-5 h-full">
              <LiveStateInspector transactions={transactions} />
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="h-full">
            <JavaCodeViewer />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="h-full">
            <IdeGuideManual />
          </div>
        )}

        {activeTab === 'upgrades' && (
          <div className="h-full">
            <FutureUpgrades />
          </div>
        )}
      </main>
    </div>
  );
}
