import PageLayout from '../components/PageLayout'
import StudentCard from '../components/StudentCard'
import './StudentCardApp.css'

const students = [
  {
    name: 'M Abdullah Fawad',
    rollNo: '232052',
    department: 'Computer Science',
    university: 'Air University, Islamabad',
    color: '#2563eb',
  },
  {
    name: 'Ahmed Hassan',
    rollNo: '232018',
    department: 'Software Engineering',
    university: 'Air University, Islamabad',
    color: '#7c3aed',
  },
  {
    name: 'Sara Malik',
    rollNo: '232076',
    department: 'Data Science',
    university: 'Air University, Islamabad',
    color: '#059669',
  },
]

function StudentCardApp() {
  return (
    <PageLayout title="Student Information Card App" taskNumber={1}>
      <p className="task-intro">
        Reusable <code>StudentCard</code> component rendered with different props.
        Each card receives a unique <code>color</code> prop for its accent.
      </p>
      <div className="student-grid">
        {students.map((student, index) => (
          <div key={student.rollNo} className={`fade-in-up stagger-${index + 1}`}>
            <StudentCard
              name={student.name}
              rollNo={student.rollNo}
              department={student.department}
              university={student.university}
              color={student.color}
            />
          </div>
        ))}
      </div>
    </PageLayout>
  )
}

export default StudentCardApp
