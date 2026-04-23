import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getMyDonations } from '../../services/donationService'
import { getReceivedRequests, respondToRequest } from '../../services/requestService'
import { Plus, Clock, CheckCircle, Truck, MapPin, Check, X, MessageSquare, Building2, Package } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'

function DonorDashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [donations, setDonations] = useState([])
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [responding, setResponding] = useState(null)
    const [activeTab, setActiveTab] = useState('donations')

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const [donRes, reqRes] = await Promise.all([getMyDonations(), getReceivedRequests()])
            setDonations(donRes.data.data)
            setRequests(reqRes.data.data)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    const handleRespond = async (requestId, status) => {
        setResponding(requestId)
        try { await respondToRequest(requestId, { status }); fetchData() }
        catch (err) { console.error(err) }
        finally { setResponding(null) }
    }

    const pendingRequests = requests.filter(r => r.status === 'pending').length

    const getStatusBadge = (status) => {
        const map = { listed: 'brand', requested: 'yellow', collected: 'blue', delivered: 'green', cancelled: 'red' }
        const labels = { listed: 'Listed', requested: 'Requested', collected: 'Collected', delivered: 'Delivered', cancelled: 'Cancelled' }
        return <Badge variant={map[status] || 'default'}>{labels[status] || status}</Badge>
    }

    const getRequestBadge = (status) => {
        const map = { pending: 'yellow', accepted: 'green', rejected: 'red' }
        const labels = { pending: 'Pending', accepted: 'Accepted', rejected: 'Rejected' }
        return <Badge variant={map[status] || 'default'}>{labels[status] || status}</Badge>
    }

    const catIcons = { food: '🍎', clothing: '👕', books: '📚', electronics: '💻', educational_materials: '🎓', household: '🏠' }

    const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-1">Welcome back, {user?.firstName}</h1>
                        <p className="text-sm text-neutral-500">Manage your donations and requests</p>
                    </div>
                    <Button onClick={() => navigate('/donate')} icon={Plus} className="shadow-[0_0_20px_rgba(94,165,0,0.3)]">
                        New Donation
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Donations', value: user?.totalDonations || 0, icon: Package, color: 'text-brand' },
                        { label: 'Items Donated', value: user?.totalItemsDonated || 0, icon: Truck, color: 'text-blue-400' },
                        { label: 'Pending Requests', value: pendingRequests, icon: Clock, color: 'text-yellow-400' },
                        { label: 'Status', value: user?.isVerified ? 'Verified' : 'Pending', icon: CheckCircle, color: user?.isVerified ? 'text-green-400' : 'text-yellow-400' },
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

                {/* Tabs */}
                <div className="flex gap-1 mb-6 border-b border-white/[0.05] pb-3">
                    <button onClick={() => setActiveTab('donations')} className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border-none transition-colors ${activeTab === 'donations' ? 'bg-brand/10 text-brand' : 'text-neutral-500 bg-transparent hover:text-neutral-300'}`}>
                        My Donations ({donations.length})
                    </button>
                    <button onClick={() => setActiveTab('requests')} className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border-none transition-colors flex items-center gap-1.5 ${activeTab === 'requests' ? 'bg-brand/10 text-brand' : 'text-neutral-500 bg-transparent hover:text-neutral-300'}`}>
                        Incoming Requests ({requests.length})
                        {pendingRequests > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500 text-black font-bold">{pendingRequests}</span>}
                    </button>
                </div>

                {/* Donations Tab */}
                {activeTab === 'donations' && (
                    <Card padding="p-6">
                        <h3 className="text-base font-medium text-white mb-5">My Donations</h3>
                        {loading ? (
                            <div className="text-center py-10 text-neutral-500 text-sm">Loading...</div>
                        ) : donations.length === 0 ? (
                            <div className="text-center py-10">
                                <div className="text-4xl mb-3">📦</div>
                                <p className="text-neutral-500 text-sm mb-4">No donations yet</p>
                                <Button variant="secondary" onClick={() => navigate('/donate')} icon={Plus}>Create your first donation</Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {donations.map((d) => (
                                    <div key={d._id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{catIcons[d.category] || '📦'}</span>
                                            <div>
                                                <div className="text-sm font-medium text-white">{d.title}</div>
                                                <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-0.5">
                                                    <span>{d.quantity} item{d.quantity > 1 ? 's' : ''}</span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{d.pickupLocation.city}</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{fmtDate(d.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {getStatusBadge(d.status)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                )}

                {/* Requests Tab */}
                {activeTab === 'requests' && (
                    <Card padding="p-6">
                        <h3 className="text-base font-medium text-white mb-5">Incoming Requests</h3>
                        {loading ? (
                            <div className="text-center py-10 text-neutral-500 text-sm">Loading...</div>
                        ) : requests.length === 0 ? (
                            <div className="text-center py-10">
                                <div className="text-4xl mb-3">📭</div>
                                <p className="text-neutral-500 text-sm">No requests yet</p>
                                <p className="text-neutral-600 text-xs mt-1">NGOs will send requests when they see your donations</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requests.map((r) => (
                                    <div key={r._id} className={`bg-white/[0.02] rounded-2xl p-5 ${r.status === 'pending' ? 'border border-yellow-500/20' : 'border border-white/[0.04]'}`}>
                                        <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{catIcons[r.donationId?.category] || '📦'}</span>
                                                <div>
                                                    <div className="text-sm font-medium text-white">{r.donationId?.title || 'Donation'}</div>
                                                    <div className="text-[11px] text-neutral-500">{r.donationId?.quantity} item{r.donationId?.quantity > 1 ? 's' : ''} • {r.donationId?.pickupLocation?.city}</div>
                                                </div>
                                            </div>
                                            {getRequestBadge(r.status)}
                                        </div>

                                        <div className="flex items-center gap-2 mb-3 p-2.5 bg-white/[0.02] rounded-lg">
                                            <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                            <span className="text-xs text-neutral-400">
                                                <span className="text-white font-medium">{r.ngoId?.firstName} {r.ngoId?.lastName}</span>
                                                {r.ngoId?.organisationName && <span className="text-neutral-500"> — {r.ngoId.organisationName}</span>}
                                            </span>
                                        </div>

                                        {r.message && (
                                            <div className="flex items-start gap-2 mb-4 p-3 bg-white/[0.02] rounded-lg border-l-2 border-brand/30">
                                                <MessageSquare className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Message</div>
                                                    <div className="text-xs text-neutral-400 leading-relaxed">{r.message}</div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-[11px] text-neutral-600 flex items-center gap-1 mb-3">
                                            <Clock className="w-3 h-3" /> Requested on {fmtDate(r.createdAt)}
                                        </div>

                                        {r.status === 'pending' && (
                                            <div className="flex gap-3 justify-end">
                                                <Button variant="danger" onClick={() => handleRespond(r._id, 'rejected')} disabled={responding === r._id} icon={X} className="text-xs px-4 py-2">
                                                    {responding === r._id ? '...' : 'Reject'}
                                                </Button>
                                                <Button variant="success" onClick={() => handleRespond(r._id, 'accepted')} disabled={responding === r._id} icon={Check} className="text-xs px-4 py-2">
                                                    {responding === r._id ? '...' : 'Accept'}
                                                </Button>
                                            </div>
                                        )}

                                        {r.status === 'accepted' && (
                                            <div className="flex items-center gap-1.5 justify-end text-xs text-green-400"><CheckCircle className="w-3.5 h-3.5" /> You accepted this request</div>
                                        )}
                                        {r.status === 'rejected' && (
                                            <div className="flex items-center gap-1.5 justify-end text-xs text-red-400"><X className="w-3.5 h-3.5" /> You rejected this request</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                )}
            </div>
        </div>
    )
}

export default DonorDashboard