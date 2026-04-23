import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HeartHandshake, Mail, Lock, Eye, EyeOff, User, Phone, Building2, FileText, ArrowLeft } from 'lucide-react'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'

function Register() {
    const [step, setStep] = useState(1)
    const [role, setRole] = useState('')
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '', organisationName: '', registrationNumber: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register } = useAuth()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await register({ ...form, role })
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.')
        } finally {
            setLoading(false)
        }
    }

    const roles = [
        { id: 'donor', label: 'Donor', desc: 'Give items to those in need', icon: '🎁' },
        { id: 'ngo', label: 'NGO', desc: 'Request & distribute donations', icon: '🏢' },
    ]

    const inputLabel = (icon, text) => (
        <label className="block text-xs font-medium text-neutral-400 mb-2">
            <span className="inline-flex items-center gap-1.5"><icon className="w-3 h-3" /> {text}</span>
        </label>
    )

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
            <div className="absolute w-[600px] h-[400px] bg-brand rounded-full blur-[120px] mix-blend-screen opacity-[0.06] -top-[150px] -left-[200px] pointer-events-none" />

            <div className="w-full max-w-lg relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
                        <div className="w-11 h-11 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
                            <HeartHandshake className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-semibold text-white tracking-tight">Donate<span className="text-brand">Smart</span></span>
                    </Link>
                    <h1 className="text-3xl font-semibold text-white mb-2">Create your account</h1>
                    <p className="text-sm text-neutral-500">Step {step} of 2 — {step === 1 ? 'Choose your role' : 'Fill in your details'}</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-3 mb-6">
                    {[
                        { num: 1, label: 'Role', active: step >= 1, done: step > 1 },
                        { num: 2, label: 'Details', active: step >= 2, done: false },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                                ${s.done ? 'bg-brand text-white' : s.active ? 'bg-brand text-white' : 'bg-white/[0.05] border border-white/10 text-neutral-500'}`}>
                                {s.num}
                            </div>
                            <span className={`text-[11px] font-medium transition-colors ${s.active ? 'text-brand' : 'text-neutral-600'}`}>{s.label}</span>
                            {i === 0 && <div className="flex-1 w-16 h-px bg-white/[0.05]" />}
                        </div>
                    ))}
                </div>

                <Card padding="p-8">
                    {step === 1 ? (
                        <>
                            <h3 className="text-sm font-medium text-white mb-5">I want to register as a...</h3>
                            <div className="grid grid-cols-2 gap-4 mb-5">
                                {roles.map((r) => (
                                    <div
                                        key={r.id}
                                        onClick={() => setRole(r.id)}
                                        className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all duration-300
                                            ${role === r.id ? 'border-brand bg-brand/[0.06] shadow-[0_0_30px_rgba(94,165,0,0.1)]' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'}`}
                                    >
                                        <div className="text-3xl mb-2">{r.icon}</div>
                                        <div className="text-sm font-medium text-white mb-1">{r.label}</div>
                                        <div className="text-[10px] text-neutral-500 leading-relaxed">{r.desc}</div>
                                    </div>
                                ))}
                            </div>
                            {role === 'ngo' && (
                                <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3 mb-5 flex items-start gap-2">
                                    <FileText className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                    <span className="text-[11px] text-blue-300/70 leading-relaxed">NGO accounts require verification. You'll need to provide organisation registration documents.</span>
                                </div>
                            )}
                            <Button onClick={() => role && setStep(2)} disabled={!role} className="w-full">
                                Continue
                            </Button>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 mb-5 text-sm text-red-400">{error}</div>
                            )}

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div>
                                    {inputLabel(User, 'First Name')}
                                    <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" required />
                                </div>
                                <div>
                                    {inputLabel(User, 'Last Name')}
                                    <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" required />
                                </div>
                            </div>

                            {role === 'ngo' && (
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        {inputLabel(Building2, 'Organisation Name')}
                                        <Input name="organisationName" value={form.organisationName} onChange={handleChange} placeholder="Helping Hands" required />
                                    </div>
                                    <div>
                                        {inputLabel(FileText, 'Reg. Number')}
                                        <Input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="NGO-2025-XXX" required />
                                    </div>
                                </div>
                            )}

                            <div className="mb-4">
                                {inputLabel(Mail, 'Email')}
                                <Input icon={Mail} type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                            </div>

                            <div className="mb-4">
                                {inputLabel(Phone, 'Phone')}
                                <Input icon={Phone} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7XXX XXX XXX" />
                            </div>

                            <div className="mb-6">
                                {inputLabel(Lock, 'Password (min 8 characters)')}
                                <Input
                                    icon={Lock}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    rightIcon={showPassword ? EyeOff : Eye}
                                    onRightClick={() => setShowPassword(!showPassword)}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button variant="secondary" type="button" onClick={() => setStep(1)} icon={ArrowLeft}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-1">
                                    {loading ? 'Creating account...' : 'Create Account'}
                                </Button>
                            </div>
                        </form>
                    )}

                    <p className="text-center text-xs text-neutral-500 mt-6">
                        Already have an account? <Link to="/login" className="text-brand font-medium hover:underline">Sign in</Link>
                    </p>
                </Card>
            </div>
        </div>
    )
}

export default Register