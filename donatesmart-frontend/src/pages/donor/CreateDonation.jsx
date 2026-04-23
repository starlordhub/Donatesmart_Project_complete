import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createDonation } from '../../services/donationService'
import { ArrowLeft, Package, MapPin, FileText, Tag, Layers, Hash } from 'lucide-react'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'

const categories = [
    { id: 'food', label: 'Food', icon: '🍎', desc: 'Meals, packaged food' },
    { id: 'clothing', label: 'Clothing', icon: '👕', desc: 'Wearables, shoes' },
    { id: 'books', label: 'Books', icon: '📚', desc: 'Textbooks, fiction' },
    { id: 'electronics', label: 'Electronics', icon: '💻', desc: 'Phones, laptops' },
    { id: 'educational_materials', label: 'Education', icon: '🎓', desc: 'Stationery, kits' },
    { id: 'household', label: 'Household', icon: '🏠', desc: 'Furniture, kitchen' },
]

const conditions = [
    { id: 'new', label: 'New', color: 'border-green-500 text-green-400 bg-green-500/10' },
    { id: 'like_new', label: 'Like New', color: 'border-blue-500 text-blue-400 bg-blue-500/10' },
    { id: 'good', label: 'Good', color: 'border-yellow-500 text-yellow-400 bg-yellow-500/10' },
    { id: 'fair', label: 'Fair', color: 'border-orange-500 text-orange-400 bg-orange-500/10' },
]

function CreateDonation() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [form, setForm] = useState({ title: '', description: '', category: '', condition: '', quantity: 1, address: '', city: '', postcode: '', notes: '' })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(''); setSuccess(''); setLoading(true)
        try {
            await createDonation({ title: form.title, description: form.description, category: form.category, condition: form.condition, quantity: parseInt(form.quantity), pickupLocation: { address: form.address, city: form.city, postcode: form.postcode }, notes: form.notes })
            setSuccess('Donation created successfully! Redirecting...')
            setTimeout(() => navigate('/dashboard'), 1500)
        } catch (err) { setError(err.response?.data?.message || 'Failed to create donation.') }
        finally { setLoading(false) }
    }

    const label = (icon, text) => (
        <label className="block text-xs font-medium text-neutral-400 mb-2">
            <span className="inline-flex items-center gap-1.5"><icon className="w-3 h-3" /> {text}</span>
        </label>
    )

    return (
        <div className="min-h-screen bg-dark-900">
            <div className="border-b border-white/[0.05] px-6 py-4 flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate('/dashboard')} icon={ArrowLeft} className="text-xs px-3 py-2">Back</Button>
                <h1 className="text-lg font-semibold text-white">Create Donation</h1>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-8">
                {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 mb-5 text-sm text-red-400">{error}</div>}
                {success && <div className="bg-brand/10 border border-brand/20 rounded-xl p-3.5 mb-5 text-sm text-brand">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        {label(Tag, 'Donation Title')}
                        <Input name="title" value={form.title} onChange={handleChange} placeholder='e.g. "Winter Clothing Bundle"' required maxLength={100} />
                    </div>

                    <div>
                        {label(FileText, 'Description')}
                        <Input name="description" value={form.description} onChange={handleChange} placeholder="Describe what you're donating..." rows={3} maxLength={500} />
                        <div className="text-right text-[10px] text-neutral-600 mt-1">{form.description.length}/500</div>
                    </div>

                    <div>
                        {label(Layers, 'Category')}
                        <div className="grid grid-cols-3 gap-2">
                            {categories.map((cat) => (
                                <div key={cat.id} onClick={() => setForm({ ...form, category: cat.id })}
                                    className={`p-3 rounded-xl border-2 cursor-pointer text-center transition-all duration-300
                                    ${form.category === cat.id ? 'border-brand bg-brand/[0.06] shadow-[0_0_20px_rgba(94,165,0,0.1)]' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'}`}>
                                    <div className="text-xl mb-1">{cat.icon}</div>
                                    <div className="text-[11px] font-medium text-white">{cat.label}</div>
                                    <div className="text-[9px] text-neutral-500">{cat.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-2">Condition</label>
                        <div className="grid grid-cols-4 gap-2">
                            {conditions.map((c) => (
                                <div key={c.id} onClick={() => setForm({ ...form, condition: c.id })}
                                    className={`p-2.5 rounded-xl border-2 cursor-pointer text-center text-xs font-medium transition-all duration-300
                                    ${form.condition === c.id ? c.color : 'border-white/[0.06] bg-white/[0.02] text-neutral-500 hover:border-white/[0.15]'}`}>
                                    {c.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        {label(Hash, 'Quantity')}
                        <Input name="quantity" type="number" value={form.quantity} onChange={handleChange} min="1" required className="max-w-[160px]" />
                    </div>

                    <div>
                        {label(MapPin, 'Pickup Location')}
                        <div className="space-y-2.5">
                            <Input name="address" value={form.address} onChange={handleChange} placeholder="Street address" required />
                            <div className="grid grid-cols-2 gap-2.5">
                                <Input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
                                <Input name="postcode" value={form.postcode} onChange={handleChange} placeholder="Postcode" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-2">Additional Notes (optional)</label>
                        <Input name="notes" value={form.notes} onChange={handleChange} placeholder="Pickup instructions, availability times..." rows={2} />
                    </div>

                    <Button type="submit" disabled={loading || !form.category || !form.condition} icon={Package} className="w-full py-3.5">
                        {loading ? 'Creating...' : 'Create Donation'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateDonation