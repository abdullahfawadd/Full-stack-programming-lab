import { Link } from 'react-router-dom'
import './PageLayout.css'

function PageLayout({ title, taskNumber, children }) {
  return (
    <div className="page-layout">
      <nav className="page-nav">
        <Link to="/" className="nav-back">
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8H3M7 4L3 8l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Dashboard</span>
        </Link>
        <span className="nav-task-label">Task {taskNumber}</span>
      </nav>
      <header className="page-header">
        <h1 className="page-title fade-in-up">{title}</h1>
      </header>
      <main className="page-content">{children}</main>
    </div>
  )
}

export default PageLayout
