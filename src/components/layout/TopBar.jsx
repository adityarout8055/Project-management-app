import React from 'react'
import Button from '../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUser } from '../../features/auth/authSlice'
import { logout } from '../../features/auth/authSlice'

const TopBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  return (
    <header className='h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white'>
        <div className='text-xl font-bold'>Project Management</div>
        <div className='flex items-center gap-4'>
            {isAuthenticated ? (
                <div className='flex items-center gap-4'>
                    <span className='text-gray-700'>{user.email}</span>
                    <Button onClick={() => {dispatch(logout())}}>Logout</Button>
                </div>
            ) : (
                <>
                    <Button>Login</Button>
                    <Button>Register</Button>
                </>
            )}
        </div>
    </header>
  )
}

export default TopBar