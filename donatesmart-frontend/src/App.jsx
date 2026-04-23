import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import DonorDashboard from './pages/donor/DonorDashboard'
import CreateDonation from './pages/donor/CreateDonation'
import NGODashboard from './pages/ngo/NGODashboard'
import BrowseDonations from './pages/ngo/BrowseDonations'
import AdminDashboard from './pages/admin/AdminDashboard'

function ProtectedRoute({ children, roles }) {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#525252' }}>Loading...</p>
            </div>
        )
    }

    if (!user) return <Navigate to="/login" />
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />
    return children
}

function DashboardRedirect() {
    const { user } = useAuth()
    if (user?.role === 'ngo') return <NGODashboard />
    if (user?.role === 'admin') return <AdminDashboard />
    return <DonorDashboard />
}

function AppRoutes() {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
            <Route path="/donate" element={<ProtectedRoute roles={['donor']}><CreateDonation /></ProtectedRoute>} />
            <Route path="/browse" element={<ProtectedRoute roles={['ngo']}><BrowseDonations /></ProtectedRoute>} />
        </Routes>
    )
}

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    )
}

export default App