import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-bold text-gray-900 mb-6'>Login</h1>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <button type='submit' className='w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 cursor-pointer'>
                        Login
                    </button>
                </form>
                <p className='text-sm text-gray-600 mt-4 text-center'>
                    Don't have an account? <Link to='/register' className='text-black font-medium hover:underline'>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
