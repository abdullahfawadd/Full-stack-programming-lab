/**
 * ============================================================================
 * Task 5: Form Validation – Application Logic
 * Lab 02 - JS Interactivity | Full-Stack Programming Lab
 *
 * Author : Abdullah Fawad
 * Date   : 2026-02-17
 *
 * Description:
 *   - Registration form with name, email, age, and password fields.
 *   - Each input is validated individually using dedicated functions
 *     and conditional statements.
 *   - Error messages are displayed dynamically using DOM manipulation.
 *   - On successful validation, a success message is shown and
 *     confirm() is used to confirm submission.
 *   - Bonus: alert() and prompt() for additional interaction.
 * ============================================================================
 */

"use strict";

/* ── DOM References ──────────────────────────────────────────────────────── */

const regForm        = document.getElementById("regForm");
const nameInput      = document.getElementById("nameInput");
const emailInput     = document.getElementById("emailInput");
const ageInput       = document.getElementById("ageInput");
const passwordInput  = document.getElementById("passwordInput");
const nameError      = document.getElementById("nameError");
const emailError     = document.getElementById("emailError");
const ageError       = document.getElementById("ageError");
const passwordError  = document.getElementById("passwordError");
const successBox     = document.getElementById("successBox");
const successMessage = document.getElementById("successMessage");

/* ── Validation Functions ────────────────────────────────────────────────── */

/**
 * Validates the Name field.
 * Name should not be empty.
 * @param {string} value
 * @returns {string|null} Error message or null if valid.
 */
function validateName(value) {
  if (value.trim() === "") {
    return "Name is required.";
  }
  if (value.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  return null;
}

/**
 * Validates the Email field.
 * Email must contain @.
 * @param {string} value
 * @returns {string|null}
 */
function validateEmail(value) {
  if (value.trim() === "") {
    return "Email is required.";
  }
  if (value.indexOf("@") === -1) {
    return "Email must contain an @ symbol.";
  }
  return null;
}

/**
 * Validates the Age field.
 * Age must be between 18 and 60.
 * @param {string} value
 * @returns {string|null}
 */
function validateAge(value) {
  if (value.trim() === "") {
    return "Age is required.";
  }
  const age = Number(value);
  if (isNaN(age) || !Number.isInteger(age)) {
    return "Age must be a whole number.";
  }
  if (age < 18 || age > 60) {
    return "Age must be between 18 and 60.";
  }
  return null;
}

/**
 * Validates the Password field.
 * Password minimum length 6.
 * @param {string} value
 * @returns {string|null}
 */
function validatePassword(value) {
  if (value === "") {
    return "Password is required.";
  }
  if (value.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null;
}

/* ── Display Helpers ─────────────────────────────────────────────────────── */

/**
 * Shows an error message for a field and marks the input as invalid.
 * @param {HTMLInputElement} inputEl
 * @param {HTMLElement} errorEl
 * @param {string} message
 */
function showFieldError(inputEl, errorEl, message) {
  inputEl.classList.add("input-error");
  inputEl.classList.remove("input-success");
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

/**
 * Clears the error state for a field and marks it as valid.
 * @param {HTMLInputElement} inputEl
 * @param {HTMLElement} errorEl
 */
function clearFieldError(inputEl, errorEl) {
  inputEl.classList.remove("input-error");
  inputEl.classList.add("input-success");
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
}

/**
 * Resets a field to its neutral state (no error, no success).
 * @param {HTMLInputElement} inputEl
 * @param {HTMLElement} errorEl
 */
function resetField(inputEl, errorEl) {
  inputEl.classList.remove("input-error", "input-success");
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
}

/* ── Form Submission ─────────────────────────────────────────────────────── */

regForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Hide previous success
  successBox.classList.add("hidden");

  let isValid = true;

  // Validate Name
  const nameErr = validateName(nameInput.value);
  if (nameErr) {
    showFieldError(nameInput, nameError, nameErr);
    isValid = false;
  } else {
    clearFieldError(nameInput, nameError);
  }

  // Validate Email
  const emailErr = validateEmail(emailInput.value);
  if (emailErr) {
    showFieldError(emailInput, emailError, emailErr);
    isValid = false;
  } else {
    clearFieldError(emailInput, emailError);
  }

  // Validate Age
  const ageErr = validateAge(ageInput.value);
  if (ageErr) {
    showFieldError(ageInput, ageError, ageErr);
    isValid = false;
  } else {
    clearFieldError(ageInput, ageError);
  }

  // Validate Password
  const passErr = validatePassword(passwordInput.value);
  if (passErr) {
    showFieldError(passwordInput, passwordError, passErr);
    isValid = false;
  } else {
    clearFieldError(passwordInput, passwordError);
  }

  // If any field invalid, scroll to first error
  if (!isValid) {
    const firstError = document.querySelector(".input-error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  // All valid — show success message
  const userName = nameInput.value.trim();
  successMessage.textContent =
    "Registration successful! Welcome, " + userName + ".";
  successBox.classList.remove("hidden");

  // Confirm submission using confirm()
  const confirmed = confirm(
    "Your registration details:\n\n" +
    "Name: " + nameInput.value.trim() + "\n" +
    "Email: " + emailInput.value.trim() + "\n" +
    "Age: " + ageInput.value.trim() + "\n\n" +
    "Do you want to confirm this submission?"
  );

  if (confirmed) {
    // Bonus: alert after confirmation
    alert("Thank you, " + userName + "! Your registration has been submitted.");

    // Bonus: prompt for additional interaction
    const feedback = prompt(
      "One more thing — how did you hear about us? (Optional)"
    );

    if (feedback && feedback.trim() !== "") {
      alert("Thanks for your feedback: \"" + feedback.trim() + "\"");
    }

    // Reset form
    regForm.reset();
    resetField(nameInput, nameError);
    resetField(emailInput, emailError);
    resetField(ageInput, ageError);
    resetField(passwordInput, passwordError);
    successBox.classList.add("hidden");
  } else {
    // User cancelled — keep form filled
    successBox.classList.add("hidden");
  }
});

/* ── Reset Button ────────────────────────────────────────────────────────── */

regForm.addEventListener("reset", function () {
  // Small delay so the browser resets values first
  setTimeout(function () {
    resetField(nameInput, nameError);
    resetField(emailInput, emailError);
    resetField(ageInput, ageError);
    resetField(passwordInput, passwordError);
    successBox.classList.add("hidden");
  }, 0);
});
