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
 *   - Live progress bar tracks how many questions have been answered.
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

const TOTAL_QUESTIONS = 5;

/* ── DOM References ──────────────────────────────────────────────────────── */

const quizForm        = document.getElementById("quizForm");
const btnReset        = document.getElementById("btnReset");
const resultsSection  = document.getElementById("resultsSection");
const scoreHeading    = document.getElementById("scoreHeading");
const feedbackMessage = document.getElementById("feedbackMessage");
const answerDetails   = document.getElementById("answerDetails");
const progressFill    = document.getElementById("progressFill");
const progressText    = document.getElementById("progressText");
const scoreCircle     = document.getElementById("scoreCircle");
const scoreNumber     = document.getElementById("scoreNumber");
const scorePct        = document.getElementById("scorePct");
const btnSubmit       = document.getElementById("btnSubmit");

/* ── Disable Submit Until All Answered ───────────────────────────────────── */

btnSubmit.disabled = true;

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

/* ── Live Progress Tracking ──────────────────────────────────────────────── */

/**
 * Updates the progress bar and text based on how many questions
 * the user has answered so far.
 */
function updateProgress() {
  let answered = 0;
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    if (getSelectedAnswer(`q${i}`)) {
      answered++;
    }
  }
  const pct = (answered / TOTAL_QUESTIONS) * 100;
  progressFill.style.width = pct + "%";
  progressText.textContent = `${answered} of ${TOTAL_QUESTIONS} answered`;

  // Enable submit only when all questions are answered
  btnSubmit.disabled = (answered < TOTAL_QUESTIONS);
}

// Attach change listeners to all radio buttons for live progress
document.querySelectorAll('#quizForm input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", updateProgress);
});

/* ── Individual Answer-Check Functions ───────────────────────────────────── */

/** @returns {boolean} */
function checkAnswer1() { return getSelectedAnswer("q1") === answer1; }

/** @returns {boolean} */
function checkAnswer2() { return getSelectedAnswer("q2") === answer2; }

/** @returns {boolean} */
function checkAnswer3() { return getSelectedAnswer("q3") === answer3; }

/** @returns {boolean} */
function checkAnswer4() { return getSelectedAnswer("q4") === answer4; }

/** @returns {boolean} */
function checkAnswer5() { return getSelectedAnswer("q5") === answer5; }

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
    return "Perfect score — outstanding work!";
  } else if (percentage >= 80) {
    return "Excellent! You really know your stuff.";
  } else if (percentage >= 60) {
    return "Good job! A little more practice and you'll ace it.";
  } else if (percentage >= 40) {
    return "Not bad, but there's room for improvement.";
  } else {
    return "Keep studying — you'll get there!";
  }
}

/* ── Display Results (DOM Manipulation) ──────────────────────────────────── */

/**
 * Renders the quiz results into the results section of the page.
 * @param {{ score: number, total: number, details: Array }} result
 */
function displayResults(result) {
  const { score, total, details } = result;
  const percentage = (score / total) * 100;

  // Score circle
  scoreNumber.textContent = score;
  scorePct.textContent = Math.round(percentage) + "%";
  scoreCircle.classList.remove("excellent", "poor");
  if (percentage >= 60) {
    scoreCircle.classList.add("excellent");
  } else {
    scoreCircle.classList.add("poor");
  }

  // Heading & feedback
  scoreHeading.textContent =
    score === total ? "All Correct!" :
    score === 0     ? "No Correct Answers" :
                      `${score} out of ${total} Correct`;

  feedbackMessage.textContent = getFeedbackMessage(score, total);

  // Per-question detail list
  answerDetails.innerHTML = "";
  details.forEach(({ qNum, question, correct }) => {
    const li = document.createElement("li");
    li.className = correct ? "correct-item" : "incorrect-item";
    const icon = correct ? "&#10003;" : "&#10007;";
    li.innerHTML = `<strong>Q${qNum}:</strong> ${question} &mdash; ${icon} ${correct ? "Correct" : "Incorrect"}`;
    answerDetails.appendChild(li);
  });

  // Highlight cards & show badges
  details.forEach(({ qNum, correct }) => {
    const card  = document.getElementById(`card-q${qNum}`);
    const badge = document.getElementById(`badge-q${qNum}`);

    card.classList.remove("correct", "incorrect");
    card.classList.add(correct ? "correct" : "incorrect");

    badge.textContent = correct ? "Correct" : "Incorrect";
    badge.className   = "question-badge " + (correct ? "badge-correct" : "badge-incorrect");
  });

  // Show section
  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Event: Submit Quiz ──────────────────────────────────────────────────── */

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Ensure all questions are answered
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    if (!getSelectedAnswer(`q${i}`)) {
      const card = document.getElementById(`card-q${i}`);
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.style.outline = "2px solid var(--color-error)";
      setTimeout(() => { card.style.outline = ""; }, 1500);
      return;
    }
  }

  const result = calculateScore();
  displayResults(result);
});

/* ── Event: Reset Quiz ───────────────────────────────────────────────────── */

btnReset.addEventListener("click", () => {
  quizForm.reset();
  resultsSection.classList.add("hidden");

  // Reset cards & badges
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    const card  = document.getElementById(`card-q${i}`);
    const badge = document.getElementById(`badge-q${i}`);
    card.classList.remove("correct", "incorrect");
    badge.className = "question-badge";
    badge.textContent = "";
  }

  // Reset progress
  progressFill.style.width = "0%";
  progressText.textContent = `0 of ${TOTAL_QUESTIONS} answered`;

  // Reset score circle
  scoreCircle.classList.remove("excellent", "poor");
  scoreNumber.textContent = "0";
  scorePct.textContent = "";

  // Disable submit again
  btnSubmit.disabled = true;

  window.scrollTo({ top: 0, behavior: "smooth" });
});
