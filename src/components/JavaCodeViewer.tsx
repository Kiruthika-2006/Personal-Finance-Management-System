import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { JAVA_FILES } from '../data/javaSourceFiles';

export const JavaCodeViewer: React.FC = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = JAVA_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* File Tabs Navigation */}
      <div className="flex items-center justify-between px-3 bg-slate-950 border-b border-slate-800 overflow-x-auto">
        <div className="flex items-center gap-1 py-2">
          {JAVA_FILES.map((file, idx) => {
            const isActive = idx === selectedFileIndex;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFileIndex(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-sky-300 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                {file.name}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 py-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
          <button
            onClick={() => handleDownload(activeFile.name, activeFile.code)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-sky-300 hover:text-sky-200 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800/60 rounded-lg transition-colors"
            title={`Download ${activeFile.name}`}
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>

      {/* File Metadata & OOP Highlights Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-100 font-mono">{activeFile.name}</span>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-sky-950 text-sky-300 border border-sky-800">
                {activeFile.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{activeFile.description}</p>
          </div>
        </div>

        {/* OOP Highlights */}
        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
          <div className="text-[11px] font-semibold text-indigo-300 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            Object-Oriented Design & Implementation Highlights:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {activeFile.oopHighlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Source Code Box with Line Numbers */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed selection:bg-sky-900 selection:text-sky-100">
        <pre className="text-slate-300">
          <code>
            {activeFile.code.split('\n').map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-right select-none text-slate-600 w-8">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
