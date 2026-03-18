import { Route, Routes } from 'react-router-dom' 
import AppShell from './components/AppShell' 
import CounterAppPage from './features/counter-app/CounterAppPage' 
import EventAppPage from './features/event-app/EventAppPage' 
import RoutingApp from './features/routing-app/RoutingApp' 
import UserFormAppPage from './features/user-form-app/UserFormAppPage' 
import Dashboard from './pages/Dashboard' 
import NotFound from './pages/NotFound' 
 
function App() { 
  return ( 
    <Routes> 
      <Route element={<AppShell />}> 
        <Route path='/' element={<Dashboard />} /> 
        <Route path='/counter-app' element={<CounterAppPage />} /> 
        <Route path='/user-form-app' element={<UserFormAppPage />} /> 
        <Route path='/event-app' element={<EventAppPage />} /> 
        <Route path='/routing-app/*' element={<RoutingApp />} /> 
        <Route path='*' element={<NotFound />} /> 
      </Route> 
    </Routes> 
  ) 
} 
 
export default App
