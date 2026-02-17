/**
 * ============================================================================
 * Task 4: Color Box Generator – Application Logic
 * Lab 02 - JS Interactivity | Full-Stack Programming Lab
 *
 * Author : Abdullah Fawad
 * Date   : 2026-02-17
 *
 * Description:
 *   - 3 separate colour input fields, each with an Add button.
 *   - Functions handle each colour input and use DOM manipulation to
 *     display a coloured div box.
 *   - Clear All button removes every generated box.
 *   - Bonus: Displays window width/height and browser info using BOM objects.
 * ============================================================================
 */

"use strict";

/* ── DOM References ──────────────────────────────────────────────────────── */

const colorInput1 = document.getElementById("colorInput1");
const colorInput2 = document.getElementById("colorInput2");
const colorInput3 = document.getElementById("colorInput3");
const boxGrid     = document.getElementById("boxGrid");
const boxCount    = document.getElementById("boxCount");
const emptyState  = document.getElementById("emptyState");
const btnClearAll = document.getElementById("btnClearAll");
const infoSize    = document.getElementById("infoSize");
const infoBrowser = document.getElementById("infoBrowser");

/* ── Box Storage ─────────────────────────────────────────────────────────── */

let boxes = []; // { color: string }

/* ── BONUS: BOM – Window Size & Browser Info ─────────────────────────────── */

/**
 * Reads window.innerWidth, window.innerHeight and navigator.userAgent
 * to display environment information using BOM objects.
 */
function updateBomInfo() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  infoSize.textContent = "Window: " + w + " × " + h + " px";

  const ua = navigator.userAgent;
  let browser = "Unknown";

  if (ua.indexOf("Edg") > -1) {
    browser = "Edge";
  } else if (ua.indexOf("Chrome") > -1) {
    browser = "Chrome";
  } else if (ua.indexOf("Firefox") > -1) {
    browser = "Firefox";
  } else if (ua.indexOf("Safari") > -1) {
    browser = "Safari";
  }

  infoBrowser.textContent = "Browser: " + browser;
}

// Update on load and on resize
updateBomInfo();
window.addEventListener("resize", updateBomInfo);

/* ── Add Colour Box Function ─────────────────────────────────────────────── */

/**
 * Reads the colour value from the given input, validates it,
 * creates a coloured box, and appends it to the grid.
 * @param {HTMLInputElement} inputEl - The colour input element.
 */
function addColorBox(inputEl) {
  const colorValue = inputEl.value.trim();

  if (colorValue === "") {
    inputEl.focus();
    inputEl.style.borderColor = "var(--color-error)";
    setTimeout(function () { inputEl.style.borderColor = ""; }, 1200);
    return;
  }

  // Validate the colour by trying to apply it to a temporary element
  if (!isValidColor(colorValue)) {
    inputEl.focus();
    inputEl.style.borderColor = "var(--color-error)";
    setTimeout(function () { inputEl.style.borderColor = ""; }, 1200);
    return;
  }

  boxes.push({ color: colorValue });
  inputEl.value = "";

  renderBoxes();
}

/* ── Colour Validation ───────────────────────────────────────────────────── */

/**
 * Checks whether a string is a valid CSS colour by assigning it
 * to a temporary element's style and reading back.
 * @param {string} color
 * @returns {boolean}
 */
function isValidColor(color) {
  const temp = document.createElement("div");
  temp.style.color = "";
  temp.style.color = color;
  return temp.style.color !== "";
}

/* ── Render Boxes (DOM Manipulation) ─────────────────────────────────────── */

/**
 * Clears the grid and re-renders all colour boxes from the array.
 */
function renderBoxes() {
  boxGrid.innerHTML = "";

  if (boxes.length === 0) {
    emptyState.classList.remove("hidden");
    btnClearAll.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    btnClearAll.classList.remove("hidden");
  }

  boxCount.textContent = boxes.length + (boxes.length === 1 ? " box" : " boxes");

  for (let i = 0; i < boxes.length; i++) {
    createBoxElement(boxes[i].color);
  }
}

/**
 * Creates a single colour box DOM element and appends it to the grid.
 * @param {string} color - A valid CSS colour string.
 */
function createBoxElement(color) {
  const box = document.createElement("div");
  box.className = "color-box";
  box.style.backgroundColor = color;

  const label = document.createElement("span");
  label.className = "color-box-label";
  label.textContent = color;

  box.appendChild(label);
  boxGrid.appendChild(box);
}

/* ── Clear All Boxes ─────────────────────────────────────────────────────── */

/**
 * Removes all generated colour boxes and resets the array.
 */
function clearAllBoxes() {
  boxes = [];
  renderBoxes();
}

/* ── Event Listeners ─────────────────────────────────────────────────────── */

// Add buttons
document.querySelectorAll(".btn-add").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const num = btn.getAttribute("data-color");
    const inputEl = document.getElementById("colorInput" + num);
    addColorBox(inputEl);
  });
});

// Enter key support
const colorInputs = [colorInput1, colorInput2, colorInput3];
for (let i = 0; i < colorInputs.length; i++) {
  colorInputs[i].addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addColorBox(colorInputs[i]);
    }
  });
}

// Clear All
btnClearAll.addEventListener("click", clearAllBoxes);

// Initial render
renderBoxes();
