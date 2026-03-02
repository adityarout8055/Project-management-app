import { createSlice } from '@reduxjs/toolkit'

// Load initial state from localStorage
const user = JSON.parse(localStorage.getItem('user'))
const password = localStorage.getItem('password')

const initialState = {
    user: user || null,
    password: password || null,
    isAuthenticated: !!user,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { user, password } = action.payload
            state.user = user
            state.password = password
            state.isAuthenticated = true

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('password', password)
        },
        logout: (state) => {
            state.user = null
            state.password = null
            state.isAuthenticated = false

            localStorage.removeItem('user')
            localStorage.removeItem('password')
        },
    },
})

export const { login, logout } = authSlice.actions

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUser = (state) => state.auth.user
export const selectPassword = (state) => state.auth.password

export default authSlice.reducer
