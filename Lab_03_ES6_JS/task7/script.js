/* ── Task 7: Student Data with JSON — Production JS ── */

// ── Step 1: Create 3 student objects ──
const student1 = { name: 'Abdullah Fawad', age: 22, semester: 6, courses: ['Full-Stack Development', 'AI & ML', 'DevOps'] };
const student2 = { name: 'Sara Khan', age: 20, semester: 3, courses: ['Data Structures', 'OOP', 'Linear Algebra'] };
const student3 = { name: 'Usman Tariq', age: 23, semester: 7, courses: ['Machine Learning', 'Cloud Computing', 'Software Engineering'] };

// ── Step 2: Convert to JSON (JSON.stringify) ──
const json1 = JSON.stringify(student1);
const json2 = JSON.stringify(student2);
const json3 = JSON.stringify(student3);

console.log('Stringified JSON:', json1, json2, json3);

// ── Step 3: Parse back (JSON.parse) ──
const parsed1 = JSON.parse(json1);
const parsed2 = JSON.parse(json2);
const parsed3 = JSON.parse(json3);

const allStudents = [parsed1, parsed2, parsed3];

// ── Step 4: Destructuring ──
const gradientClasses = ['', 'g2', 'g3'];

// ── DOM ──
const studentGrid = document.getElementById('studentGrid');
const totalStudentsEl = document.getElementById('totalStudents');
const totalCoursesEl = document.getElementById('totalCourses');
const avgAgeEl = document.getElementById('avgAge');
const jsonSizeEl = document.getElementById('jsonSize');
const recordBadge = document.getElementById('recordBadge');

// ── Step 5 & 6: Display using innerHTML with forEach/map ──
function renderStudents() {
  totalStudentsEl.textContent = allStudents.length;
  const allCourses = allStudents.flatMap(s => s.courses);
  totalCoursesEl.textContent = new Set(allCourses).size;
  avgAgeEl.textContent = (allStudents.reduce((a, s) => a + s.age, 0) / allStudents.length).toFixed(1);
  const fullJson = JSON.stringify(allStudents);
  jsonSizeEl.textContent = new Blob([fullJson]).size;
  recordBadge.textContent = `${allStudents.length} records`;

  // Use map + destructuring + template literals
  studentGrid.innerHTML = allStudents.map((student, index) => {
    const { name, age, semester, courses } = student; // Destructuring
    return `
      <div class="student-card animate-in" style="animation-delay:${index * .08}s">
        <div class="student-card-header ${gradientClasses[index] || ''}">
          <div class="student-card-avatar">${name.charAt(0)}</div>
          <div class="student-card-name">${name}</div>
          <div class="student-card-age">${age} years old</div>
        </div>
        <div class="student-card-body">
          <div class="student-card-row">
            <span class="student-card-key">Semester</span>
            <span class="student-card-val">${semester}</span>
          </div>
          <div class="student-card-row">
            <span class="student-card-key">Courses</span>
            <div class="student-card-val">
              <div class="course-chips">
                ${courses.map(c => `<span class="course-chip">${c}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="student-card-row">
            <span class="student-card-key">JSON Size</span>
            <span class="student-card-val">${new Blob([JSON.stringify(student)]).size} bytes</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── JSON Views ──
function syntaxHighlight(json) {
  return json.replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        return `<span class="json-key">${match}</span>`;
      }
      return `<span class="json-string">${match}</span>`;
    }
    return `<span class="json-number">${match}</span>`;
  });
}

function renderJSON() {
  const prettyJson = JSON.stringify(allStudents, null, 2);
  const rawJson = JSON.stringify(allStudents);

  document.getElementById('jsonPretty').innerHTML = syntaxHighlight(prettyJson);
  document.getElementById('jsonRaw').textContent = rawJson;

  // Parsed log showing the destructuring process
  let parsedLog = '// ── JSON.stringify() → JSON.parse() → Destructuring ──\n\n';
  allStudents.forEach((student, i) => {
    const { name, age, semester, courses } = student;
    parsedLog += `// Student ${i + 1}\n`;
    parsedLog += `const json${i + 1} = JSON.stringify(student${i + 1});\n`;
    parsedLog += `// → "${JSON.stringify(student)}"\n\n`;
    parsedLog += `const parsed${i + 1} = JSON.parse(json${i + 1});\n`;
    parsedLog += `const { name, age, semester, courses } = parsed${i + 1};\n`;
    parsedLog += `// name = "${name}"\n`;
    parsedLog += `// age = ${age}\n`;
    parsedLog += `// semester = ${semester}\n`;
    parsedLog += `// courses = [${courses.map(c => `"${c}"`).join(', ')}]\n\n`;
    parsedLog += `${'─'.repeat(50)}\n\n`;
  });
  document.getElementById('jsonParsed').textContent = parsedLog;
}

// ── Tab switching ──
document.querySelector('.json-tabs').addEventListener('click', e => {
  const tab = e.target.closest('.json-tab');
  if (!tab) return;

  document.querySelectorAll('.json-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');

  document.querySelectorAll('.json-output').forEach(o => o.style.display = 'none');
  const targetId = tab.dataset.tab;
  document.getElementById(`json${targetId.charAt(0).toUpperCase() + targetId.slice(1)}`).style.display = 'block';
});

// ── Toggle JSON section ──
let jsonVisible = true;
document.getElementById('toggleViewBtn').addEventListener('click', () => {
  jsonVisible = !jsonVisible;
  document.getElementById('jsonSection').style.display = jsonVisible ? 'block' : 'none';
});

// ── Copy JSON ──
document.getElementById('copyBtn').addEventListener('click', () => {
  const json = JSON.stringify(allStudents, null, 2);
  navigator.clipboard.writeText(json).then(() => showToast('JSON copied to clipboard'));
});

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Init ──
renderStudents();
renderJSON();
