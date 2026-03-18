import { Link } from 'react-router-dom' 
 
function TaskLayout({ taskNumber, title, objective, badges = [], children }) { 
  return ( 
    <section className='task-layout container'> 
      <div className='surface task-layout__hero'> 
        <div className='task-layout__breadcrumbs'> 
          <Link to='/' className='inline-link'>Back to dashboard</Link> 
          <span className='task-layout__separator' /> 
          <span className='eyebrow'>Lab Task {taskNumber}</span> 
        </div> 
        <div className='task-layout__hero-content'> 
          <div className='task-layout__hero-copy'> 
            <h1>{title}</h1> 
            <p>{objective}</p> 
          </div> 
          <div className='badge-group'> 
            {badges.map((badge) => ( 
              <span key={badge} className='pill pill--soft'>{badge}</span> 
            ))} 
          </div> 
        </div> 
      </div> 
      <div className='task-layout__content'>{children}</div> 
    </section> 
  ) 
} 
 
export default TaskLayout
