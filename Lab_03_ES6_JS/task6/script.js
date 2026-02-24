class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

let studentsMap = new Map();
let coursesSet = new Set();

function renderStudents() {
  const tbody = document.querySelector('#studentTable tbody');
  tbody.innerHTML = '';

  for (const [id, student] of studentsMap) {
    tbody.innerHTML += `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
      </tr>
    `;
  }
}

function renderCourses() {
  const courseList = document.getElementById('courseList');
  courseList.innerHTML = '';

  for (const course of coursesSet) {
    const li = document.createElement('li');
    li.textContent = course;
    courseList.appendChild(li);
  }
}

document.getElementById('addStudentBtn').addEventListener('click', () => {
  const idInput = document.getElementById('studentId');
  const nameInput = document.getElementById('studentName');
  const studentMsg = document.getElementById('studentMsg');
  const id = idInput.value.trim();
  const name = nameInput.value.trim();

  if (!id || !name) {
    studentMsg.textContent = 'Please fill in both fields.';
    studentMsg.className = 'msg-error';
    return;
  }

  if (studentsMap.has(id)) {
    studentMsg.textContent = 'Student ID already exists.';
    studentMsg.className = 'msg-error';
    return;
  }

  const student = new Student(id, name);
  studentsMap.set(id, student);
  studentMsg.textContent = '';
  studentMsg.className = '';
  idInput.value = '';
  nameInput.value = '';
  renderStudents();
});

document.getElementById('registerCourseBtn').addEventListener('click', () => {
  const courseInput = document.getElementById('courseInput');
  const courseMsg = document.getElementById('courseMsg');
  const value = courseInput.value.trim();

  if (!value) {
    courseMsg.textContent = 'Please enter a course name.';
    courseMsg.className = 'msg-error';
    return;
  }

  if (coursesSet.has(value)) {
    courseMsg.textContent = 'Already registered.';
    courseMsg.className = 'msg-error';
    return;
  }

  coursesSet.add(value);
  courseMsg.textContent = '';
  courseMsg.className = '';
  courseInput.value = '';
  renderCourses();
});

function saveData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data saved successfully.');
    }, 1500);
  });
}

document.getElementById('saveBtn').addEventListener('click', () => {
  const saveBtn = document.getElementById('saveBtn');
  const saveStatus = document.getElementById('saveStatus');

  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  saveData()
    .then(msg => {
      saveStatus.innerHTML = `<div class="alert-success">${msg}</div>`;
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save All Data';
    })
    .catch(() => {
      saveStatus.innerHTML = '<div class="alert-error">Failed to save data.</div>';
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save All Data';
    });

  setTimeout(() => {
    saveStatus.innerHTML = '';
  }, 4500);
});

renderStudents();
renderCourses();
