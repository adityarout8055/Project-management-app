import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import GuestLayout from '../components/layout/GuestLayout'
import BoardPage from '../pages/BoardPage'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Projects from '../pages/Projects'
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <GuestRoute><GuestLayout><Login /></GuestLayout></GuestRoute>,
    },
    {
        path: '/',
        element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'board', element: <BoardPage /> },
            { path: 'projects', element: <Projects /> },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])

export default router
