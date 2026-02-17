/**
 * ============================================================================
 * Task 3: Simple To-Do List – Application Logic
 * Lab 02 - JS Interactivity | Full-Stack Programming Lab
 *
 * Author : Abdullah Fawad
 * Date   : 2026-02-17
 *
 * Description:
 *   - 3 fixed task input fields, each with an "Add" button.
 *   - Users can mark a task as complete or remove it using buttons.
 *   - DOM manipulation dynamically updates task status and visibility.
 *   - A loop styles all tasks uniformly (strike-through for completed).
 *   - Reset All button clears everything back to initial state.
 * ============================================================================
 */

"use strict";

/* ── DOM References ──────────────────────────────────────────────────────── */

const taskInput1  = document.getElementById("taskInput1");
const taskInput2  = document.getElementById("taskInput2");
const taskInput3  = document.getElementById("taskInput3");
const taskList    = document.getElementById("taskList");
const taskCount   = document.getElementById("taskCount");
const emptyState  = document.getElementById("emptyState");
const btnResetAll = document.getElementById("btnResetAll");

/* ── Task Storage ────────────────────────────────────────────────────────── */

/** Array to hold added tasks: { id, text, completed } */
let tasks = [];
let nextId = 1;

/* ── Add Task Function ───────────────────────────────────────────────────── */

/**
 * Reads the value from the given input field, creates a task,
 * and renders it in the list.
 * @param {HTMLInputElement} inputEl - The input element to read from.
 */
function addTask(inputEl) {
  const text = inputEl.value.trim();

  if (text === "") {
    inputEl.focus();
    inputEl.style.borderColor = "var(--color-error)";
    setTimeout(() => { inputEl.style.borderColor = ""; }, 1200);
    return;
  }

  const task = { id: nextId++, text: text, completed: false };
  tasks.push(task);
  inputEl.value = "";

  renderTasks();
}

/* ── Mark Task Complete ──────────────────────────────────────────────────── */

/**
 * Toggles the completed status of the task with the given ID.
 * @param {number} id
 */
function toggleComplete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }
  }
  renderTasks();
}

/* ── Remove Task ─────────────────────────────────────────────────────────── */

/**
 * Removes the task with the given ID from the array.
 * @param {number} id
 */
function removeTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  renderTasks();
}

/* ── Render Tasks (DOM Manipulation + Loop Styling) ──────────────────────── */

/**
 * Clears the current list, loops through all tasks, creates DOM elements,
 * and applies uniform styling (strike-through for completed tasks).
 */
function renderTasks() {
  // Clear existing DOM
  taskList.innerHTML = "";

  // Toggle empty state vs list visibility
  if (tasks.length === 0) {
    emptyState.classList.remove("hidden");
    btnResetAll.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    btnResetAll.classList.remove("hidden");
  }

  // Update count (with completed count)
  const completedNum = tasks.filter(function (t) { return t.completed; }).length;
  let countText = tasks.length + (tasks.length === 1 ? " task" : " tasks");
  if (completedNum > 0) {
    countText += " · " + completedNum + " done";
  }
  taskCount.textContent = countText;

  // Loop through tasks and create elements
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // List item
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    // Checkbox for completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleComplete(task.id);
    });

    // Task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    // Remove button
    const btnRemove = document.createElement("button");
    btnRemove.className = "btn-icon btn-remove";
    btnRemove.title = "Remove";
    btnRemove.innerHTML = "&#10005;";
    btnRemove.addEventListener("click", function () {
      removeTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnRemove);
    taskList.appendChild(li);
  }

  // Loop to apply consistent styling to ALL task items
  styleAllTasks();
}

/* ── Style All Tasks Uniformly (Loop Requirement) ────────────────────────── */

/**
 * Loops through every .task-item in the DOM and ensures
 * consistent styling — completed tasks get strike-through,
 * others get normal styling.
 */
function styleAllTasks() {
  const items = document.querySelectorAll(".task-item");
  for (let i = 0; i < items.length; i++) {
    const textEl = items[i].querySelector(".task-text");
    if (items[i].classList.contains("completed")) {
      textEl.style.textDecoration = "line-through";
      textEl.style.color = "var(--color-text-secondary)";
    } else {
      textEl.style.textDecoration = "none";
      textEl.style.color = "var(--color-text)";
    }
  }
}

/* ── Reset All ───────────────────────────────────────────────────────────── */

/**
 * Clears all tasks and resets the input fields.
 */
function resetAll() {
  tasks = [];
  nextId = 1;
  taskInput1.value = "";
  taskInput2.value = "";
  taskInput3.value = "";
  renderTasks();
}

/* ── Event Listeners ─────────────────────────────────────────────────────── */

// Add buttons (using data-task attribute)
document.querySelectorAll(".btn-add").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const taskNum = btn.getAttribute("data-task");
    const inputEl = document.getElementById("taskInput" + taskNum);
    addTask(inputEl);
  });
});

// Enter key support on inputs
const inputs = [taskInput1, taskInput2, taskInput3];
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask(inputs[i]);
    }
  });
}

// Reset All button
btnResetAll.addEventListener("click", resetAll);

// Initial render
renderTasks();
