package com.finance;

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
                System.out.println("\nInvalid choice. Please enter a valid number (1-8).\n");
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
                    System.out.println("\nThank you for using Personal Finance Management System. Goodbye!");
                    break;

                default:
                    System.out.println("\nInvalid choice. Please select an option between 1 and 8.");
            }

            if (choice != 8) {
                System.out.println("\nPress Enter to return to the menu...");
                scanner.nextLine();
            }

        } while (choice != 8);

        scanner.close();
    }

    /**
     * Displays the standard console interface menu.
     */
    private static void displayMenu() {
        System.out.println("\n========================================");
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
}
