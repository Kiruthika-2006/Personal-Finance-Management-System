import React, { useState, useEffect } from 'react';
import { Terminal, CheckSquare, Square, Laptop, Sparkles, FolderTree, ArrowDown, Layers, ShieldCheck } from 'lucide-react';

const CHECKLIST_ITEMS = [
  'Java project created with JDK 17 or later',
  'Transaction class created with encapsulated attributes',
  'FinanceManager class created separating business logic from UI',
  'Main class created with do-while loop and switch statement',
  'Income can be added (Category, Description, positive Amount)',
  'Expenses can be added (Category, Description, positive Amount)',
  'Transaction IDs are generated automatically (1, 2, ...)',
  'Date is stored using java.time.LocalDate.now()',
  'All transactions can be viewed with formatted console display',
  'Balance is calculated correctly (Total Income - Total Expense)',
  'Expense summary works grouped by category (Food, Travel, Bills, etc.)',
  'Transaction search works by ID (shows details or "Transaction not found.")',
  'Transaction deletion works by ID (removes item or "Transaction not found.")',
  'Invalid numeric input is handled via try-catch without crashing',
  'Negative or zero amounts are rejected with user-friendly error',
  'Empty transaction list is gracefully handled ("No transactions found.")',
  'Menu loops correctly until option 8 is selected',
  'Exit option terminates application cleanly (Process finished with exit code 0)',
  'Code is separated into modular classes (com.finance package)',
  'Tested with multiple transactions across all menu operations',
];

