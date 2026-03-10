import { Link } from 'react-router-dom'
import './Dashboard.css'

const tasks = [
  {
    id: 1,
    title: 'Student Information Card App',
    description: 'Practice creating components and props by rendering student information cards with dynamic data.',
    path: '/task1',
    tag: 'Components & Props',
  },
  {
    id: 2,
    title: 'Course List App',
    description: 'Render dynamic lists using props by mapping an array of courses to reusable components.',
    path: '/task2',
    tag: 'Lists & Mapping',
  },
  {
    id: 3,
    title: 'Dynamic Greeting App',
    description: 'Use props with conditional rendering to display context-aware greetings based on time of day.',
    path: '/task3',
    tag: 'Conditional Rendering',
  },
]

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-badge">Lab 05</div>
          <h1 className="header-title">React Fundamentals</h1>
          <p className="header-subtitle">
            Full Stack Programming Lab — React Components, Props, and Rendering
          </p>
          <div className="header-meta">
            <span className="meta-item">M Abdullah Fawad</span>
            <span className="meta-divider"></span>
            <span className="meta-item">232052</span>
            <span className="meta-divider"></span>
            <span className="meta-item">Air University, Islamabad</span>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="tasks-section">
          <h2 className="section-title">Lab Tasks</h2>
          <div className="tasks-grid">
            {tasks.map((task, index) => (
              <Link
                to={task.path}
                key={task.id}
                className={`task-card fade-in-up stagger-${index + 1}`}
              >
                <div className="task-card-header">
                  <span className="task-number">Task {task.id}</span>
                  <span className="task-tag">{task.tag}</span>
                </div>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-action">
                  <span>View Task</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>Full Stack Programming Lab &mdash; Air University, Islamabad</p>
      </footer>
    </div>
  )
}

export default Dashboard
