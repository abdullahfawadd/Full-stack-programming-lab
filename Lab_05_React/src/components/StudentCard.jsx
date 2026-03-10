import './StudentCard.css'

function StudentCard({ name, rollNo, department, university, color }) {
  const cardStyle = color
    ? { borderTop: `3px solid ${color}` }
    : {}

  return (
    <div className="student-card" style={cardStyle}>
      <div
        className="student-avatar"
        style={color ? { background: color } : {}}
      >
        {name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)}
      </div>
      <h3 className="student-name">{name}</h3>
      <div className="student-details">
        <div className="detail-row">
          <span className="detail-label">Roll No</span>
          <span className="detail-value">{rollNo}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Department</span>
          <span className="detail-value">{department}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">University</span>
          <span className="detail-value">{university}</span>
        </div>
      </div>
    </div>
  )
}

export default StudentCard
