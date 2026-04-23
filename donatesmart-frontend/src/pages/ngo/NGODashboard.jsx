import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getMyRequests } from '../../services/requestService'
import { LogOut, Package, User, Search, Clock, CheckCircle } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'

function NGODashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMyRequests().then(res => setRequests(res.data.data)).catch(console.error).finally(() => setLoading(false))
    }, [])

    const getStatusBadge = (status) => {
        const map = { pending: 'yellow', accepted: 'green', rejected: 'red', collected: 'blue', completed: 'green' }
        const labels = { pending: 'Pending', accepted: 'Accepted', rejected: 'Rejected', collected: 'Collected', completed: 'Completed' }
        return <Badge variant={map[status] || 'default'}>{labels[status] || status}</Badge>
    }

    const catIcons = { food: '🍎', clothing: '👕', books: '📚', electronics: '💻', educational_materials: '🎓', household: '🏠' }
    const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    const pendingCount = requests.filter(r => r.status === 'pending').length
    const acceptedCount = requests.filter(r => r.status === 'accepted').length

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-1">{user?.organisationName || user?.firstName}</h1>
                        <p className="text-sm text-neutral-500">Manage your donation requests</p>
                    </div>
                    <Button variant="blue" onClick={() => navigate('/browse')} icon={Search} className="shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        Browse Donations
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Total Requests', value: requests.length, icon: Package, color: 'text-blue-400' },
                        { label: 'Pending', value: pendingCount, icon: Clock, color: 'text-yellow-400' },
                        { label: 'Accepted', value: acceptedCount, icon: CheckCircle, color: 'text-green-400' },
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

                <Card padding="p-6">
                    <h3 className="text-base font-medium text-white mb-5">My Requests</h3>
                    {loading ? (
                        <div className="text-center py-10 text-neutral-500 text-sm">Loading...</div>
                    ) : requests.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="text-4xl mb-3">📋</div>
                            <p className="text-neutral-500 text-sm mb-4">No requests yet</p>
                            <Button variant="secondary" onClick={() => navigate('/browse')} icon={Search}>Browse available donations</Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {requests.map((r) => (
                                <div key={r._id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex-wrap gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{catIcons[r.donationId?.category] || '📦'}</span>
                                        <div>
                                            <div className="text-sm font-medium text-white">{r.donationId?.title || 'Donation'}</div>
                                            <div className="text-[11px] text-neutral-500 mt-0.5">
                                                {r.donationId?.quantity} item{r.donationId?.quantity > 1 ? 's' : ''} • {r.donationId?.pickupLocation?.city} • {fmtDate(r.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    {getStatusBadge(r.status)}
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}

export default NGODashboard