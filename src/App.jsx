import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GuestRoute from './components/GuestRoute'
import AppLayout from './components/layout/AppLayout'
import GuestLayout from './components/layout/GuestLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - redirect to dashboard if already logged in */}
        <Route path='/login' element={
          <GuestRoute>
            <GuestLayout><Login /></GuestLayout>
          </GuestRoute>
        } />

        {/* Protected routes - redirect to login if not authenticated */}
        <Route path='/' element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path='projects' element={<Projects />} />
          <Route path='tasks' element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
