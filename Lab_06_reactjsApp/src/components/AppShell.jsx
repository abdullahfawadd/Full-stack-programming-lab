import { Link, Outlet, useLocation } from 'react-router-dom' 
 
function getContext(pathname) { 
  if (pathname === '/') return 'Dashboard' 
  if (pathname.startsWith('/counter-app')) return 'Task 1' 
  if (pathname.startsWith('/user-form-app')) return 'Task 2' 
  if (pathname.startsWith('/event-app')) return 'Task 3' 
  if (pathname.startsWith('/routing-app')) return 'Task 4' 
  return 'Lab 06' 
} 
 
function AppShell() { 
  const location = useLocation() 
 
  return ( 
    <div className='app-shell'> 
      <div className='app-shell__ambient app-shell__ambient--left' /> 
      <div className='app-shell__ambient app-shell__ambient--right' /> 
      <header className='topbar'> 
        <div className='container topbar__inner'> 
          <Link to='/' className='brand'> 
            <span className='brand__badge'>Lab 06</span> 
            <div className='brand__copy'> 
              <strong>React JS Application Suite</strong> 
              <span>State, events, forms, and routing</span> 
            </div> 
          </Link> 
          <div className='topbar__meta'> 
            <span className='topbar__context'>{getContext(location.pathname)}</span> 
            <div className='identity'> 
              <span className='identity__label'>Prepared By</span> 
              <strong className='identity__name'>M Abdullah Fawad</strong> 
            </div> 
          </div> 
        </div> 
      </header> 
      <main className='app-main'> 
        <Outlet /> 
      </main> 
      <footer className='site-footer'> 
        <div className='container site-footer__inner'> 
          <span>Full Stack Programming Lab</span> 
          <span>Professional React submission for Lab 06</span> 
        </div> 
      </footer> 
    </div> 
  ) 
} 
 
export default AppShell
