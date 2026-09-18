export interface JavaFileItem {
  name: string;
  path: string;
  description: string;
  badge: string;
  code: string;
  oopHighlights: string[];
}

export const JAVA_FILES: JavaFileItem[] = [
  {
    name: 'Transaction.java',
    path: 'com/finance/Transaction.java',
    description: 'Data model representing an individual financial transaction. Enforces encapsulation with private attributes and public getters/setters.',
    badge: 'Model / Encapsulation',
    oopHighlights: [
      'Private attributes prevent unauthorized direct field mutation (Encapsulation)',
      'Parameterized constructor initializes all attributes cleanly',
      'Uses java.time.LocalDate for modern ISO-8601 date handling',
      'Includes display() for standardized console formatting',
      'Overrides toString() for debugging and object representation'
    ],
    code: `package com.finance;

import java.time.LocalDate;

/**
 * Transaction represents an individual financial record (Income or Expense).
 * Demonstrates Object-Oriented Programming (OOP) concepts:
 * - Encapsulation with private fields and public getters/setters.
 * - Constructor initialization.
 * - Formatted display method for console presentation.
 */
public class Transaction {
    private int id;
    private String type;        // "Income" or "Expense"
    private String category;    // e.g., Salary, Food, Travel, Bills
    private String description; // Brief narrative
    private double amount;      // Transaction value (must be > 0)
    private LocalDate date;     // Date of transaction

    /**
     * Parameterized Constructor
     */
    public Transaction(int id, String type, String category, String description, double amount, LocalDate date) {
        this.id = id;
        this.type = type;
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.date = date;
    }

    // Getters and Setters (Encapsulation)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    /**
     * Displays formatted details of the transaction in the console.
     */
    public void display() {
        System.out.println("Transaction ID : " + id);
        System.out.println("Type           : " + type);
        System.out.println("Category       : " + category);
        System.out.println("Description    : " + description);
        System.out.println("Amount         : Rs." + String.format("%.1f", amount));
        System.out.println("Date           : " + date);
    }

    @Override
    public String toString() {
        return "Transaction [ID=" + id + ", Type=" + type + ", Category=" + category +
               ", Description=" + description + ", Amount=Rs." + amount + ", Date=" + date + "]";
    }
}`
  },
  {
    name: 'FinanceManager.java',
    path: 'com/finance/FinanceManager.java',
    description: 'Business logic controller containing in-memory ArrayList<Transaction>, calculations, category aggregations, search, delete, and validation.',
    badge: 'Business Logic / Collections',
    oopHighlights: [
      'Separation of Concerns: business rules are isolated from console presentation',
      'Dynamic in-memory storage using ArrayList<Transaction>',
      'Category expense summaries using LinkedHashMap<String, Double>',
      'CRUD Operations: Create (Income/Expense), Read (View/Search/Balance), Delete',
      'Input validation guards with try-catch preventing Scanner crashes on bad input'
    ],
    code: `package com.finance;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

/**
 * FinanceManager contains the core business logic of the application.
 * Manages an in-memory ArrayList of Transaction objects and handles
 * CRUD operations, financial calculations, categorization, and input validation.
 */
public class FinanceManager {
    private ArrayList<Transaction> transactions;
    private int nextId;

    /**
     * Default constructor initializing in-memory storage and auto-increment ID counter.
     */
    public FinanceManager() {
        this.transactions = new ArrayList<>();
        this.nextId = 1;
    }

    /**
     * Requirement 4.1: Add Income
     * Prompts for category, description, and positive amount.
     * Generates unique ID, type "Income", and current LocalDate.
     */
    public void addIncome(Scanner scanner) {
        System.out.println("\\n--- Add Income ---");
        String category = readNonEmptyString(scanner, "Enter category: ");
        String description = readNonEmptyString(scanner, "Enter description: ");
        double amount = readPositiveDouble(scanner, "Enter amount: ");

        Transaction income = new Transaction(nextId, "Income", category, description, amount, LocalDate.now());
        transactions.add(income);

        System.out.println("\\nIncome added successfully!");
        System.out.println("Transaction ID: " + nextId);
        nextId++;
    }

    /**
     * Requirement 4.2: Add Expense
     * Prompts for category, description, and positive amount.
     * Generates unique ID, type "Expense", and current LocalDate.
     */
    public void addExpense(Scanner scanner) {
        System.out.println("\\n--- Add Expense ---");
        String category = readNonEmptyString(scanner, "Enter category: ");
        String description = readNonEmptyString(scanner, "Enter description: ");
        double amount = readPositiveDouble(scanner, "Enter amount: ");

        Transaction expense = new Transaction(nextId, "Expense", category, description, amount, LocalDate.now());
        transactions.add(expense);

        System.out.println("\\nExpense added successfully!");
        System.out.println("Transaction ID: " + nextId);
        nextId++;
    }

    /**
     * Requirement 4.3: View All Transactions
     * Loops through ArrayList and displays each transaction using its display() method.
     */
    public void viewTransactions() {
        System.out.println("\\n========== ALL TRANSACTIONS ==========");
        if (transactions.isEmpty()) {
            System.out.println("No transactions found.");
            return;
        }

        for (int i = 0; i < transactions.size(); i++) {
            transactions.get(i).display();
            if (i < transactions.size() - 1) {
                System.out.println("\\n---------------------------------------\\n");
            }
        }
    }

    /**
     * Requirement 4.4: View Balance
     * Calculates: Balance = Total Income - Total Expense
     */
    public void viewBalance() {
        double totalIncome = 0.0;
        double totalExpense = 0.0;

        for (Transaction t : transactions) {
            if ("Income".equalsIgnoreCase(t.getType())) {
                totalIncome += t.getAmount();
            } else if ("Expense".equalsIgnoreCase(t.getType())) {
                totalExpense += t.getAmount();
            }
        }

        double currentBalance = totalIncome - totalExpense;

        System.out.println("\\n========== BALANCE ==========");
        System.out.println("\\nTotal Income  : Rs." + String.format("%.1f", totalIncome));
        System.out.println("Total Expense : Rs." + String.format("%.1f", totalExpense));
        System.out.println("----------------------------");
        System.out.println("Current Balance: Rs." + String.format("%.1f", currentBalance));
    }

    /**
     * Requirement 4.5: Expense Summary
     * Groups expenses by category using a Map (LinkedHashMap)
     * and displays total expense per category.
     */
    public void showExpenseSummary() {
        System.out.println("\\n========== EXPENSE SUMMARY ==========\\n");

        Map<String, Double> categoryTotals = new LinkedHashMap<>();

        boolean hasExpenses = false;
        for (Transaction t : transactions) {
            if ("Expense".equalsIgnoreCase(t.getType())) {
                hasExpenses = true;
                String cat = t.getCategory();
                categoryTotals.put(cat, categoryTotals.getOrDefault(cat, 0.0) + t.getAmount());
            }
        }

        if (!hasExpenses) {
            System.out.println("No expense transactions recorded yet.");
            return;
        }

        for (Map.Entry<String, Double> entry : categoryTotals.entrySet()) {
            System.out.printf("%-14s: Rs.%.1f%n", entry.getKey(), entry.getValue());
        }
    }

    /**
     * Requirement 4.6: Search Transaction
     * Searches transactions by unique ID.
     */
    public void searchTransaction(Scanner scanner) {
        int searchId = readPositiveInt(scanner, "Enter Transaction ID: ");
        Transaction found = findById(searchId);

        if (found != null) {
            System.out.println();
            found.display();
        } else {
            System.out.println("\\nTransaction not found.");
        }
    }

    /**
     * Requirement 4.7: Delete Transaction
     * Deletes a transaction by ID.
     */
    public void deleteTransaction(Scanner scanner) {
        int deleteId = readPositiveInt(scanner, "Enter Transaction ID: ");
        Transaction found = findById(deleteId);

        if (found != null) {
            transactions.remove(found);
            System.out.println("\\nTransaction deleted successfully!");
        } else {
            System.out.println("\\nTransaction not found.");
        }
    }

    /**
     * Helper method to locate a transaction by ID.
     */
    private Transaction findById(int id) {
        for (Transaction t : transactions) {
            if (t.getId() == id) {
                return t;
            }
        }
        return null;
    }

    // ==========================================
    // Robust Input Validation & Exception Handling
    // ==========================================

    private double readPositiveDouble(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine().trim();
            try {
                double val = Double.parseDouble(input);
                if (val <= 0) {
                    System.out.println("Invalid amount. Please enter a positive value.");
                    continue;
                }
                return val;
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid numeric amount.");
            }
        }
    }

    private int readPositiveInt(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine().trim();
            try {
                int val = Integer.parseInt(input);
                return val;
            } catch (NumberFormatException e) {
                System.out.println("Invalid ID. Please enter an integer number.");
            }
        }
    }

    private String readNonEmptyString(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine().trim();
            if (input.isEmpty()) {
                System.out.println("Field cannot be empty. Please enter a value.");
                continue;
            }
            return input;
        }
    }

    public ArrayList<Transaction> getTransactions() {
        return transactions;
    }
}`
  },
  {
    name: 'Main.java',
    path: 'com/finance/Main.java',
    description: 'Application entry point containing the console menu, Scanner loop, and switch control structure.',
    badge: 'Entry Point / UI Loop',
    oopHighlights: [
      'Infinite execution prevention using structured do-while loop (choice != 8)',
      'Clean switch statement dispatching commands to FinanceManager methods',
      'Robust choice parsing wrapped in try-catch to prevent invalid number crashes',
      'scanner.nextLine() clearing prevents common Java Scanner newline skips'
    ],
    code: `package com.finance;

import java.util.Scanner;

/**
 * Main class for Personal Finance Management System.
 * Serves as the console application entry point:
 * - Initializes FinanceManager.
 * - Renders the main console menu continuously using a do-while loop.
 * - Dispatches user operations through a switch statement.
 * - Gracefully handles user input parsing and exceptions.
 */
public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        FinanceManager manager = new FinanceManager();

        int choice = 0;

        do {
            displayMenu();
            System.out.print("Enter your choice: ");
            String input = scanner.nextLine().trim();

            try {
                choice = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                System.out.println("\\nInvalid choice. Please enter a valid number (1-8).\\n");
                continue;
            }

            switch (choice) {
                case 1:
                    manager.addIncome(scanner);
                    break;

                case 2:
                    manager.addExpense(scanner);
                    break;

                case 3:
                    manager.viewTransactions();
                    break;

                case 4:
                    manager.viewBalance();
                    break;

                case 5:
                    manager.showExpenseSummary();
                    break;

                case 6:
                    manager.searchTransaction(scanner);
                    break;

                case 7:
                    manager.deleteTransaction(scanner);
                    break;

                case 8:
                    System.out.println("\\nThank you for using Personal Finance Management System. Goodbye!");
                    break;

                default:
                    System.out.println("\\nInvalid choice. Please select an option between 1 and 8.");
            }

            if (choice != 8) {
                System.out.println("\\nPress Enter to return to the menu...");
                scanner.nextLine();
            }

        } while (choice != 8);

        scanner.close();
    }

    /**
     * Displays the standard console interface menu.
     */
    private static void displayMenu() {
        System.out.println("\\n========================================");
        System.out.println("       PERSONAL FINANCE MANAGEMENT");
        System.out.println("========================================");
        System.out.println("1. Add Income");
        System.out.println("2. Add Expense");
        System.out.println("3. View Transactions");
        System.out.println("4. View Balance");
        System.out.println("5. Expense Summary");
        System.out.println("6. Search Transaction");
        System.out.println("7. Delete Transaction");
        System.out.println("8. Exit");
        System.out.println("========================================");
    }
}`
  }
];

export const UPGRADE_MODULES = [
  {
    level: 'Level 2',
    title: 'Advanced OOP & Enums',
    summary: 'Replace raw string literals with type-safe Enums and Polymorphic inheritance (IncomeTransaction vs ExpenseTransaction subclasses).',
    codeSnippet: `public enum TransactionType {
    INCOME, EXPENSE
}

public enum ExpenseCategory {
    FOOD, TRAVEL, SHOPPING, BILLS, EDUCATION, ENTERTAINMENT, OTHER
}

// Polymorphic abstract base class
public abstract class AbstractTransaction {
    protected int id;
    protected double amount;
    protected LocalDate date;
    public abstract String getSummary();
}`
  },
  {
    level: 'Level 3',
    title: 'File Persistence (transactions.csv / txt)',
    summary: 'Auto-load saved transactions on startup and auto-save on shutdown so financial data survives across program restarts.',
    codeSnippet: `// FilePersistenceService.java
import java.io.*;
import java.util.ArrayList;

public class FilePersistenceService {
    private static final String FILE_PATH = "transactions.csv";

    public static void save(ArrayList<Transaction> list) throws IOException {
        try (PrintWriter pw = new PrintWriter(new FileWriter(FILE_PATH))) {
            for (Transaction t : list) {
                pw.println(t.getId() + "," + t.getType() + "," + t.getCategory() +
                           "," + t.getDescription() + "," + t.getAmount() + "," + t.getDate());
            }
        }
    }
}`
  },
  {
    level: 'Level 4',
    title: 'Database with JDBC & MySQL',
    summary: 'Migrate in-memory collections to a persistent relational SQL database table using PreparedStatements.',
    codeSnippet: `CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(10) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL
);

// JDBC DAO insert snippet
String sql = "INSERT INTO transactions (type, category, description, amount, date) VALUES (?, ?, ?, ?, ?)";
try (PreparedStatement stmt = conn.prepareStatement(sql)) {
    stmt.setString(1, transaction.getType());
    stmt.setString(2, transaction.getCategory());
    stmt.setString(3, transaction.getDescription());
    stmt.setDouble(4, transaction.getAmount());
    stmt.setDate(5, java.sql.Date.valueOf(transaction.getDate()));
    stmt.executeUpdate();
}`
  },
  {
    level: 'Level 6',
    title: 'Monthly Budget & Threshold Warning',
    summary: 'Set a monthly expense ceiling and receive automated threshold alerts when expenses exceed 80% or 100% of budget.',
    codeSnippet: `public class BudgetManager {
    private double monthlyBudget;

    public void checkBudget(double currentExpenses) {
        double remaining = monthlyBudget - currentExpenses;
        System.out.println("Monthly Budget   : Rs." + monthlyBudget);
        System.out.println("Current Expenses : Rs." + currentExpenses);
        System.out.println("Remaining Budget : Rs." + remaining);
        
        if (currentExpenses > monthlyBudget) {
            System.out.println("⚠️  WARNING: You have exceeded your monthly budget!");
        } else if (currentExpenses >= (monthlyBudget * 0.8)) {
            System.out.println("⚡ Caution: You have utilized over 80% of your monthly budget.");
        }
    }
}`
  }
];
