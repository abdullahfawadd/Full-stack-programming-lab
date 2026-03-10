import './CourseItem.css'

function CourseItem({ courseName, instructor, duration, type }) {
  const isOnline = type === 'Online'

  return (
    <div className="course-item">
      <div className="course-item-header">
        <h3 className="course-name">{courseName}</h3>
        {type && (
          <span className={`course-type ${isOnline ? 'type-online' : 'type-offline'}`}>
            {type}
          </span>
        )}
      </div>
      <div className="course-meta">
        <div className="course-meta-item">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 0112 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{instructor}</span>
        </div>
        <div className="course-meta-item">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M8 4.5V8l2.5 1.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  )
}

export default CourseItem
