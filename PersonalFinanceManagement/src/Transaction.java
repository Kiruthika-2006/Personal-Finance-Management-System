package com.finance;

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
}
