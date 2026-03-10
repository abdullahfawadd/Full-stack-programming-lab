import PageLayout from '../components/PageLayout'
import CourseItem from '../components/CourseItem'
import './CourseListApp.css'

const courses = [
  {
    courseName: 'Web Development Fundamentals',
    instructor: 'Dr. Amjad Khan',
    duration: '16 Weeks',
    type: 'Offline',
  },
  {
    courseName: 'Data Structures & Algorithms',
    instructor: 'Prof. Nadia Iqbal',
    duration: '18 Weeks',
    type: 'Offline',
  },
  {
    courseName: 'Machine Learning Foundations',
    instructor: 'Dr. Farhan Aslam',
    duration: '12 Weeks',
    type: 'Online',
  },
  {
    courseName: 'Database Management Systems',
    instructor: 'Dr. Hina Durrani',
    duration: '16 Weeks',
    type: 'Offline',
  },
  {
    courseName: 'Cloud Computing Essentials',
    instructor: 'Engr. Bilal Saeed',
    duration: '10 Weeks',
    type: 'Online',
  },
]

function CourseListApp() {
  return (
    <PageLayout title="Course List App" taskNumber={2}>
      <p className="task-intro">
        An array of courses mapped to reusable <code>CourseItem</code> components.
        Each item displays instructor, duration, and course type (Online / Offline).
      </p>
      <div className="course-grid">
        {courses.map((course, index) => (
          <div key={course.courseName} className={`fade-in-up stagger-${index + 1}`}>
            <CourseItem
              courseName={course.courseName}
              instructor={course.instructor}
              duration={course.duration}
              type={course.type}
            />
          </div>
        ))}
      </div>
    </PageLayout>
  )
}

export default CourseListApp
