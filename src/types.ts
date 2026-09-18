export interface TransactionModel {
  id: number;
  type: 'Income' | 'Expense';
  category: string;
  description: string;
  amount: number;
  date: string;
}

export type InputMode =
  | 'MENU'
  | 'INCOME_CATEGORY'
  | 'INCOME_DESC'
  | 'INCOME_AMOUNT'
  | 'EXPENSE_CATEGORY'
  | 'EXPENSE_DESC'
  | 'EXPENSE_AMOUNT'
  | 'SEARCH_ID'
  | 'DELETE_ID'
  | 'PRESS_ENTER'
  | 'TERMINATED';

export interface TerminalLine {
  id: string;
  text: string;
  type: 'menu' | 'prompt' | 'input' | 'output' | 'error' | 'success' | 'separator' | 'system';
}

export type ActiveTab = 'terminal' | 'code' | 'guide' | 'upgrades';
