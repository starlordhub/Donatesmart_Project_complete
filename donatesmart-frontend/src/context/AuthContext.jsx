import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginAPI, register as registerAPI, getProfile } from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'))
        if (savedUser?.token) {
            getProfile()
                .then((res) => {
                    setUser({ ...savedUser, ...res.data.data })
                })
                .catch(() => {
                    localStorage.removeItem('user')
                    setUser(null)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    const login = async (credentials) => {
        const res = await loginAPI(credentials)
        const data = res.data.data
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        return data
    }

    const register = async (userData) => {
        const res = await registerAPI(userData)
        const data = res.data.data
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        return data
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}