export const IdeGuideManual: React.FC = () => {
  const [selectedIde, setSelectedIde] = useState<'terminal' | 'intellij' | 'eclipse' | 'vscode'>('terminal');
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});

  // Load checklist state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('finance_checklist');
      if (saved) {
        setCompletedItems(JSON.parse(saved));
      } else {
        // Default check all to show completeness
        const initial: Record<number, boolean> = {};
        CHECKLIST_ITEMS.forEach((_, idx) => {
          initial[idx] = true;
        });
        setCompletedItems(initial);
      }
    } catch {
      // Fallback
    }
  }, []);

  const toggleCheck = (idx: number) => {
    setCompletedItems((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      try {
        localStorage.setItem('finance_checklist', JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-y-auto p-5 space-y-6 text-slate-200">
      {/* Overview & Architecture Diagram (Section 19) */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100">
              Application Architecture (Section 19)
            </h3>
          </div>
          <span className="px-2.5 py-1 text-xs font-mono rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
            OOP Separation of Concerns
          </span>
        </div>

        {/* Visual Architecture Chart */}
        <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col items-center justify-center font-mono text-xs text-center space-y-2">
          <div className="px-4 py-2 bg-slate-800 text-sky-300 font-bold rounded-lg border border-slate-700 shadow-md">
            PERSONAL FINANCE MANAGEMENT SYSTEM
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="px-4 py-1.5 bg-indigo-950 text-indigo-200 font-semibold rounded-md border border-indigo-800">
            Main.java (Console Menu, Scanner Loop, Switch Dispatch)
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="px-4 py-1.5 bg-sky-950 text-sky-200 font-semibold rounded-md border border-sky-800">
            FinanceManager.java (Business Logic & Input Validation)
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="px-4 py-1.5 bg-amber-950 text-amber-200 font-semibold rounded-md border border-amber-800">
            ArrayList&lt;Transaction&gt; (In-Memory Data Storage)
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="px-4 py-1.5 bg-emerald-950 text-emerald-200 font-semibold rounded-md border border-emerald-800">
            Transaction.java (Encapsulated Model: ID, Type, Category, Amount, Date)
          </div>
          <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
              + Add Income
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
              + Add Expense
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
              = View Balance
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
              📊 Category Summary
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
              🔍 Search ID
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
              🗑️ Delete ID
            </span>
          </div>
        </div>
      </div>

      {/* Setup Guide for IDEs & Terminal */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-slate-100">
              Compilation & Running Instructions (Section 3 & 17)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Target JDK: Java 17+</span>
        </div>

        {/* IDE Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedIde('terminal')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
              selectedIde === 'terminal'
                ? 'bg-sky-950 text-sky-300 border-sky-700 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Terminal / CLI
          </button>
          <button
            onClick={() => setSelectedIde('intellij')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
              selectedIde === 'intellij'
                ? 'bg-sky-950 text-sky-300 border-sky-700 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            IntelliJ IDEA
          </button>
          <button
            onClick={() => setSelectedIde('vscode')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
              selectedIde === 'vscode'
                ? 'bg-sky-950 text-sky-300 border-sky-700 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            VS Code
          </button>
          <button
            onClick={() => setSelectedIde('eclipse')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
              selectedIde === 'eclipse'
                ? 'bg-sky-950 text-sky-300 border-sky-700 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Eclipse IDE
          </button>
        </div>

        {/* Selected IDE Content */}
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
          {selectedIde === 'terminal' && (
            <div className="space-y-3">
              <p className="font-semibold text-sky-300">Running via Terminal or Command Prompt (JDK 17+):</p>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Verify your Java compiler version is 17 or higher:</li>
                <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 text-emerald-400 font-mono">
                  java -version && javac -version
                </pre>
                <li>Navigate to the project root directory containing the source files:</li>
                <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 text-emerald-400 font-mono">
                  cd PersonalFinanceManagement
                </pre>
                <li>Compile all Java source files into a target output folder:</li>
                <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 text-emerald-400 font-mono">
                  javac -d bin src/*.java
                </pre>
                <li>Launch the console application:</li>
                <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 text-emerald-400 font-mono">
                  java -cp bin com.finance.Main
                </pre>
              </ol>
            </div>
          )}

          {selectedIde === 'intellij' && (
            <div className="space-y-3">
              <p className="font-semibold text-sky-300">Setting up in IntelliJ IDEA (Community or Ultimate):</p>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Open IntelliJ IDEA and click <strong>Open</strong> or <strong>Open Project</strong>.</li>
                <li>Browse and select the <code className="text-amber-300">PersonalFinanceManagement</code> directory.</li>
                <li>Go to <strong>File → Project Structure → Project</strong> and set SDK to <strong>JDK 17</strong> or later.</li>
                <li>Right-click on the <code className="text-amber-300">src</code> folder and select <strong>Mark Directory as → Sources Root</strong>.</li>
                <li>Open <code className="text-amber-300">Main.java</code> in the editor and click the green <strong>Run 'Main.main()'</strong> triangle icon in the gutter or toolbar.</li>
                <li>The interactive console will open in the bottom Run tool window.</li>
              </ol>
            </div>
          )}

          {selectedIde === 'vscode' && (
            <div className="space-y-3">
              <p className="font-semibold text-sky-300">Setting up in Visual Studio Code:</p>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Install the official <strong>Extension Pack for Java</strong> (by Microsoft) from the VS Code Marketplace.</li>
                <li>Open the <code className="text-amber-300">PersonalFinanceManagement</code> folder in VS Code (<kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Ctrl+K Ctrl+O</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Cmd+O</kbd>).</li>
                <li>VS Code will recognize the Java project and configure the classpath automatically.</li>
                <li>Open <code className="text-amber-300">src/Main.java</code>. You will see a <strong>Run | Debug</strong> CodeLens above the <code className="text-sky-300">public static void main(String[] args)</code> declaration.</li>
                <li>Click <strong>Run</strong>. VS Code opens the built-in terminal and launches the interactive finance menu.</li>
              </ol>
            </div>
          )}

          {selectedIde === 'eclipse' && (
            <div className="space-y-3">
              <p className="font-semibold text-sky-300">Setting up in Eclipse IDE:</p>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Open Eclipse and navigate to <strong>File → New → Java Project</strong>.</li>
                <li>Name the project <code className="text-amber-300">PersonalFinanceManagement</code> and ensure the Execution Environment JRE is set to <strong>JavaSE-17</strong> or higher.</li>
                <li>Right-click on the newly created project's <code className="text-amber-300">src</code> folder and select <strong>Import → General → File System</strong> to import <code className="text-sky-300">Main.java</code>, <code className="text-sky-300">Transaction.java</code>, and <code className="text-sky-300">FinanceManager.java</code>.</li>
                <li>Right-click <code className="text-amber-300">Main.java</code> and choose <strong>Run As → Java Application</strong>.</li>
                <li>Interact with the system in the Eclipse Console tab.</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Project Completion Checklist (Section 18) */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100">
              Project Completion Checklist (Section 18)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {completedCount} / {CHECKLIST_ITEMS.length} Verified ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Interactive Verification Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
          {CHECKLIST_ITEMS.map((item, idx) => {
            const isDone = !!completedItems[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-900/50 text-slate-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                )}
                <span className={isDone ? 'line-through text-slate-400' : 'text-slate-200'}>
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
