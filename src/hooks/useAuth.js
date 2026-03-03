import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    loginAction,
    logoutAction,
    selectIsAuthenticated,
    selectUser,
} from '../store/authSlice'

export function useAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const isAuthenticated = useSelector(selectIsAuthenticated)

    const login = (email, password) => {
        dispatch(loginAction({ user: { id: Date.now(), email }, password }))
        navigate('/')
    }

    const logout = () => {
        dispatch(logoutAction())
        navigate('/login')
    }

    return { user, isAuthenticated, login, logout }
}