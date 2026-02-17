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
 * ============================================================================
 */

"use strict";

/* ── DOM References ──────────────────────────────────────────────────────── */

const numberAInput  = document.getElementById("numberA");
const numberBInput  = document.getElementById("numberB");
const operationSel  = document.getElementById("operation");
const btnCalculate  = document.getElementById("btnCalculate");
const btnClear      = document.getElementById("btnClear");
const resultBox     = document.getElementById("resultBox");
const resultValue   = document.getElementById("resultValue");
const errorBox      = document.getElementById("errorBox");
const errorMessage  = document.getElementById("errorMessage");

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
 * string or `null` if everything is valid.
 *
 * @param {string} rawA     - Raw value from the first input field.
 * @param {string} rawB     - Raw value from the second input field.
 * @param {string} operation - The selected operation value.
 * @returns {string|null}     Error message, or null if valid.
 */
function validateInputs(rawA, rawB, operation) {
  if (rawA.trim() === "" || rawB.trim() === "") {
    return "⚠️ Please enter values for both numbers.";
  }

  if (isNaN(Number(rawA)) || isNaN(Number(rawB))) {
    return "⚠️ Both inputs must be valid numbers.";
  }

  if (!operation) {
    return "⚠️ Please select an operation.";
  }

  return null; // all good
}

/* ── Display Helpers ─────────────────────────────────────────────────────── */

/**
 * Shows the result box with the computed value and applies a colour class
 * depending on whether the result is positive, negative, or zero.
 *
 * @param {number} value - The computed result.
 */
function showResult(value) {
  // Hide any previous error
  errorBox.classList.add("hidden");

  // Format result to a reasonable number of decimal places
  const displayValue = Number.isInteger(value)
    ? value
    : parseFloat(value.toFixed(8));

  resultValue.textContent = displayValue;

  // Remove previous colour classes
  resultBox.classList.remove("positive", "negative", "zero", "hidden");

  // Apply conditional colour class (BONUS)
  if (value > 0) {
    resultBox.classList.add("positive");
  } else if (value < 0) {
    resultBox.classList.add("negative");
  } else {
    resultBox.classList.add("zero");
  }
}

/**
 * Displays an error message in the error box.
 *
 * @param {string} message - The error message to display.
 */
function showError(message) {
  // Hide result
  resultBox.classList.add("hidden");

  errorMessage.textContent = message;
  errorBox.classList.remove("hidden");
}

/**
 * Clears all inputs, results, and errors — restoring initial state.
 */
function clearAll() {
  numberAInput.value    = "";
  numberBInput.value    = "";
  operationSel.selectedIndex = 0;

  resultBox.classList.add("hidden");
  resultBox.classList.remove("positive", "negative", "zero");
  resultValue.textContent = "";

  errorBox.classList.add("hidden");
  errorMessage.textContent = "";

  numberAInput.focus();
}

/* ── Event: Calculate ────────────────────────────────────────────────────── */

btnCalculate.addEventListener("click", () => {
  const rawA     = numberAInput.value;
  const rawB     = numberBInput.value;
  const operation = operationSel.value;

  // Validate
  const validationError = validateInputs(rawA, rawB, operation);
  if (validationError) {
    showError(validationError);
    return;
  }

  const a = parseFloat(rawA);
  const b = parseFloat(rawB);

  // Attempt calculation
  try {
    const result = calculate(a, b, operation);
    showResult(result);
  } catch (error) {
    showError(`🚫 ${error.message}`);
  }
});

/* ── Event: Clear ────────────────────────────────────────────────────────── */

btnClear.addEventListener("click", clearAll);

/* ── Keyboard Support: Enter key triggers calculation ────────────────────── */

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    btnCalculate.click();
  }
});
