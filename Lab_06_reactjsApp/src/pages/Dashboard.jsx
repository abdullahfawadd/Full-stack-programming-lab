import { Link } from 'react-router-dom' 
import { labTasks } from '../data/labTasks' 
 
const stats = [ 
  { label: 'Modules', value: '4 task flows' }, 
  { label: 'Stack', value: 'React + Vite' }, 
  { label: 'Focus', value: 'State to routing' }, 
  { label: 'UI Tone', value: 'Clean and premium' }, 
] 
 
function Dashboard() { 
  return ( 
    <section className='dashboard container'> 
      <div className='dashboard__hero'> 
        <div className='surface dashboard__hero-panel'> 
          <span className='eyebrow'>Lab 06 React JS App</span> 
          <h1>Four React lab tasks in one polished, presentation-ready workspace.</h1> 
          <p>Each task lives in its own feature folder and is delivered through a single professional dashboard with restrained visual design.</p> 
          <div className='dashboard__actions'> 
            <Link to='/counter-app' className='button button--primary'>Open Task 1</Link> 
            <Link to='/routing-app/home' className='button button--secondary'>Preview Task 4</Link> 
          </div> 
          <div className='dashboard__callout'> 
            <span className='dashboard__callout-label'>Built For Review</span> 
            <span className='dashboard__callout-copy'>Clean routing, isolated modules, and production-style presentation.</span> 
          </div> 
        </div> 
        <div className='surface dashboard__hero-side'> 
          <div className='dashboard__identity'> 
            <span className='eyebrow'>Prepared By</span> 
            <h2>M Abdullah Fawad</h2> 
            <p>Full Stack Programming Lab submission focused on state management, forms, event handling, and routing.</p> 
          </div> 
          <div className='dashboard__stats'> 
            {stats.map((stat) => ( 
              <div key={stat.label} className='dashboard__stat-card'> 
                <span>{stat.label}</span> 
                <strong>{stat.value}</strong> 
              </div> 
            ))} 
          </div> 
        </div> 
      </div> 
      <section className='dashboard__section'> 
        <div className='section-heading'> 
          <div> 
            <span className='eyebrow'>Lab Tasks</span> 
            <h2>Structured for clarity and maintainability</h2> 
          </div> 
          <p>Each task card leads to a focused experience with its own logic, state, and UI behavior.</p> 
        </div> 
        <div className='dashboard__grid'> 
          {labTasks.map((task) => ( 
            <Link to={task.route} key={task.id} className='surface task-card'> 
              <div className='task-card__header'> 
                <span className='pill'>{task.label}</span> 
                <span className='task-card__accent'>{task.accent}</span> 
              </div> 
              <h3>{task.title}</h3> 
              <p>{task.summary}</p> 
              <div className='chip-row'> 
                {task.highlights.map((highlight) => <span key={highlight} className='chip'>{highlight}</span>)} 
              </div> 
              <div className='task-card__footer'> 
                <span>Open experience</span> 
                <span>{task.route.replace('/','')}</span> 
              </div> 
            </Link> 
          ))} 
        </div> 
      </section> 
    </section> 
  ) 
} 
 
export default Dashboard
