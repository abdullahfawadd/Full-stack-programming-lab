let registeredCourses = new Set(['Mathematics', 'Physics', 'Data Structures']);

function renderCourses() {
  const courseList = document.getElementById('courseList');
  courseList.innerHTML = '';

  for (const course of registeredCourses) {
    const li = document.createElement('li');
    li.textContent = course;
    courseList.appendChild(li);
  }

  const courseStat = document.getElementById('courseStat');
  courseStat.textContent = `Total unique courses: ${registeredCourses.size}`;
}

document.getElementById('registerBtn').addEventListener('click', () => {
  const input = document.getElementById('courseInput');
  const courseMsg = document.getElementById('courseMsg');
  const value = input.value.trim();

  if (!value) {
    courseMsg.textContent = 'Please enter a course name.';
    courseMsg.className = 'msg-error';
    return;
  }

  if (registeredCourses.has(value)) {
    courseMsg.textContent = 'Course already registered.';
    courseMsg.className = 'msg-error';
    return;
  }

  registeredCourses.add(value);
  courseMsg.textContent = '';
  courseMsg.className = '';
  input.value = '';
  renderCourses();
});

renderCourses();
