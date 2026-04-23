import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getAdminStats, getAllUsers, verifyNGO, toggleUser, getAllDonationsAdmin } from '../../services/adminService'
import { LogOut, Users, Building2, ShieldCheck, Clock, CheckCircle, ToggleLeft, ToggleRight, TrendingUp, AlertCircle, BarChart3, Package } from 'lucide-react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

function AdminDashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [users, setUsers] = useState([])
    const [donations, setDonations] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [verifying, setVerifying] = useState(null)
    const [toggling, setToggling] = useState(null)
    const [filterRole, setFilterRole] = useState('')

    useEffect(() => { fetchStats() }, [])
    useEffect(() => {
        if (activeTab === 'users') fetchUsers()
        if (activeTab === 'donations') fetchDonations()
    }, [activeTab, filterRole])

    const fetchStats = async () => { try { const res = await getAdminStats(); setStats(res.data.data) } catch (e) { console.error(e) } finally { setLoading(false) } }
    const fetchUsers = async () => { try { const res = await getAllUsers(filterRole ? `role=${filterRole}` : ''); setUsers(res.data.data) } catch (e) { console.error(e) } }
    const fetchDonations = async () => { try { const res = await getAllDonationsAdmin(); setDonations(res.data.data) } catch (e) { console.error(e) } }

    const handleVerify = async (id) => { setVerifying(id); try { await verifyNGO(id); fetchStats(); if (activeTab === 'users') fetchUsers() } catch (e) { console.error(e) } finally { setVerifying(null) } }
    const handleToggle = async (id) => { setToggling(id); try { await toggleUser(id); if (activeTab === 'users') fetchUsers() } catch (e) { console.error(e) } finally { setToggling(null) } }

    const catIcons = { food: '🍎', clothing: '👕', books: '📚', electronics: '💻', educational_materials: '🎓', household: '🏠' }
    const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

    const getStatusBadge = (status) => {
        const map = { listed: 'brand', requested: 'yellow', collected: 'blue', delivered: 'green', cancelled: 'red' }
        const labels = { listed: 'Listed', requested: 'Requested', collected: 'Collected', delivered: 'Delivered', cancelled: 'Cancelled' }
        return <Badge variant={map[status] || 'default'}>{labels[status] || status}</Badge>
    }

    const categoryChartData = {
        labels: (stats?.byCategory || []).map(c => c._id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())),
        datasets: [{ label: 'Donations', data: (stats?.byCategory || []).map(c => c.count), backgroundColor: ['#22C55E', '#3B82F6', '#EAB308', '#F97316', '#8B5CF6', '#EC4899'], borderRadius: 8, borderSkipped: false }]
    }

    const statusChartData = {
        labels: ['Listed', 'Requested', 'Delivered'],
        datasets: [{ data: [stats?.donations?.listed || 0, (stats?.donations?.total || 0) - (stats?.donations?.listed || 0) - (stats?.donations?.delivered || 0), stats?.donations?.delivered || 0], backgroundColor: ['rgba(94,165,0,0.7)', 'rgba(234,179,8,0.7)', 'rgba(34,197,94,0.7)'], borderWidth: 0, cutout: '70%' }]
    }

    const chartOpts = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { color: '#525252', font: { size: 11 } }, grid: { display: false }, border: { display: false } },
            y: { ticks: { color: '#525252', font: { size: 11 }, stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.03)' }, border: { display: false } }
        }
    }

    const doughnutOpts = {
        responsive: true,
                plugins: { legend: { position: 'bottom', labels: { color: '#525252', font: { size: 10 }, padding: 12, usePointStyle: true, pointStyleWidth: 8 } } }
    }

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-1">Admin Dashboard</h1>
                    <p className="text-sm text-neutral-500">Platform overview and management</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 border-b border-white/[0.05] pb-3">
                    {['overview', 'users', 'donations'].map(t => (
                        <button key={t} onClick={() => setActiveTab(t)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize cursor-pointer border-none transition-colors
                            ${activeTab === t ? 'bg-brand/10 text-brand' : 'text-neutral-500 bg-transparent hover:text-neutral-300'}`}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* OVERVIEW */}
                {activeTab === 'overview' && (
                    <>
                        {loading ? (
                            <div className="text-center py-16 text-neutral-500">Loading...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {[
                                        { label: 'Total Users', value: stats?.users?.total || 0, icon: Users, color: 'text-blue-400' },
                                        { label: 'Donors', value: stats?.users?.donors || 0, icon: Package, color: 'text-brand' },
                                        { label: 'NGOs', value: stats?.users?.ngos || 0, icon: Building2, color: 'text-purple-400' },
                                        { label: 'Pending Verify', value: stats?.users?.pendingNGOs || 0, icon: AlertCircle, color: 'text-yellow-400' },
                                    ].map((s, i) => (
                                        <Card key={i} padding="p-5" hover>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{s.label}</span>
                                                <s.icon className={`w-4 h-4 ${s.color}`} />
                                            </div>
                                            <div className={`text-2xl font-semibold ${s.color}`}>{s.value}</div>
                                        </Card>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                    {[
                                        { label: 'Total Donations', value: stats?.donations?.total || 0, icon: Package, color: 'text-green-400' },
                                        { label: 'Listed Now', value: stats?.donations?.listed || 0, icon: TrendingUp, color: 'text-brand' },
                                        { label: 'Delivered', value: stats?.donations?.delivered || 0, icon: CheckCircle, color: 'text-blue-400' },
                                    ].map((s, i) => (
                                        <Card key={i} padding="p-5" hover>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{s.label}</span>
                                                <s.icon className={`w-4 h-4 ${s.color}`} />
                                            </div>
                                            <div className={`text-2xl font-semibold ${s.color}`}>{s.value}</div>
                                        </Card>
                                    ))}
                                </div>

                                {(stats?.users?.pendingNGOs || 0) > 0 && (
                                    <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-2xl p-5 mb-6 flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 text-yellow-400" />
                                            <div>
                                                <div className="text-sm font-medium text-yellow-400">{stats?.users?.pendingNGOs} NGO{stats?.users?.pendingNGOs > 1 ? 's' : ''} pending verification</div>
                                                <div className="text-xs text-neutral-500 mt-0.5">Go to Users tab to review</div>
                                            </div>
                                        </div>
                                        <Button variant="secondary" onClick={() => setActiveTab('users')} className="text-xs border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10">Review Now</Button>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card padding="p-6">
                                        <div className="flex items-center gap-2 mb-5"><BarChart3 className="w-4 h-4 text-brand" /><h3 className="text-sm font-medium text-white">Donations by Category</h3></div>
                                        {(stats?.byCategory || []).length > 0 ? <Bar data={categoryChartData} options={chartOpts} height={200} /> : <div className="text-center py-10 text-neutral-500 text-sm">No data yet</div>}
                                    </Card>
                                    <Card padding="p-6">
                                        <div className="flex items-center gap-2 mb-5"><TrendingUp className="w-4 h-4 text-blue-400" /><h3 className="text-sm font-medium text-white">Donation Status</h3></div>
                                        <div className="max-w-[180px] mx-auto"><Doughnut data={statusChartData} options={doughnutOpts} /></div>
                                    </Card>
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* USERS */}
                {activeTab === 'users' && (
                    <div>
                        <div className="flex gap-1.5 mb-5 flex-wrap">
                            {[{ id: '', label: 'All Users' }, { id: 'donor', label: 'Donors' }, { id: 'ngo', label: 'NGOs' }, { id: 'admin', label: 'Admins' }].map(f => (
                                <button key={f.id} onClick={() => setFilterRole(f.id)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer border-none transition-all duration-200
                                    ${filterRole === f.id ? 'bg-brand/10 text-brand border border-brand/30' : 'bg-white/[0.03] text-neutral-500 border border-transparent hover:text-neutral-300'}`}>
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <Card padding="p-0" className="overflow-hidden">
                            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.2fr] px-5 py-3.5 border-b border-white/[0.05] text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                                <span>User</span><span>Role</span><span>Status</span><span>Verified</span><span>Actions</span>
                            </div>

                            {users.length === 0 ? (
                                <div className="text-center py-10 text-neutral-500 text-sm">No users found</div>
                            ) : users.map(u => (
                                <div key={u._id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1.2fr] px-5 py-4 border-b border-white/[0.03] items-center text-sm">
                                    <div>
                                        <div className="text-white font-medium text-[13px]">{u.firstName} {u.lastName}</div>
                                        <div className="text-neutral-500 text-[11px]">{u.email}</div>
                                        {u.organisationName && <div className="text-purple-400 text-[11px]">{u.organisationName}</div>}
                                    </div>
                                    <Badge variant={u.role === 'admin' ? 'purple' : u.role === 'ngo' ? 'blue' : 'brand'}>{u.role}</Badge>
                                    <span className="flex items-center gap-1.5 text-xs">
                                        <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                                        <span className={u.isActive ? 'text-green-400' : 'text-red-400'}>{u.isActive ? 'Active' : 'Inactive'}</span>
                                    </span>
                                    {u.role === 'ngo' ? (
                                        u.isVerified ? <span className="flex items-center gap-1 text-green-400 text-xs"><CheckCircle className="w-3.5 h-3.5" /> Yes</span>
                                        : <span className="flex items-center gap-1 text-yellow-400 text-xs"><Clock className="w-3.5 h-3.5" /> Pending</span>
                                    ) : <span className="text-neutral-600 text-xs">—</span>}
                                    <div className="flex gap-1.5">
                                        {u.role === 'ngo' && !u.isVerified && (
                                            <Button onClick={() => handleVerify(u._id)} disabled={verifying === u._id} icon={ShieldCheck} className="text-[11px] px-3 py-1.5">
                                                {verifying === u._id ? '...' : 'Verify'}
                                            </Button>
                                        )}
                                        {u.role !== 'admin' && (
                                            <Button variant={u.isActive ? 'danger' : 'secondary'} onClick={() => handleToggle(u._id)} disabled={toggling === u._id}
                                                icon={u.isActive ? ToggleRight : ToggleLeft}
                                                className={`text-[11px] px-3 py-1.5 ${!u.isActive ? 'border-green-500/20 text-green-400 hover:bg-green-500/10' : ''}`}>
                                                {u.isActive ? 'Disable' : 'Enable'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Card>
                        <div className="text-right text-[11px] text-neutral-600 mt-3">Showing {users.length} user{users.length !== 1 ? 's' : ''}</div>
                    </div>
                )}

                {/* DONATIONS */}
                {activeTab === 'donations' && (
                    <Card padding="p-6">
                        <h3 className="text-base font-medium text-white mb-5">All Donations</h3>
                        {donations.length === 0 ? (
                            <div className="text-center py-10 text-neutral-500 text-sm">No donations yet</div>
                        ) : (
                            <div className="space-y-3">
                                {donations.map(d => (
                                    <div key={d._id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{catIcons[d.category] || '📦'}</span>
                                            <div>
                                                <div className="text-sm font-medium text-white">{d.title}</div>
                                                <div className="text-[11px] text-neutral-500 mt-0.5">
                                                    by {d.donorId?.firstName || 'Unknown'} • {d.quantity} item{d.quantity > 1 ? 's' : ''} • {d.pickupLocation?.city} • {fmtDate(d.createdAt)}
                                                </div>
                                                {d.requestedBy && <div className="text-purple-400 text-[11px] mt-0.5">Requested by: {d.requestedBy.firstName} {d.requestedBy.lastName}{d.requestedBy.organisationName ? ` (${d.requestedBy.organisationName})` : ''}</div>}
                                            </div>
                                        </div>
                                        {getStatusBadge(d.status)}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="text-right text-[11px] text-neutral-600 mt-3">Showing {donations.length} donation{donations.length !== 1 ? 's' : ''}</div>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard