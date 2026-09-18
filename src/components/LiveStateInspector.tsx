import React from 'react';
import { Database, TrendingUp, TrendingDown, Wallet, Tag, Calendar, Layers } from 'lucide-react';
import { TransactionModel } from '../types';

interface LiveStateInspectorProps {
  transactions: TransactionModel[];
}

export const LiveStateInspector: React.FC<LiveStateInspectorProps> = ({ transactions }) => {
  let totalIncome = 0;
  let totalExpense = 0;
  const categorySummary: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type.toLowerCase() === 'income') {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
      categorySummary[t.category] = (categorySummary[t.category] || 0) + t.amount;
    }
  });

  const balance = totalIncome - totalExpense;

  return (
    <div className="flex flex-col h-full bg-slate-900/70 backdrop-blur border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-200">
            JVM Memory Inspector: <span className="font-mono text-sky-300">ArrayList&lt;Transaction&gt;</span>
          </h3>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          {transactions.length} record{transactions.length !== 1 ? 's' : ''} in memory
        </span>
      </div>

      {/* Financial Metric Badges */}
      <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/30">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            Total Income
          </div>
          <div className="text-base font-bold text-emerald-300 font-mono mt-0.5">
            Rs.{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-800/30">
          <div className="flex items-center gap-1.5 text-[11px] text-rose-400 font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            Total Expense
          </div>
          <div className="text-base font-bold text-rose-300 font-mono mt-0.5">
            Rs.{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-800/30">
          <div className="flex items-center gap-1.5 text-[11px] text-sky-400 font-medium">
            <Wallet className="w-3.5 h-3.5" />
            Current Balance
          </div>
          <div className={`text-base font-bold font-mono mt-0.5 ${balance >= 0 ? 'text-sky-300' : 'text-amber-400'}`}>
            Rs.{balance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </div>
        </div>
      </div>

      {/* Main Content: Table & Category Breakdown */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Category Breakdown Chips */}
        {Object.keys(categorySummary).length > 0 && (
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-indigo-400" />
              Category Expenses Breakdown (Map&lt;String, Double&gt;)
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(categorySummary).map(([cat, amount]) => (
                <div
                  key={cat}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/70 border border-slate-700/70 text-xs"
                >
                  <Tag className="w-3 h-3 text-indigo-400" />
                  <span className="text-slate-300 font-medium">{cat}</span>
                  <span className="text-rose-300 font-mono font-semibold">
                    Rs.{amount.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Database className="w-3 h-3 text-sky-400" />
            In-Memory Transaction Heap
          </div>

          {transactions.length === 0 ? (
            <div className="p-6 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
              No transactions currently stored in ArrayList. Add income or expenses via the terminal prompt.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 select-none">
                    <th className="py-2 px-2.5 font-mono">ID</th>
                    <th className="py-2 px-2.5">Type</th>
                    <th className="py-2 px-2.5">Category</th>
                    <th className="py-2 px-2.5">Description</th>
                    <th className="py-2 px-2.5 text-right font-mono">Amount</th>
                    <th className="py-2 px-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {transactions.map((tx) => {
                    const isIncome = tx.type.toLowerCase() === 'income';
                    return (
                      <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2 px-2.5 font-mono font-bold text-slate-300">
                          #{tx.id}
                        </td>
                        <td className="py-2 px-2.5">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              isIncome
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                                : 'bg-rose-950 text-rose-300 border border-rose-800/60'
                            }`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-2 px-2.5 text-slate-200 font-medium">
                          {tx.category}
                        </td>
                        <td className="py-2 px-2.5 text-slate-400 truncate max-w-[140px]" title={tx.description}>
                          {tx.description}
                        </td>
                        <td className={`py-2 px-2.5 text-right font-mono font-semibold ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isIncome ? '+' : '-'}Rs.{tx.amount.toFixed(1)}
                        </td>
                        <td className="py-2 px-2.5 text-slate-400 text-[11px] whitespace-nowrap font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {tx.date}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
