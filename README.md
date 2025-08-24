# 💳 IB Bank

IB Bank is a **simple banking simulation** built using **HTML, CSS, and JavaScript**, as part of a learning project on **Atomic Design principles**, **method rehydration**, and **state persistence** using **localStorage**—all under the constraint of using **vanilla technologies only**.

---

## ✅ Project Overview

- **Login system** using **mobile number** and **PIN**.
- **Static account creation** (no backend, accounts are initialized internally).
- Users can:
  - View their **current balance**
  - **Deposit** money
  - **Withdraw** money
  - **Transfer** money to another account
  - **Redeem** a bonus coupon - which can be used just once.

---

## ✅ Features

### **Core Banking Operations**
- **Create Account** (happens internally via a blueprint)
- **Login** with mobile & PIN
- **Deposit** funds
- **Withdraw** funds
- **Transfer** funds between accounts
- **Coupon Bonus**: Apply a coupon for extra credit (only once)

---

### **Bank Model**
- Encapsulated inside a single `Bank` object.
- Handles:
  - Account creation
  - Login validation
  - Money transfers
  - Fetching user info (PIN excluded for security)
- Internal **database simulation** via `BankDatabase` object.

---

### **User Account Structure**
Each account is represented as an object with:
- **Properties**
  - `id` – Unique account ID
  - `name` – Account holder's name
  - `mobile` – Registered mobile number
  - `pin` – 4-digit security PIN
  - `balance` – Current balance
- **Methods**
  - `deposit(amount, type, pin)` – Add money
  - `withdraw(amount, type, pin)` – Withdraw money

**Methods are reattached dynamically during initialization**, ensuring they remain functional even after restoring from `localStorage`.

---

## ✅ Data Persistence

- All account data is stored in `localStorage` under the key **`database`**.
- On page load:
  - Data is fetched from localStorage.
  - Accounts are **rehydrated** with methods by calling `Bank.createAccount()` for each record.
- This approach allows:
  - **Persistence of user data**
  - **Preservation of methods** without using classes or frameworks.

---

## ✅ Bonus System

- Enter coupon code `2025` to receive **100 units** bonus.
- Coupon can only be used **once per session**.

---

## ✅ Default Accounts (for demo)

| ID   | Name   | Mobile      | PIN   | Initial Balance |
|------|--------|------------|-------|-----------------|
| 101  | Alice  | 1234567890 | 1234  | 5000           |
| 102  | Bob    | 9876543210 | 5678  | 3000           |

> You can log in using these credentials on the **login page**.

---

 

---

## ✅ How It Works

1. **Login Page**  
   - User enters mobile & PIN.
   - `Bank.login()` checks credentials.
   - On success: user data is stored in `localStorage` under `user`.

2. **Main Dashboard**  
   - Displays balance and user info.
   - Allows:
     - **Deposit** (with PIN check)
     - **Withdraw** (with PIN check)
     - **Transfer** to another user
     - **Coupon bonus redemption**
   - Updates `localStorage` after every operation.

3. **Persistence**  
   - On reload, user and bank data are restored from `localStorage`.
   - Accounts are rebuilt using `Bank.createAccount()` to reattach methods.

---

## ✅ Tech Stack

- **HTML** – Structure
- **CSS** – Basic styling
- **JavaScript (ES6)** – Logic & state management
- **localStorage** – Data persistence

---

## ✅ Screenshots

(Add screenshots here after running the project)

---

## ✅ Future Improvements

- Add **dynamic account creation form**
- Implement **transaction history**
- Use **encryption** for sensitive data in `localStorage`
- Better **UI/UX** styling

---

## ✅ License

This project is open-source and available under the [MIT License](LICENSE).

---

### 💡 *This project is designed for learning purposes and should not be used for real banking systems.*
