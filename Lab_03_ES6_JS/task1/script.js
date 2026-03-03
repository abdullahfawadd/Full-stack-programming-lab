/* ═══════════════════════════════════════════════════
   Task 1 — Student Management  |  Production JS
   ES6: Classes, let/const, Template Literals
   ═══════════════════════════════════════════════════ */

// ── ES6 Class ──
class Student {
  constructor(id, name, semester, courses) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.courses = courses;
  }

  get initials() {
    return this.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  get info() {
    return `${this.name} — Semester ${this.semester} — ${this.courses.length} course(s)`;
  }
}

// ── State ──
let students = [
  new Student(1, 'Ali Ahmed',      5, ['Web Development', 'Database Systems', 'Operating Systems']),
  new Student(2, 'Sara Khan',      3, ['Data Structures', 'OOP', 'Linear Algebra']),
  new Student(3, 'Usman Tariq',    7, ['Machine Learning', 'Cloud Computing', 'Software Engineering']),
  new Student(4, 'Abdullah Fawad', 6, ['Full-Stack Development', 'AI & ML', 'DevOps']),
];
let nextId = 5;
let editingId = null;
let deletingId = null;

// ── DOM refs ──
const tbody         = document.querySelector('#studentTable tbody');
const emptyState    = document.getElementById('emptyState');
const tableScroll   = document.getElementById('tableScroll');
const countBadge    = document.getElementById('countBadge');
const totalStudents = document.getElementById('totalStudents');
const totalCourses  = document.getElementById('totalCourses');
const avgSemester   = document.getElementById('avgSemester');
const searchInput   = document.getElementById('searchInput');

const modalOverlay  = document.getElementById('modalOverlay');
const modalTitle    = document.getElementById('modalTitle');
const studentForm   = document.getElementById('studentForm');
const nameInput     = document.getElementById('nameInput');
const semesterInput = document.getElementById('semesterInput');
const coursesInput  = document.getElementById('coursesInput');
const submitBtn     = document.getElementById('submitBtn');

const deleteOverlay = document.getElementById('deleteOverlay');
const deleteNameEl  = document.getElementById('deleteName');

// ── Avatar color by id ──
const avatarClass = id => `c${id % 6}`;

// ── Render ──
function renderStudents(filter = '') {
  const q = filter.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.courses.some(c => c.toLowerCase().includes(q))
  );

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tableScroll.style.display = 'none';
    emptyState.style.display = 'flex';
  } else {
    tableScroll.style.display = 'block';
    emptyState.style.display = 'none';

    filtered.forEach(s => {
      const tr = document.createElement('tr');
      // Template literals
      tr.innerHTML = `
        <td>
          <div class="student-cell">
            <div class="avatar ${avatarClass(s.id)}">${s.initials}</div>
            <div>
              <div class="student-name">${s.name}</div>
              <div class="student-id">ID #${s.id}</div>
            </div>
          </div>
        </td>
        <td><span class="sem-badge">Sem ${s.semester}</span></td>
        <td>${s.courses.map(c => `<span class="course-chip">${c}</span>`).join('')}</td>
        <td class="th-actions">
          <div class="actions-cell">
            <button class="icon-btn edit" title="Edit" data-id="${s.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="icon-btn delete" title="Delete" data-id="${s.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  updateStats();
}

function updateStats() {
  totalStudents.textContent = students.length;
  const allCourses = new Set(students.flatMap(s => s.courses));
  totalCourses.textContent = allCourses.size;
  const avg = students.length
    ? (students.reduce((a, s) => a + s.semester, 0) / students.length).toFixed(1)
    : '0';
  avgSemester.textContent = avg;
  countBadge.textContent = `${students.length} record${students.length !== 1 ? 's' : ''}`;
}

// ── Modal ──
function openModal(edit = false, student = null) {
  editingId = edit && student ? student.id : null;
  modalTitle.textContent = edit ? 'Edit Student' : 'Add Student';
  submitBtn.textContent  = edit ? 'Save Changes' : 'Add Student';
  nameInput.value     = student ? student.name : '';
  semesterInput.value = student ? student.semester : '';
  coursesInput.value  = student ? student.courses.join(', ') : '';
  modalOverlay.classList.add('active');
  setTimeout(() => nameInput.focus(), 200);
}
function closeModal() {
  modalOverlay.classList.remove('active');
  editingId = null;
  studentForm.reset();
}

function openDeleteModal(id) {
  deletingId = id;
  const s = students.find(x => x.id === id);
  deleteNameEl.textContent = s ? s.name : '';
  deleteOverlay.classList.add('active');
}
function closeDeleteModal() {
  deleteOverlay.classList.remove('active');
  deletingId = null;
}

// ── Toast ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ── Events ──
document.getElementById('addBtn').addEventListener('click', () => openModal());
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

document.getElementById('deleteClose').addEventListener('click', closeDeleteModal);
document.getElementById('deleteCancelBtn').addEventListener('click', closeDeleteModal);
deleteOverlay.addEventListener('click', e => { if (e.target === deleteOverlay) closeDeleteModal(); });

document.getElementById('deleteConfirmBtn').addEventListener('click', () => {
  students = students.filter(s => s.id !== deletingId);
  closeDeleteModal();
  renderStudents(searchInput.value);
  showToast('Student deleted');
});

studentForm.addEventListener('submit', e => {
  e.preventDefault();
  const name     = nameInput.value.trim();
  const semester = parseInt(semesterInput.value);
  const courses  = coursesInput.value.split(',').map(c => c.trim()).filter(Boolean);
  if (!name || !semester || courses.length === 0) return;

  if (editingId !== null) {
    const s = students.find(x => x.id === editingId);
    if (s) { s.name = name; s.semester = semester; s.courses = courses; }
    showToast('Student updated');
  } else {
    students.push(new Student(nextId++, name, semester, courses));
    showToast('Student added');
  }
  closeModal();
  renderStudents(searchInput.value);
});

// Delegation
tbody.addEventListener('click', e => {
  const editBtn   = e.target.closest('.icon-btn.edit');
  const deleteBtn = e.target.closest('.icon-btn.delete');
  if (editBtn) {
    const s = students.find(x => x.id === parseInt(editBtn.dataset.id));
    if (s) openModal(true, s);
  }
  if (deleteBtn) openDeleteModal(parseInt(deleteBtn.dataset.id));
});

searchInput.addEventListener('input', () => renderStudents(searchInput.value));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeDeleteModal(); }
});

// ── Init ──
renderStudents();
console.log('%c Task 1 — Student Management ', 'background:#0071e3;color:#fff;padding:4px 12px;border-radius:4px;font-weight:600');
