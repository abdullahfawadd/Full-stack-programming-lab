/**
 * ============================================================================
 * Task 2: Interactive Calculator – Application Logic
 * Lab 02 - JS Interactivity
 * Full-Stack Programming Lab
 *
 * Author : Abdullah Fawad
 * Date   : 2026-02-17
 *
 * Description:
 *   - Reads two numeric inputs and an operation from a dropdown.
 *   - Uses a dedicated function to perform the calculation.
 *   - Validates inputs with conditional statements (empty fields,
 *     non-numeric values, and division by zero).
 *   - Dynamically displays the result in the DOM.
 *   - BONUS: Changes the background colour of the result box based on
 *     whether the result is positive, negative, or zero.
 *   - Extra: Displays the expression string and keeps a calculation history.
 * ============================================================================
 */

"use strict";

/* ── Operation Symbols Map ───────────────────────────────────────────────── */

const OP_SYMBOLS = {
  add:      "+",
  subtract: "\u2212",  // −
  multiply: "\u00D7",  // ×
  divide:   "\u00F7",  // ÷
};

/* ── DOM References ──────────────────────────────────────────────────────── */

const numberAInput    = document.getElementById("numberA");
const numberBInput    = document.getElementById("numberB");
const operationSel    = document.getElementById("operation");
const btnCalculate    = document.getElementById("btnCalculate");
const btnClear        = document.getElementById("btnClear");
const resultBox       = document.getElementById("resultBox");
const resultExpr      = document.getElementById("resultExpression");
const resultValue     = document.getElementById("resultValue");
const errorBox        = document.getElementById("errorBox");
const errorMessage    = document.getElementById("errorMessage");
const historySection  = document.getElementById("historySection");
const historyList     = document.getElementById("historyList");
const btnClearHistory = document.getElementById("btnClearHistory");

/* ── Calculation Function ────────────────────────────────────────────────── */

/**
 * Performs the specified arithmetic operation on two numbers.
 *
 * @param {number} a         - The first operand.
 * @param {number} b         - The second operand.
 * @param {string} operation - One of: "add", "subtract", "multiply", "divide".
 * @returns {number}           The computed result.
 * @throws {Error}             If the operation is unrecognised or division by zero.
 */
function calculate(a, b, operation) {
  switch (operation) {
    case "add":
      return a + b;

    case "subtract":
      return a - b;

    case "multiply":
      return a * b;

    case "divide":
      if (b === 0) {
        throw new Error("Division by zero is not allowed.");
      }
      return a / b;

    default:
      throw new Error("Unrecognised operation.");
  }
}

/* ── Input Validation ────────────────────────────────────────────────────── */

/**
 * Validates the current user inputs and returns either an error message
 * string or null if everything is valid.
 *
 * @param {string} rawA      - Raw value from the first input field.
 * @param {string} rawB      - Raw value from the second input field.
 * @param {string} operation - The selected operation value.
 * @returns {string|null}      Error message, or null if valid.
 */
function validateInputs(rawA, rawB, operation) {
  if (rawA.trim() === "" || rawB.trim() === "") {
    return "Please enter values for both numbers.";
  }

  if (isNaN(Number(rawA)) || isNaN(Number(rawB))) {
    return "Both inputs must be valid numbers.";
  }

  if (!operation) {
    return "Please select an operation.";
  }

  return null;
}

/* ── Format Number ───────────────────────────────────────────────────────── */

/**
 * Formats a number for display — integers stay as-is,
 * floats are trimmed to max 8 decimal places.
 * @param {number} value
 * @returns {string}
 */
function formatNumber(value) {
  return Number.isInteger(value)
    ? String(value)
    : String(parseFloat(value.toFixed(8)));
}

/* ── Display Helpers ─────────────────────────────────────────────────────── */

/**
 * Shows the result box with the computed value and applies a colour class
 * depending on whether the result is positive, negative, or zero.
 *
 * @param {number} a         - First operand.
 * @param {number} b         - Second operand.
 * @param {string} operation - The operation key.
 * @param {number} value     - The computed result.
 */
function showResult(a, b, operation, value) {
  errorBox.classList.add("hidden");
  clearInputErrors();

  const displayValue = formatNumber(value);
  const symbol       = OP_SYMBOLS[operation] || "?";
  const expression   = `${formatNumber(a)} ${symbol} ${formatNumber(b)}`;

  resultExpr.textContent  = expression;
  resultValue.textContent = displayValue;

  resultBox.classList.remove("positive", "negative", "zero", "hidden");

  if (value > 0) {
    resultBox.classList.add("positive");
  } else if (value < 0) {
    resultBox.classList.add("negative");
  } else {
    resultBox.classList.add("zero");
  }

  // Add to history
  addHistoryEntry(expression, displayValue);
}

/**
 * Displays an error message in the error box.
 * @param {string} message
 */
function showError(message) {
  resultBox.classList.add("hidden");
  errorMessage.textContent = message;
  errorBox.classList.remove("hidden");

  // Mark empty/invalid fields
  if (numberAInput.value.trim() === "" || isNaN(Number(numberAInput.value))) {
    numberAInput.classList.add("input-error");
  }
  if (numberBInput.value.trim() === "" || isNaN(Number(numberBInput.value))) {
    numberBInput.classList.add("input-error");
  }
}

/**
 * Clears inline error state from inputs.
 */
function clearInputErrors() {
  numberAInput.classList.remove("input-error");
  numberBInput.classList.remove("input-error");
}

/* ── History ─────────────────────────────────────────────────────────────── */

/**
 * Adds a calculation entry to the history list.
 * @param {string} expression - e.g. "10 + 5"
 * @param {string} result     - e.g. "15"
 */
function addHistoryEntry(expression, result) {
  historySection.classList.remove("hidden");

  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li);

  // Keep max 10 entries
  while (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

/**
 * Clears all inputs, results, and errors — restoring initial state.
 */
function clearAll() {
  numberAInput.value             = "";
  numberBInput.value             = "";
  operationSel.selectedIndex     = 0;

  resultBox.classList.add("hidden");
  resultBox.classList.remove("positive", "negative", "zero");
  resultValue.textContent  = "";
  resultExpr.textContent   = "";

  errorBox.classList.add("hidden");
  errorMessage.textContent = "";

  clearInputErrors();
  numberAInput.focus();
}

/* ── Event: Calculate ────────────────────────────────────────────────────── */

btnCalculate.addEventListener("click", () => {
  const rawA      = numberAInput.value;
  const rawB      = numberBInput.value;
  const operation = operationSel.value;

  const validationError = validateInputs(rawA, rawB, operation);
  if (validationError) {
    showError(validationError);
    return;
  }

  const a = parseFloat(rawA);
  const b = parseFloat(rawB);

  try {
    const result = calculate(a, b, operation);
    showResult(a, b, operation, result);
  } catch (error) {
    showError(error.message);
  }
});

/* ── Event: Clear ────────────────────────────────────────────────────────── */

btnClear.addEventListener("click", clearAll);

/* ── Event: Clear History ────────────────────────────────────────────────── */

btnClearHistory.addEventListener("click", () => {
  historyList.innerHTML = "";
  historySection.classList.add("hidden");
});

/* ── Keyboard Support: Enter key triggers calculation ────────────────────── */

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    btnCalculate.click();
  }
});
