import { Link } from 'react-router-dom' 
 
function NotFound() { 
  return ( 
    <section className='container'> 
      <div className='surface not-found'> 
        <span className='eyebrow'>Not Found</span> 
        <h1>This page does not exist in the Lab 06 workspace.</h1> 
        <p>The route may be incorrect or the page may have moved. You can return to the main dashboard and continue from there.</p> 
        <Link to='/' className='button button--primary'>Back to dashboard</Link> 
      </div> 
    </section> 
  ) 
} 
 
export default NotFound
