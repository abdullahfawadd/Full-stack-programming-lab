/* ── Task 6: Mini University Portal — Production JS ── */
/* Combines: ES6 Class, Map, Set, Promise */

// ── Student Class ──
class Student {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date().toLocaleString();
  }
}

// ── State (Map for students, Set for courses) ──
const studentsMap = new Map();
const coursesSet = new Set();

// ── DOM ──
const studentForm = document.getElementById('studentForm');
const studentIdInput = document.getElementById('studentId');
const studentNameInput = document.getElementById('studentName');
const studentEmailInput = document.getElementById('studentEmail');
const studentList = document.getElementById('studentList');
const studentEmpty = document.getElementById('studentEmpty');
const studentBadge = document.getElementById('studentBadge');

const courseForm = document.getElementById('courseForm');
const courseInput = document.getElementById('courseInput');
const courseList = document.getElementById('courseList');
const courseEmpty = document.getElementById('courseEmpty');
const courseBadge = document.getElementById('courseBadge');

const totalStudentsEl = document.getElementById('totalStudents');
const totalCoursesEl = document.getElementById('totalCourses');
const saveStatusEl = document.getElementById('saveStatus');

// ── Render Students ──
function renderStudents() {
  const count = studentsMap.size;
  totalStudentsEl.textContent = count;
  studentBadge.textContent = count;

  if (count === 0) {
    studentList.innerHTML = '';
    studentEmpty.style.display = 'block';
    return;
  }
  studentEmpty.style.display = 'none';

  studentList.innerHTML = '';
  for (const [id, student] of studentsMap) {
    studentList.innerHTML += `
      <div class="list-item">
        <div class="list-avatar student">${student.name.charAt(0)}</div>
        <div class="list-info">
          <div class="list-name">${student.name}</div>
          <div class="list-meta">${student.id} · ${student.email}</div>
        </div>
        <button class="remove-btn" data-type="student" data-id="${id}" title="Remove">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;
  }
}

// ── Render Courses ──
function renderCourses() {
  const count = coursesSet.size;
  totalCoursesEl.textContent = count;
  courseBadge.textContent = count;

  if (count === 0) {
    courseList.innerHTML = '';
    courseEmpty.style.display = 'block';
    return;
  }
  courseEmpty.style.display = 'none';

  courseList.innerHTML = '';
  for (const course of coursesSet) {
    courseList.innerHTML += `
      <div class="list-item">
        <div class="list-avatar course">📚</div>
        <div class="list-info">
          <div class="list-name">${course}</div>
        </div>
        <button class="remove-btn" data-type="course" data-name="${course}" title="Remove">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;
  }
}

// ── Add Student ──
studentForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = studentIdInput.value.trim();
  const name = studentNameInput.value.trim();
  const email = studentEmailInput.value.trim();

  if (!id || !name || !email) return;

  if (studentsMap.has(id)) {
    showToast('Student ID already exists');
    return;
  }

  const student = new Student(id, name, email);
  studentsMap.set(id, student);
  studentForm.reset();
  renderStudents();
  markUnsaved();
  showToast(`${name} added successfully`);
});

// ── Register Course ──
courseForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = courseInput.value.trim();
  if (!name) return;

  if (coursesSet.has(name)) {
    showToast('Course already registered');
    return;
  }

  coursesSet.add(name);
  courseForm.reset();
  renderCourses();
  markUnsaved();
  showToast(`"${name}" registered`);
});

// ── Remove (delegation) ──
document.addEventListener('click', e => {
  const btn = e.target.closest('.remove-btn');
  if (!btn) return;

  if (btn.dataset.type === 'student') {
    const id = btn.dataset.id;
    const name = studentsMap.get(id)?.name || '';
    studentsMap.delete(id);
    renderStudents();
    markUnsaved();
    showToast(`${name} removed`);
  }

  if (btn.dataset.type === 'course') {
    const name = btn.dataset.name;
    coursesSet.delete(name);
    renderCourses();
    markUnsaved();
    showToast(`"${name}" removed`);
  }
});

// ── Save Data (Promise simulation) ──
function saveData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional failure (10% chance)
      if (Math.random() < 0.1) {
        reject(new Error('Server timeout — please try again.'));
      } else {
        resolve({
          students: studentsMap.size,
          courses: coursesSet.size,
          timestamp: new Date().toLocaleString(),
        });
      }
    }, 1800);
  });
}

document.getElementById('saveBtn').addEventListener('click', async () => {
  const overlay = document.getElementById('saveOverlay');
  const saveBtn = document.getElementById('saveBtn');
  overlay.classList.add('active');
  saveBtn.disabled = true;

  try {
    const result = await saveData();
    overlay.classList.remove('active');
    saveBtn.disabled = false;
    saveStatusEl.textContent = 'Saved ✓';
    saveStatusEl.style.color = 'var(--success)';
    showToast(`Saved ${result.students} students & ${result.courses} courses`);
  } catch (err) {
    overlay.classList.remove('active');
    saveBtn.disabled = false;
    saveStatusEl.textContent = 'Failed ✗';
    saveStatusEl.style.color = 'var(--danger)';
    showToast(err.message);
  }
});

function markUnsaved() {
  saveStatusEl.textContent = 'Unsaved';
  saveStatusEl.style.color = 'var(--text-secondary)';
}

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Init with some data ──
const defaultStudents = [
  new Student('STU001', 'Abdullah Fawad', 'abdullahfawad.dev@gmail.com'),
  new Student('STU002', 'Ali Ahmed', 'ali@university.edu'),
  new Student('STU003', 'Sara Khan', 'sara@university.edu'),
];
defaultStudents.forEach(s => studentsMap.set(s.id, s));

['Web Development', 'Data Structures', 'Machine Learning', 'Operating Systems'].forEach(c => coursesSet.add(c));

renderStudents();
renderCourses();
