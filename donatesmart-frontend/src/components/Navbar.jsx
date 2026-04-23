import { HeartHandshake, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Badge from './Badge'

const roleColors = {
    donor: 'brand',
    ngo: 'blue',
    admin: 'purple'
}

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-white/[0.05] bg-dark-900/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="/dashboard" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
                        <HeartHandshake className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-white tracking-tight">
                        Donate<span className="text-brand">Smart</span>
                    </span>
                </a>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
                            <User className="w-4 h-4 text-neutral-400" />
                        </div>
                        <span className="text-sm text-neutral-300">{user?.firstName} {user?.lastName}</span>
                        <Badge variant={roleColors[user?.role]}>{user?.role}</Badge>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neutral-400 text-xs hover:bg-white/[0.06] hover:text-neutral-200 transition-all cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}