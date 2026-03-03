import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Sidebar = () => {
    const { user, logout } = useAuth()

    return (
        <aside className='w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col'>
            <div className='h-16 flex items-center px-6 border-b border-gray-200'>
                <span className='text-xl font-bold'>Logo</span>
            </div>
            <nav className='flex-1 px-4 py-4 space-y-1'>
                <NavLink
                    to='/'
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to='/board'
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`
                    }
                >
                    Board
                </NavLink>
                <NavLink
                    to='/projects'
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`
                    }
                >
                    Projects
                </NavLink>
            </nav>
            {/* Footer/User section */}
            <div className='p-4 border-t border-gray-200'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full bg-gray-300'></div>
                        <span className='text-sm font-medium'>{user?.email || 'User'}</span>
                    </div>
                    <button
                        onClick={logout}
                        className='text-sm text-gray-500 hover:text-gray-900 cursor-pointer'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar