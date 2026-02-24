class Student {
  constructor(id, name, semester, courses) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.courses = courses;
  }
}

const student1 = new Student(1, 'Ali Ahmed', 5, ['Web Development', 'Database Systems', 'Operating Systems']);
const student2 = new Student(2, 'Sara Khan', 3, ['Data Structures', 'OOP', 'Linear Algebra']);
const student3 = new Student(3, 'Usman Tariq', 7, ['Machine Learning', 'Cloud Computing', 'Software Engineering']);

const students = [student1, student2, student3];

function renderStudents(students) {
  const tbody = document.querySelector('#studentTable tbody');
  tbody.innerHTML = students.map(student => `
    <tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.semester}</td>
      <td>${student.courses.join(', ')}</td>
    </tr>
  `).join('');
}

renderStudents(students);
