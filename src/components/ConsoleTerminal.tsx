import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal as TerminalIcon, Sparkles, CornerDownLeft, ShieldAlert } from 'lucide-react';
import { TransactionModel, InputMode, TerminalLine } from '../types';

interface ConsoleTerminalProps {
  transactions: TransactionModel[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionModel[]>>;
  nextId: number;
  setNextId: React.Dispatch<React.SetStateAction<number>>;
}

const MENU_TEXT = `========================================
       PERSONAL FINANCE MANAGEMENT
========================================
1. Add Income
2. Add Expense
3. View Transactions
4. View Balance
5. Expense Summary
6. Search Transaction
7. Delete Transaction
8. Exit
========================================`;

export const ConsoleTerminal: React.FC<ConsoleTerminalProps> = ({
  transactions,
  setTransactions,
  nextId,
  setNextId,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputMode, setInputMode] = useState<InputMode>('MENU');
  const [promptLabel, setPromptLabel] = useState('Enter your choice: ');
  const [copied, setCopied] = useState(false);

  // Temporary holding state for multi-step prompts
  const [tempCategory, setTempCategory] = useState('');
  const [tempDescription, setTempDescription] = useState('');

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal output on mount
  useEffect(() => {
    resetTerminal();
  }, []);

  // Auto-scroll to bottom of console
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, promptLabel]);

  // Keep focus on input
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const addLine = (text: string, type: TerminalLine['type'] = 'output') => {
    setLines((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, text, type }]);
  };

  const resetTerminal = () => {
    setLines([
      { id: '1', text: 'Java(TM) SE Runtime Environment (build 17.0.10+7) - Starting Main.main()...', type: 'system' },
      { id: '2', text: MENU_TEXT, type: 'menu' },
    ]);
    setInputMode('MENU');
    setPromptLabel('Enter your choice: ');
    setInputValue('');
  };

  // Helper to show menu again
  const showMenuAndPrompt = () => {
    addLine('\n' + MENU_TEXT, 'menu');
    setInputMode('MENU');
    setPromptLabel('Enter your choice: ');
  };

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = inputValue;
    const trimmed = rawInput.trim();

    // Log the user's input with the prompt
    addLine(`${promptLabel}${rawInput}`, 'input');
    setInputValue('');

    switch (inputMode) {
      case 'MENU': {
        const choice = parseInt(trimmed, 10);
        if (isNaN(choice)) {
          addLine('\nInvalid choice. Please enter a valid number (1-8).\n', 'error');
          addLine(MENU_TEXT, 'menu');
          setPromptLabel('Enter your choice: ');
          return;
        }

        switch (choice) {
          case 1: // Add Income
            addLine('\n--- Add Income ---', 'output');
            setInputMode('INCOME_CATEGORY');
            setPromptLabel('Enter category: ');
            break;

          case 2: // Add Expense
            addLine('\n--- Add Expense ---', 'output');
            setInputMode('EXPENSE_CATEGORY');
            setPromptLabel('Enter category: ');
            break;

          case 3: // View All Transactions
            addLine('\n========== ALL TRANSACTIONS ==========', 'output');
            if (transactions.length === 0) {
              addLine('No transactions found.', 'output');
            } else {
              transactions.forEach((t, index) => {
                addLine(
                  `Transaction ID : ${t.id}\n` +
                  `Type           : ${t.type}\n` +
                  `Category       : ${t.category}\n` +
                  `Description    : ${t.description}\n` +
                  `Amount         : Rs.${t.amount.toFixed(1)}\n` +
                  `Date           : ${t.date}`,
                  'output'
                );
                if (index < transactions.length - 1) {
                  addLine('\n---------------------------------------\n', 'separator');
                }
              });
            }
            addLine('\nPress Enter to return to the menu...', 'prompt');
            setInputMode('PRESS_ENTER');
            setPromptLabel('');
            break;

          case 4: { // View Balance
            let totalIncome = 0;
            let totalExpense = 0;
            transactions.forEach((t) => {
              if (t.type.toLowerCase() === 'income') totalIncome += t.amount;
              else if (t.type.toLowerCase() === 'expense') totalExpense += t.amount;
            });
            const balance = totalIncome - totalExpense;

            addLine(
              `\n========== BALANCE ==========\n\n` +
              `Total Income  : Rs.${totalIncome.toFixed(1)}\n` +
              `Total Expense : Rs.${totalExpense.toFixed(1)}\n` +
              `----------------------------\n` +
              `Current Balance: Rs.${balance.toFixed(1)}`,
              'output'
            );
            addLine('\nPress Enter to return to the menu...', 'prompt');
            setInputMode('PRESS_ENTER');
            setPromptLabel('');
            break;
          }

          case 5: { // Expense Summary
            addLine('\n========== EXPENSE SUMMARY ==========\n', 'output');
            const expenseMap: Record<string, number> = {};
            let hasExpenses = false;

            transactions.forEach((t) => {
              if (t.type.toLowerCase() === 'expense') {
                hasExpenses = true;
                expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
              }
            });

            if (!hasExpenses) {
              addLine('No expense transactions recorded yet.', 'output');
            } else {
              const summaryLines = Object.entries(expenseMap).map(
                ([cat, sum]) => `${cat.padEnd(14, ' ')}: Rs.${sum.toFixed(1)}`
              );
              addLine(summaryLines.join('\n'), 'output');
            }

            addLine('\nPress Enter to return to the menu...', 'prompt');
            setInputMode('PRESS_ENTER');
            setPromptLabel('');
            break;
          }

          case 6: // Search Transaction
            setInputMode('SEARCH_ID');
            setPromptLabel('Enter Transaction ID: ');
            break;

          case 7: // Delete Transaction
            setInputMode('DELETE_ID');
            setPromptLabel('Enter Transaction ID: ');
            break;

          case 8: // Exit
            addLine('\nThank you for using Personal Finance Management System. Goodbye!', 'success');
            addLine('Process finished with exit code 0', 'system');
            setInputMode('TERMINATED');
            setPromptLabel('');
            break;

          default:
            addLine('\nInvalid choice. Please select an option between 1 and 8.', 'error');
            addLine('\nPress Enter to return to the menu...', 'prompt');
            setInputMode('PRESS_ENTER');
            setPromptLabel('');
            break;
        }
        break;
      }

      // ----------------- Add Income Steps -----------------
      case 'INCOME_CATEGORY':
        if (!trimmed) {
          addLine('Field cannot be empty. Please enter a value.', 'error');
          setPromptLabel('Enter category: ');
          return;
        }
        setTempCategory(trimmed);
        setInputMode('INCOME_DESC');
        setPromptLabel('Enter description: ');
        break;

      case 'INCOME_DESC':
        if (!trimmed) {
          addLine('Field cannot be empty. Please enter a value.', 'error');
          setPromptLabel('Enter description: ');
          return;
        }
        setTempDescription(trimmed);
        setInputMode('INCOME_AMOUNT');
        setPromptLabel('Enter amount: ');
        break;

      case 'INCOME_AMOUNT': {
        const val = parseFloat(trimmed);
        if (isNaN(val)) {
          addLine('Invalid input. Please enter a valid numeric amount.', 'error');
          setPromptLabel('Enter amount: ');
          return;
        }
        if (val <= 0) {
          addLine('Invalid amount. Please enter a positive value.', 'error');
          setPromptLabel('Enter amount: ');
          return;
        }

        const newId = nextId;
        setNextId((prev) => prev + 1);
        const today = new Date().toISOString().split('T')[0];
        const newTx: TransactionModel = {
          id: newId,
          type: 'Income',
          category: tempCategory,
          description: tempDescription,
          amount: val,
          date: today,
        };

        setTransactions((prev) => [...prev, newTx]);
        addLine('\nIncome added successfully!', 'success');
        addLine(`Transaction ID: ${newId}`, 'success');
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }

      // ----------------- Add Expense Steps -----------------
      case 'EXPENSE_CATEGORY':
        if (!trimmed) {
          addLine('Field cannot be empty. Please enter a value.', 'error');
          setPromptLabel('Enter category: ');
          return;
        }
        setTempCategory(trimmed);
        setInputMode('EXPENSE_DESC');
        setPromptLabel('Enter description: ');
        break;

      case 'EXPENSE_DESC':
        if (!trimmed) {
          addLine('Field cannot be empty. Please enter a value.', 'error');
          setPromptLabel('Enter description: ');
          return;
        }
        setTempDescription(trimmed);
        setInputMode('EXPENSE_AMOUNT');
        setPromptLabel('Enter amount: ');
        break;

      case 'EXPENSE_AMOUNT': {
        const val = parseFloat(trimmed);
        if (isNaN(val)) {
          addLine('Invalid input. Please enter a valid numeric amount.', 'error');
          setPromptLabel('Enter amount: ');
          return;
        }
        if (val <= 0) {
          addLine('Invalid amount. Please enter a positive value.', 'error');
          setPromptLabel('Enter amount: ');
          return;
        }

        const newId = nextId;
        setNextId((prev) => prev + 1);
        const today = new Date().toISOString().split('T')[0];
        const newTx: TransactionModel = {
          id: newId,
          type: 'Expense',
          category: tempCategory,
          description: tempDescription,
          amount: val,
          date: today,
        };

        setTransactions((prev) => [...prev, newTx]);
        addLine('\nExpense added successfully!', 'success');
        addLine(`Transaction ID: ${newId}`, 'success');
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }

      // ----------------- Search Step -----------------
      case 'SEARCH_ID': {
        const id = parseInt(trimmed, 10);
        if (isNaN(id)) {
          addLine('Invalid ID. Please enter an integer number.', 'error');
          setPromptLabel('Enter Transaction ID: ');
          return;
        }

        const found = transactions.find((t) => t.id === id);
        if (found) {
          addLine(
            `\nTransaction ID : ${found.id}\n` +
            `Type           : ${found.type}\n` +
            `Category       : ${found.category}\n` +
            `Description    : ${found.description}\n` +
            `Amount         : Rs.${found.amount.toFixed(1)}\n` +
            `Date           : ${found.date}`,
            'output'
          );
        } else {
          addLine('\nTransaction not found.', 'error');
        }

        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }

      // ----------------- Delete Step -----------------
      case 'DELETE_ID': {
        const id = parseInt(trimmed, 10);
        if (isNaN(id)) {
          addLine('Invalid ID. Please enter an integer number.', 'error');
          setPromptLabel('Enter Transaction ID: ');
          return;
        }

        const exists = transactions.some((t) => t.id === id);
        if (exists) {
          setTransactions((prev) => prev.filter((t) => t.id !== id));
          addLine('\nTransaction deleted successfully!', 'success');
        } else {
          addLine('\nTransaction not found.', 'error');
        }

        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }

      // ----------------- Return to Menu -----------------
      case 'PRESS_ENTER':
        showMenuAndPrompt();
        break;

      case 'TERMINATED':
        // No-op until restarted
        break;
    }
  };

  // Quick Automated Test Scenarios from Section 15 of Prompt Manual
  const runTestScenario = (testNumber: number) => {
    switch (testNumber) {
      case 1: { // Test 1 - Add Income (Salary, September Salary, 30000)
        const newId = nextId;
        setNextId((prev) => prev + 1);
        const today = new Date().toISOString().split('T')[0];
        const newTx: TransactionModel = {
          id: newId,
          type: 'Income',
          category: 'Salary',
          description: 'September Salary',
          amount: 30000,
          date: today,
        };
        setTransactions((prev) => [...prev, newTx]);
        addLine('\n> [TEST 1 EXECUTION: Add Income]', 'system');
        addLine('Enter your choice: 1', 'input');
        addLine('--- Add Income ---', 'output');
        addLine('Enter category: Salary', 'input');
        addLine('Enter description: September Salary', 'input');
        addLine('Enter amount: 30000', 'input');
        addLine('\nIncome added successfully!', 'success');
        addLine(`Transaction ID: ${newId}`, 'success');
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }
      case 2: { // Test 2 - Add Expense (Food, Lunch, 150)
        const newId = nextId;
        setNextId((prev) => prev + 1);
        const today = new Date().toISOString().split('T')[0];
        const newTx: TransactionModel = {
          id: newId,
          type: 'Expense',
          category: 'Food',
          description: 'Lunch',
          amount: 150,
          date: today,
        };
        setTransactions((prev) => [...prev, newTx]);
        addLine('\n> [TEST 2 EXECUTION: Add Expense]', 'system');
        addLine('Enter your choice: 2', 'input');
        addLine('--- Add Expense ---', 'output');
        addLine('Enter category: Food', 'input');
        addLine('Enter description: Lunch', 'input');
        addLine('Enter amount: 150', 'input');
        addLine('\nExpense added successfully!', 'success');
        addLine(`Transaction ID: ${newId}`, 'success');
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }
      case 3: { // Test 3 - Balance Check
        let totalIncome = 0;
        let totalExpense = 0;
        transactions.forEach((t) => {
          if (t.type.toLowerCase() === 'income') totalIncome += t.amount;
          else if (t.type.toLowerCase() === 'expense') totalExpense += t.amount;
        });
        const balance = totalIncome - totalExpense;

        addLine('\n> [TEST 3 EXECUTION: View Balance]', 'system');
        addLine('Enter your choice: 4', 'input');
        addLine(
          `\n========== BALANCE ==========\n\n` +
          `Total Income  : Rs.${totalIncome.toFixed(1)}\n` +
          `Total Expense : Rs.${totalExpense.toFixed(1)}\n` +
          `----------------------------\n` +
          `Current Balance: Rs.${balance.toFixed(1)}`,
          'output'
        );
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }
      case 4: { // Test 4 - Search Transaction ID = 2
        addLine('\n> [TEST 4 EXECUTION: Search Transaction ID = 2]', 'system');
        addLine('Enter your choice: 6', 'input');
        addLine('Enter Transaction ID: 2', 'input');
        const found = transactions.find((t) => t.id === 2);
        if (found) {
          addLine(
            `\nTransaction ID : ${found.id}\n` +
            `Type           : ${found.type}\n` +
            `Category       : ${found.category}\n` +
            `Description    : ${found.description}\n` +
            `Amount         : Rs.${found.amount.toFixed(1)}\n` +
            `Date           : ${found.date}`,
            'output'
          );
        } else {
          addLine('\nTransaction not found.', 'error');
        }
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }
      case 5: { // Test 5 - Invalid Search ID = 999
        addLine('\n> [TEST 5 EXECUTION: Search Invalid ID = 999]', 'system');
        addLine('Enter your choice: 6', 'input');
        addLine('Enter Transaction ID: 999', 'input');
        addLine('\nTransaction not found.', 'error');
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }
      case 6: { // Test 6 - Delete ID = 2
        addLine('\n> [TEST 6 EXECUTION: Delete Transaction ID = 2]', 'system');
        addLine('Enter your choice: 7', 'input');
        addLine('Enter Transaction ID: 2', 'input');
        const exists = transactions.some((t) => t.id === 2);
        if (exists) {
          setTransactions((prev) => prev.filter((t) => t.id !== 2));
          addLine('\nTransaction deleted successfully!', 'success');
        } else {
          addLine('\nTransaction not found.', 'error');
        }
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }
      case 7: { // Test 7 - Invalid Amount (-100)
        addLine('\n> [TEST 7 EXECUTION: Input Validation Test]', 'system');
        addLine('Enter your choice: 1', 'input');
        addLine('--- Add Income ---', 'output');
        addLine('Enter category: Bonus', 'input');
        addLine('Enter description: Quarterly', 'input');
        addLine('Enter amount: -100', 'input');
        addLine('Invalid amount. Please enter a positive value.', 'error');
        addLine('Enter amount: 5000', 'input');
        const newId = nextId;
        setNextId((prev) => prev + 1);
        const today = new Date().toISOString().split('T')[0];
        setTransactions((prev) => [
          ...prev,
          { id: newId, type: 'Income', category: 'Bonus', description: 'Quarterly', amount: 5000, date: today },
        ]);
        addLine('\nIncome added successfully!', 'success');
        addLine(`Transaction ID: ${newId}`, 'success');
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }
      case 8: { // Test 8 - Empty Check
        setTransactions([]);
        setNextId(1);
        addLine('\n> [TEST 8 EXECUTION: Empty Transaction State]', 'system');
        addLine('Enter your choice: 3', 'input');
        addLine('\n========== ALL TRANSACTIONS ==========', 'output');
        addLine('No transactions found.', 'output');
        addLine('\nPress Enter to return to the menu...', 'prompt');
        setInputMode('PRESS_ENTER');
        setPromptLabel('');
        break;
      }
    }
  };

  const seedStandardDataset = () => {
    const today = new Date().toISOString().split('T')[0];
    const initialTxs: TransactionModel[] = [
      { id: 1, type: 'Income', category: 'Salary', description: 'September Salary', amount: 30000.0, date: today },
      { id: 2, type: 'Expense', category: 'Food', description: 'Lunch & Groceries', amount: 4000.0, date: today },
      { id: 3, type: 'Expense', category: 'Travel', description: 'Monthly Metro Pass', amount: 2500.0, date: today },
      { id: 4, type: 'Expense', category: 'Shopping', description: 'Office Apparel', amount: 3000.0, date: today },
      { id: 5, type: 'Expense', category: 'Bills', description: 'Electricity & Wifi', amount: 1500.0, date: today },
      { id: 6, type: 'Expense', category: 'Education', description: 'Java Certification Course', amount: 1000.0, date: today },
      { id: 7, type: 'Expense', category: 'Entertainment', description: 'Weekend Cinema', amount: 500.0, date: today },
    ];
    setTransactions(initialTxs);
    setNextId(8);
    addLine('\n> [SEEDED STANDARD DATASET: 1 Income + 6 Categorized Expenses loaded]', 'system');
    showMenuAndPrompt();
  };

  const copyTerminalOutput = () => {
    const fullText = lines.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            java com.finance.Main
          </span>
          <span className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-emerald-400 rounded border border-emerald-500/30">
            JDK 17 Console
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="seed-demo-data-btn"
            onClick={seedStandardDataset}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/50 rounded transition-colors"
            title="Preload sample transactions matching Section 4.5 manual"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load Sample Data
          </button>
          <button
            id="copy-terminal-output-btn"
            onClick={copyTerminalOutput}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded transition-colors"
            title="Copy entire console buffer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            id="restart-terminal-btn"
            onClick={resetTerminal}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded transition-colors"
            title="Restart Java runtime"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart
          </button>
        </div>
      </div>

      {/* Interactive Terminal Output Canvas */}
      <div
        className="flex-1 p-4 overflow-y-auto text-sm space-y-1 cursor-text bg-slate-950 text-slate-100 selection:bg-emerald-900 selection:text-emerald-100"
        onClick={focusInput}
      >
        {lines.map((line) => {
          let colorClass = 'text-slate-200';
          if (line.type === 'menu') colorClass = 'text-cyan-300 font-semibold';
          if (line.type === 'input') colorClass = 'text-amber-300 font-bold';
          if (line.type === 'system') colorClass = 'text-slate-500 italic';
          if (line.type === 'error') colorClass = 'text-rose-400 font-semibold';
          if (line.type === 'success') colorClass = 'text-emerald-400 font-semibold';
          if (line.type === 'separator') colorClass = 'text-slate-600';
          if (line.type === 'prompt') colorClass = 'text-sky-300';

          return (
            <div key={line.id} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
              {line.text}
            </div>
          );
        })}

        {/* Active Command Line Input */}
        {inputMode !== 'TERMINATED' ? (
          <form onSubmit={handleUserInput} className="flex items-center gap-1 pt-1">
            <span className="text-emerald-400 font-bold select-none">{promptLabel || '> '}</span>
            <input
              ref={inputRef}
              id="terminal-console-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent text-amber-200 font-mono text-sm outline-none border-none caret-emerald-400"
              placeholder={inputMode === 'PRESS_ENTER' ? 'Press Enter to continue...' : ''}
              autoFocus
            />
            {inputValue && (
              <button type="submit" className="text-slate-500 hover:text-slate-300">
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        ) : (
          <div className="py-2 text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            Application exited. Click "Restart" in the top-right to start a new session.
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Test Runner Strip (Automated Test Scenarios from Manual Section 15) */}
      <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
          Quick Test Scenarios:
        </span>
        <button
          onClick={() => runTestScenario(1)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] transition-colors"
        >
          Test 1: Add Salary (30k)
        </button>
        <button
          onClick={() => runTestScenario(2)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] transition-colors"
        >
          Test 2: Add Lunch (150)
        </button>
        <button
          onClick={() => runTestScenario(3)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] transition-colors"
        >
          Test 3: View Balance
        </button>
        <button
          onClick={() => runTestScenario(4)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] transition-colors"
        >
          Test 4: Search ID: 2
        </button>
        <button
          onClick={() => runTestScenario(5)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] transition-colors"
        >
          Test 5: Search ID: 999
        </button>
        <button
          onClick={() => runTestScenario(6)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] transition-colors"
        >
          Test 6: Delete ID: 2
        </button>
        <button
          onClick={() => runTestScenario(7)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-amber-900/50 text-[11px] transition-colors"
        >
          Test 7: Validation (-100)
        </button>
        <button
          onClick={() => runTestScenario(8)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded border border-rose-900/50 text-[11px] transition-colors"
        >
          Test 8: Empty List
        </button>
      </div>
    </div>
  );
};
