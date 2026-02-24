/* ── Task 4: Course Registration System — Production JS ── */

// ── State (using Set for uniqueness) ──
const courseData = new Map(); // name -> { name, category }
const courseSet = new Set();

// Pre-populate
const defaults = [
  { name: 'Mathematics', category: 'Mathematics' },
  { name: 'Physics', category: 'Engineering' },
  { name: 'Data Structures', category: 'Computer Science' },
  { name: 'Web Development', category: 'Computer Science' },
  { name: 'Linear Algebra', category: 'Mathematics' },
];
defaults.forEach(c => { courseSet.add(c.name); courseData.set(c.name, c); });

// ── DOM ──
const courseForm = document.getElementById('courseForm');
const courseInput = document.getElementById('courseInput');
const categorySelect = document.getElementById('categorySelect');
const courseList = document.getElementById('courseList');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const totalCoursesEl = document.getElementById('totalCourses');
const recentActionEl = document.getElementById('recentAction');

const categoryIcons = {
  'Computer Science': { icon: '💻', cls: 'cs' },
  'Mathematics': { icon: '📐', cls: 'math' },
  'Engineering': { icon: '⚙️', cls: 'eng' },
  'Business': { icon: '📊', cls: 'biz' },
  'General': { icon: '📚', cls: 'gen' },
};

// ── Render ──
function renderCourses(filter = '') {
  const entries = [...courseSet]
    .map(name => courseData.get(name))
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.category.toLowerCase().includes(filter.toLowerCase()));

  if (entries.length === 0) {
    courseList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    courseList.innerHTML = entries.map(c => {
      const { icon, cls } = categoryIcons[c.category] || categoryIcons['General'];
      return `
        <div class="course-item">
          <div class="course-icon ${cls}">${icon}</div>
          <div class="course-info">
            <div class="course-name">${c.name}</div>
            <div class="course-category">${c.category}</div>
          </div>
          <button class="remove-btn" data-name="${c.name}" title="Remove course">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      `;
    }).join('');
  }

  totalCoursesEl.textContent = courseSet.size;
}

// ── Register ──
courseForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = courseInput.value.trim();
  const category = categorySelect.value;

  if (!name) return;

  if (courseSet.has(name)) {
    showToast('Course already registered');
    return;
  }

  courseSet.add(name);
  courseData.set(name, { name, category });
  courseInput.value = '';
  recentActionEl.textContent = 'Added';
  recentActionEl.style.color = 'var(--success)';
  renderCourses(searchInput.value);
  showToast(`"${name}" registered successfully`);
});

// ── Remove (delegation) ──
courseList.addEventListener('click', e => {
  const btn = e.target.closest('.remove-btn');
  if (!btn) return;
  const name = btn.dataset.name;
  courseSet.delete(name);
  courseData.delete(name);
  recentActionEl.textContent = 'Removed';
  recentActionEl.style.color = 'var(--danger)';
  renderCourses(searchInput.value);
  showToast(`"${name}" removed`);
});

// ── Search ──
searchInput.addEventListener('input', () => renderCourses(searchInput.value));

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Init ──
renderCourses();
