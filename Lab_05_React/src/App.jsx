import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import StudentCardApp from './pages/StudentCardApp'
import CourseListApp from './pages/CourseListApp'
import GreetingApp from './pages/GreetingApp'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/task1" element={<StudentCardApp />} />
      <Route path="/task2" element={<CourseListApp />} />
      <Route path="/task3" element={<GreetingApp />} />
    </Routes>
  )
}

export default App
