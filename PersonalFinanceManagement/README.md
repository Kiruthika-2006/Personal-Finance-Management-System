# Personal Finance Management System (Java Console Application)

A beginner-friendly, modular, console-based Personal Finance Management System written in Java (JDK 17+) following Object-Oriented Programming (OOP) principles.

---

## Project Structure

```
PersonalFinanceManagement/
├── src/
│   ├── Main.java              # Application entry point, menu loop, input handling
│   ├── FinanceManager.java    # Core business logic, CRUD, calculations, validation
│   └── Transaction.java       # Encapsulated data model representing a transaction
└── README.md                  # Complete documentation and setup manual
```

---

## Key OOP Concepts Demonstrated

1. **Encapsulation**:
   - `Transaction` private attributes (`id`, `type`, `category`, `description`, `amount`, `date`) accessed safely via public getters and setters.
   - `FinanceManager` maintains encapsulated `ArrayList<Transaction>` and auto-increment `nextId`.
2. **Separation of Concerns**:
   - `Main.java` handles presentation and menu flow.
   - `FinanceManager.java` contains all financial computations, aggregation, and operations.
   - `Transaction.java` models a single record.
3. **Data Structures**:
   - Dynamic storage using `ArrayList<Transaction>`.
   - Category expense grouping using `LinkedHashMap<String, Double>`.
4. **Input Validation & Exception Handling**:
   - Custom `readPositiveDouble`, `readPositiveInt`, and `readNonEmptyString` methods.
   - Robust `try-catch` wrappers preventing any crash from invalid input or non-numeric characters.

---

## How to Compile and Run

### 1. Terminal / Command Prompt (JDK 17+)
```bash
# Navigate to project directory
cd PersonalFinanceManagement

# Compile all Java files
javac -d bin src/*.java

# Run the application
java -cp bin com.finance.Main
```

### 2. IntelliJ IDEA
1. Open IntelliJ IDEA → **Open** → Select `PersonalFinanceManagement` folder.
2. Ensure Project SDK is set to **Java 17+** (`File` → `Project Structure` → `SDK`).
3. Mark `src` as Sources Root (Right-click `src` → `Mark Directory as` → `Sources Root`).
4. Right-click `Main.java` → Select **Run 'Main.main()'**.

### 3. Eclipse IDE
1. `File` → `New` → `Java Project`.
2. Name it `PersonalFinanceManagement` and select JavaSE-17 or later.
3. Copy `Main.java`, `FinanceManager.java`, and `Transaction.java` into `src`.
4. Right-click `Main.java` → `Run As` → `Java Application`.

### 4. VS Code
1. Install the **Extension Pack for Java** in VS Code.
2. Open the `PersonalFinanceManagement` folder in VS Code.
3. Open `src/Main.java` and click the **Run** button above the `main` method.

---

## Test Verification Checklist

| Test # | Operation | Input / Action | Expected Result |
|---|---|---|---|
| **Test 1** | Add Income | Salary, "September Salary", 30000 | Income added, ID: 1 generated |
| **Test 2** | Add Expense | Food, "Lunch", 150 | Expense added, ID: 2 generated |
| **Test 3** | View Balance | Option 4 | Income: 30000.0, Expense: 150.0, Balance: 29850.0 |
| **Test 4** | Search Transaction | ID = 2 | Displays lunch expense details |
| **Test 5** | Invalid Search | ID = 999 | "Transaction not found." |
| **Test 6** | Delete Transaction | ID = 2 | "Transaction deleted successfully!" |
| **Test 7** | Invalid Amount | -100 or "abc" | Rejects and re-prompts for positive amount |
| **Test 8** | Empty Transactions | Option 3 initially | "No transactions found." |
