/**
 * ============================================================================
 * Task 1: Dynamic Quiz – Application Logic
 * Lab 02 - JS Interactivity
 * Full-Stack Programming Lab
 *
 * Author : Abdullah Fawad
 * Date   : 2026-02-17
 *
 * Description:
 *   - Stores questions and correct answers in separate variables.
 *   - Uses dedicated functions to check each answer individually.
 *   - Calculates total score and displays results via DOM manipulation.
 *   - Provides conditional feedback messages based on performance.
 *   - Includes a Reset Quiz feature to clear all inputs and results.
 * ============================================================================
 */

"use strict";

/* ── Question & Answer Variables ─────────────────────────────────────────── */

const question1 = "What does HTML stand for?";
const answer1   = "b"; // HyperText Markup Language

const question2 = "Which language is used for styling web pages?";
const answer2   = "c"; // CSS

const question3 = "Inside which HTML element do we put JavaScript?";
const answer3   = "c"; // <script>

const question4 = "Which operator is used for strict equality in JavaScript?";
const answer4   = "b"; // ===

const question5 = "What does console.log() do in JavaScript?";
const answer5   = "b"; // Prints output to the browser console

/* ── DOM References ──────────────────────────────────────────────────────── */

const quizForm        = document.getElementById("quizForm");
const btnSubmit       = document.getElementById("btnSubmit");
const btnReset        = document.getElementById("btnReset");
const resultsSection  = document.getElementById("resultsSection");
const scoreHeading    = document.getElementById("scoreHeading");
const feedbackMessage = document.getElementById("feedbackMessage");
const answerDetails   = document.getElementById("answerDetails");

/* ── Helper: Get Selected Value for a Question ───────────────────────────── */

/**
 * Returns the selected radio-button value for the given question name,
 * or null if nothing was selected.
 * @param {string} name - The `name` attribute of the radio group.
 * @returns {string|null}
 */
function getSelectedAnswer(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : null;
}

/* ── Individual Answer-Check Functions ───────────────────────────────────── */

/**
 * Checks if the user's answer to Question 1 is correct.
 * @returns {boolean}
 */
function checkAnswer1() {
  return getSelectedAnswer("q1") === answer1;
}

/**
 * Checks if the user's answer to Question 2 is correct.
 * @returns {boolean}
 */
function checkAnswer2() {
  return getSelectedAnswer("q2") === answer2;
}

/**
 * Checks if the user's answer to Question 3 is correct.
 * @returns {boolean}
 */
function checkAnswer3() {
  return getSelectedAnswer("q3") === answer3;
}

/**
 * Checks if the user's answer to Question 4 is correct.
 * @returns {boolean}
 */
function checkAnswer4() {
  return getSelectedAnswer("q4") === answer4;
}

/**
 * Checks if the user's answer to Question 5 is correct.
 * @returns {boolean}
 */
function checkAnswer5() {
  return getSelectedAnswer("q5") === answer5;
}

/* ── Score Calculation ───────────────────────────────────────────────────── */

/**
 * Evaluates each question, calculates total score, and returns
 * an array of per-question result objects.
 * @returns {{ score: number, total: number, details: Array<{qNum: number, question: string, correct: boolean}> }}
 */
function calculateScore() {
  const results = [
    { qNum: 1, question: question1, correct: checkAnswer1() },
    { qNum: 2, question: question2, correct: checkAnswer2() },
    { qNum: 3, question: question3, correct: checkAnswer3() },
    { qNum: 4, question: question4, correct: checkAnswer4() },
    { qNum: 5, question: question5, correct: checkAnswer5() },
  ];

  const score = results.filter((r) => r.correct).length;

  return { score, total: results.length, details: results };
}

/* ── Feedback Message (Conditional) ──────────────────────────────────────── */

/**
 * Returns a feedback string based on the user's score.
 * @param {number} score
 * @param {number} total
 * @returns {string}
 */
function getFeedbackMessage(score, total) {
  const percentage = (score / total) * 100;

  if (percentage === 100) {
    return "🎉 Perfect score! Outstanding work!";
  } else if (percentage >= 80) {
    return "👏 Excellent! You really know your stuff!";
  } else if (percentage >= 60) {
    return "😊 Good job! A little more practice and you'll ace it.";
  } else if (percentage >= 40) {
    return "🤔 Not bad, but there's room for improvement.";
  } else {
    return "📚 Keep studying — you'll get there!";
  }
}

/* ── Display Results (DOM Manipulation) ──────────────────────────────────── */

/**
 * Renders the quiz results into the results section of the page.
 * @param {{ score: number, total: number, details: Array }} result
 */
function displayResults(result) {
  const { score, total, details } = result;

  // Update heading & feedback
  scoreHeading.textContent = `Your Score: ${score} / ${total}`;
  feedbackMessage.textContent = getFeedbackMessage(score, total);

  // Build per-question detail list
  answerDetails.innerHTML = "";
  details.forEach(({ qNum, question, correct }) => {
    const li = document.createElement("li");
    li.className = correct ? "correct-item" : "incorrect-item";
    li.textContent = `Q${qNum}: ${question} — ${correct ? "✅ Correct" : "❌ Incorrect"}`;
    answerDetails.appendChild(li);
  });

  // Highlight cards
  details.forEach(({ qNum, correct }) => {
    const card = document.getElementById(`card-q${qNum}`);
    card.classList.remove("correct", "incorrect");
    card.classList.add(correct ? "correct" : "incorrect");
  });

  // Show section
  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Event: Submit Quiz ──────────────────────────────────────────────────── */

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Ensure all questions are answered
  const totalQuestions = 5;
  for (let i = 1; i <= totalQuestions; i++) {
    if (!getSelectedAnswer(`q${i}`)) {
      alert(`⚠️ Please answer Question ${i} before submitting.`);
      return;
    }
  }

  const result = calculateScore();
  displayResults(result);
});

/* ── Event: Reset Quiz ───────────────────────────────────────────────────── */

btnReset.addEventListener("click", () => {
  // Clear all radio selections
  quizForm.reset();

  // Hide results section
  resultsSection.classList.add("hidden");

  // Remove card highlights
  for (let i = 1; i <= 5; i++) {
    const card = document.getElementById(`card-q${i}`);
    card.classList.remove("correct", "incorrect");
  }

  // Scroll back to top
  window.scrollTo({ top: 0, behavior: "smooth" });
});
