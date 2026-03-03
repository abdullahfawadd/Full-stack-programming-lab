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
├── task2-interactive-calculator/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── task3-todo-list/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── task4-color-box-generator/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── task5-form-validation/
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

## ✅ Task 3 — Simple To-Do List

A to-do list interface with 3 fixed task input fields.

### Features

- **3 individual input fields** to add tasks.
- Users can **mark a task as complete** (strike-through) or **remove** it using buttons.
- **DOM manipulation** dynamically updates task status and visibility.
- A **loop** styles all tasks uniformly (strike-through for completed tasks).
- **Reset All** button clears every task and input field.

### How to Run

1. Open `task3-todo-list/index.html` in any modern browser.
2. Type a task in any field and click **Add**.
3. Use ✓ to complete or ✕ to remove tasks.

---

## 🎨 Task 4 — Color Box Generator

A colour generator tool with 3 separate input fields for CSS colours.

### Features

- **3 colour input fields** — enter any valid CSS colour (hex, named, rgb, hsl).
- Clicking **Add** creates a coloured `<div>` box displayed in a grid.
- Dedicated **functions** handle each colour input and DOM manipulation.
- **Clear All Boxes** button removes every generated box.
- **Bonus:** Displays **window width/height** and **browser info** using BOM objects (`window.innerWidth`, `window.innerHeight`, `navigator.userAgent`).

### How to Run

1. Open `task4-color-box-generator/index.html` in any modern browser.
2. Type a colour value (e.g. `#3b82f6`, `tomato`, `rgb(16,185,129)`) and click **Add**.
3. Click **Clear All Boxes** to reset.

---

## 📝 Task 5 — Form Validation

A registration form with name, email, age, and password fields — all validated individually.

### Features

- **Individual validation functions** for each field using conditional statements:
  - Name should not be empty.
  - Email must contain `@`.
  - Age must be between 18–60.
  - Password minimum length 6.
- **Error messages** displayed dynamically using DOM manipulation.
- On successful validation, a **success message** is shown and **`confirm()`** is used to confirm submission.
- **Bonus:** `alert()` for confirmation feedback and `prompt()` for additional post-submission interaction.

### How to Run

1. Open `task5-form-validation/index.html` in any modern browser.
2. Fill in all four fields and click **Register**.
3. Fix any errors shown, then confirm the submission dialog.

---

## 🛠 Technologies Used

- HTML5
- CSS3 (Flexbox, Gradients, Animations)
- Vanilla JavaScript (ES6+)

---

> © 2026 Abdullah Fawad — Full-Stack Programming Lab
