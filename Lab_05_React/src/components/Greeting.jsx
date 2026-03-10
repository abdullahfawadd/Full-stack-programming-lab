import './Greeting.css'

function Greeting({ name, timeOfDay, bgColor }) {
  const getGreetingText = () => {
    switch (timeOfDay.toLowerCase()) {
      case 'morning':
        return 'Good Morning'
      case 'afternoon':
        return 'Good Afternoon'
      case 'evening':
        return 'Good Evening'
      case 'night':
        return 'Good Night'
      default:
        return 'Hello'
    }
  }

  const getIcon = () => {
    switch (timeOfDay.toLowerCase()) {
      case 'morning':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
      case 'afternoon':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
      case 'evening':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 3a6 6 0 009 5.197A9 9 0 116.804 3 6 6 0 0012 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'night':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 3a6 6 0 009 5.197A9 9 0 116.804 3 6 6 0 0012 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 4l.5 1.5L18 6l-1.5.5L16 8l-.5-1.5L14 6l1.5-.5L16 4zM21 10l.5 1.5L23 12l-1.5.5-.5 1.5-.5-1.5L19 12l1.5-.5L21 10z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      default:
        return null
    }
  }

  const cardStyle = bgColor
    ? { background: bgColor }
    : {}

  return (
    <div className="greeting-card" style={cardStyle}>
      <div className="greeting-icon">{getIcon()}</div>
      <h3 className="greeting-text">{getGreetingText()},</h3>
      <p className="greeting-name">{name}</p>
      <span className="greeting-time">{timeOfDay}</span>
    </div>
  )
}

export default Greeting
