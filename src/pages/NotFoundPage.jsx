import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFoundPage = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='text-center'>
                <h1 className='text-7xl font-bold text-gray-200 mb-4'>404</h1>
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>Page not found</h2>
                <p className='text-gray-500 mb-6'>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to='/'>
                    <Button>Back to Dashboard</Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage
