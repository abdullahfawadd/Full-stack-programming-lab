# Lab 02 – JS Interactivity

**Author:** Abdullah Fawad  
**Course:** Full-Stack Programming Lab  
**Date:** February 17, 2026

---

## 📂 Folder Structure

```
Lab_02-JS-Interactivity/
├── README.md
├── task1-dynamic-quiz/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── task2-interactive-calculator/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🧩 Task 1 — Dynamic Quiz

A dynamic, interactive quiz with **5 multiple-choice questions** covering web development fundamentals.

### Features

- Questions and answers stored in **separate variables**.
- Dedicated **functions** to check each answer individually.
- Total score **calculated** and displayed dynamically via **DOM manipulation**.
- **Conditional feedback messages** based on score (Excellent → Keep Studying).
- **Reset Quiz** button to clear all inputs, highlights, and results.
- Per-question visual feedback (green ✅ / red ❌ card borders).

### How to Run

1. Open `task1-dynamic-quiz/index.html` in any modern browser.
2. Answer all 5 questions and click **Submit Quiz**.
3. Click **Reset Quiz** to start over.

---

## 🧮 Task 2 — Interactive Calculator

A clean, professional calculator supporting the four basic arithmetic operations.

### Features

- **Input fields** for two numbers and a **dropdown** to select the operation.
- A dedicated `calculate()` **function** performs the arithmetic.
- **Input validation** with conditional statements:
  - Empty fields → warning message.
  - Non-numeric values → warning message.
  - Division by zero → blocked with error message.
- Result displayed **dynamically** in the DOM.
- **Bonus:** Result box background colour changes:
  - 🟢 **Green** for positive results.
  - 🔴 **Red** for negative results.
  - 🟡 **Yellow** for zero.
- **Keyboard support** — press Enter to calculate.

### How to Run

1. Open `task2-interactive-calculator/index.html` in any modern browser.
2. Enter two numbers, select an operation, and click **Calculate**.
3. Click **Clear** to reset.

---

## 🛠 Technologies Used

- HTML5
- CSS3 (Flexbox, Gradients, Animations)
- Vanilla JavaScript (ES6+)

---

> © 2026 Abdullah Fawad — Full-Stack Programming Lab
