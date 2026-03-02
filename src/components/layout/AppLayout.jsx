import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const AppLayout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1'>
          <TopBar />
          <div className='p-6'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppLayout