package com.finance;

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
        System.out.println("\n--- Add Income ---");
        String category = readNonEmptyString(scanner, "Enter category: ");
        String description = readNonEmptyString(scanner, "Enter description: ");
        double amount = readPositiveDouble(scanner, "Enter amount: ");

        Transaction income = new Transaction(nextId, "Income", category, description, amount, LocalDate.now());
        transactions.add(income);

        System.out.println("\nIncome added successfully!");
        System.out.println("Transaction ID: " + nextId);
        nextId++;
    }

    /**
     * Requirement 4.2: Add Expense
     * Prompts for category, description, and positive amount.
     * Generates unique ID, type "Expense", and current LocalDate.
     */
    public void addExpense(Scanner scanner) {
        System.out.println("\n--- Add Expense ---");
        String category = readNonEmptyString(scanner, "Enter category: ");
        String description = readNonEmptyString(scanner, "Enter description: ");
        double amount = readPositiveDouble(scanner, "Enter amount: ");

        Transaction expense = new Transaction(nextId, "Expense", category, description, amount, LocalDate.now());
        transactions.add(expense);

        System.out.println("\nExpense added successfully!");
        System.out.println("Transaction ID: " + nextId);
        nextId++;
    }

    /**
     * Requirement 4.3: View All Transactions
     * Loops through ArrayList and displays each transaction using its display() method.
     */
    public void viewTransactions() {
        System.out.println("\n========== ALL TRANSACTIONS ==========");
        if (transactions.isEmpty()) {
            System.out.println("No transactions found.");
            return;
        }

        for (int i = 0; i < transactions.size(); i++) {
            transactions.get(i).display();
            if (i < transactions.size() - 1) {
                System.out.println("\n---------------------------------------\n");
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

        System.out.println("\n========== BALANCE ==========");
        System.out.println("\nTotal Income  : Rs." + String.format("%.1f", totalIncome));
        System.out.println("Total Expense : Rs." + String.format("%.1f", totalExpense));
        System.out.println("----------------------------");
        System.out.println("Current Balance: Rs." + String.format("%.1f", currentBalance));
    }

    /**
     * Requirement 4.5: Expense Summary
     * Groups expenses by category using a Map (HashMap/LinkedHashMap)
     * and displays total expense per category.
     */
    public void showExpenseSummary() {
        System.out.println("\n========== EXPENSE SUMMARY ==========\n");

        // Use LinkedHashMap to preserve order for clean display
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
            // Right-padded category name formatting for neat tabular alignment
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
            System.out.println("\nTransaction not found.");
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
            System.out.println("\nTransaction deleted successfully!");
        } else {
            System.out.println("\nTransaction not found.");
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

    /**
     * Validates and reads a positive non-zero double amount.
     */
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

    /**
     * Validates and reads an integer ID.
     */
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

    /**
     * Validates and reads a non-empty string.
     */
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

    // Getter for tests or inspections
    public ArrayList<Transaction> getTransactions() {
        return transactions;
    }
}
