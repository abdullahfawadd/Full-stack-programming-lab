const student1 = { name: 'Ali Ahmed', age: 21, semester: 5, courses: ['Web Development', 'Database Systems', 'Operating Systems'] };
const student2 = { name: 'Sara Khan', age: 20, semester: 3, courses: ['Data Structures', 'OOP', 'Linear Algebra'] };
const student3 = { name: 'Usman Tariq', age: 23, semester: 7, courses: ['Machine Learning', 'Cloud Computing', 'Software Engineering'] };

const json1 = JSON.stringify(student1);
const json2 = JSON.stringify(student2);
const json3 = JSON.stringify(student3);

const parsed1 = JSON.parse(json1);
const parsed2 = JSON.parse(json2);
const parsed3 = JSON.parse(json3);

const allStudents = [parsed1, parsed2, parsed3];

const studentGrid = document.getElementById('studentGrid');

allStudents.forEach(student => {
  const { name, age, semester, courses } = student;

  const card = document.createElement('div');
  card.className = 'student-card';
  card.innerHTML = `
    <h3 class="student-card-name">${name}</h3>
    <div class="student-card-row">
      <span class="student-card-key">Age</span>
      <span class="student-card-value">${age}</span>
    </div>
    <div class="student-card-row">
      <span class="student-card-key">Semester</span>
      <span class="student-card-value">${semester}</span>
    </div>
    <div class="student-card-row">
      <span class="student-card-key">Courses</span>
      <span class="student-card-value">${courses.join(', ')}</span>
    </div>
  `;
  studentGrid.appendChild(card);
});

const jsonOutput = document.getElementById('jsonOutput');
jsonOutput.textContent = JSON.stringify(allStudents, null, 2);
