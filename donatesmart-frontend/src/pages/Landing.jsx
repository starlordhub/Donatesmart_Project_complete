import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartHandshake, PackagePlus, Play, ArrowRight, AlertTriangle, Scissors, Trash2, EyeOff, Users, Route, BadgeCheck, LayoutGrid, BarChart3, Shield, ShieldCheck, GitBranch, Apple, Shirt, BookOpen, Laptop, GraduationCap, Home, Lock, MapPin, Leaf, Fingerprint, ScanEye, Terminal, Star, MessageCircle, ChevronDown, Clock, Building2 } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'


function Landing() {
    const [openFaq, setOpenFaq] = useState(null)

    const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i)

    const faqs = [
        { q: 'Is DonateSmart only for monetary donations?', a: 'No — DonateSmart is specifically designed for physical items: food, clothing, books, electronics, and educational materials. We focus on redistributing tangible goods that would otherwise go to waste.' },
        { q: 'How are NGOs verified?', a: 'NGOs must submit registration documents, proof of charitable status, and operational details. Our admin team reviews each application before granting platform access. Verified organisations receive a badge on their profile.' },
        { q: 'Can I track my donation after I\'ve listed it?', a: 'Yes — every donation has a unique ID and a real-time tracking timeline. You\'ll see when it\'s requested, collected, and delivered, along with which NGO received it. You\'ll also see the environmental impact of your contribution.' },
        { q: 'Is my data safe on this platform?', a: 'Absolutely. We use JWT authentication, encrypted data storage, and follow GDPR regulations. Personal information is only shared with relevant parties and never sold to third parties.' },
        { q: 'Who handles the pickup and delivery logistics?', a: 'Pickup coordination happens directly between the donor and the requesting NGO through the platform\'s messaging system. Some NGOs have their own logistics teams; for others, donors may drop off items at designated collection points.' },
        { q: 'Is the platform free to use?', a: 'Yes. DonateSmart is completely free for donors, NGOs, and beneficiaries. The platform is designed as a social impact initiative, and there are no fees, commissions, or hidden charges.' },
    ]

        const categories = [
        { image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100', label: 'Food', desc: 'Restaurant surplus, packaged goods, fresh produce', tags: ['Restaurant surplus', 'Packaged goods', 'Fresh produce'], color: 'bg-green-500/10 border-green-500/20 text-green-400' },
        { image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100', label: 'Clothing', desc: 'Gently used or new clothing, shoes, accessories', tags: ['Seasonal wear', 'Children\'s clothes', 'Footwear'], color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
        { image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100', label: 'Books', desc: 'Academic textbooks, fiction, children\'s books', tags: ['Textbooks', 'Children\'s books', 'Reference'], color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
        { image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100', label: 'Electronics', desc: 'Functional phones, laptops, tablets', tags: ['Laptops', 'Phones', 'Accessories'], color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' },
        { image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100', label: 'Education', desc: 'Stationery, art supplies, learning resources', tags: ['Stationery', 'Art supplies', 'Science kits'], color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
        { image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100', label: 'Household', desc: 'Furniture, kitchenware, bedding', tags: ['Furniture', 'Kitchenware', 'Bedding'], color: 'bg-pink-500/10 border-pink-500/20 text-pink-400' },
    ]

    const features = [
        { icon: Users, title: 'Role-Based Access', desc: 'Separate dashboards for Donors, NGOs, and Administrators with tailored workflows and permissions.' },
        { icon: Route, title: 'Donation Tracking', desc: 'Real-time status updates from listing → requested → collected → delivered. Donors always know where their items are.' },
        { icon: BadgeCheck, title: 'NGO Verification', desc: 'Every NGO is verified before onboarding. Beneficiaries are confirmed legitimate, ensuring resources reach the right hands.' },
        { icon: LayoutGrid, title: 'Smart Categorisation', desc: 'Items automatically organised by category — food, clothing, books, electronics — with filters and search.' },
        { icon: BarChart3, title: 'Impact Analytics', desc: 'Chart.js-powered dashboards showing donation trends, category breakdowns, and environmental impact metrics.' },
        { icon: Shield, title: 'Secure & Private', desc: 'JWT authentication, encrypted data storage, and GDPR-compliant handling of all personal information.' },
    ]

       const testimonials = [
        { name: 'Sarah Mitchell', role: 'Donor • London', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', text: 'I had boxes of old textbooks I didn\'t want to throw away but didn\'t know who to give them to. DonateSmart connected me with a school that needed them — and I could see exactly when they were delivered.', verified: true },
        { name: 'James Rodriguez', role: 'Director • Helping Hands NGO', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', text: 'Before DonateSmart, we spent hours calling donors and coordinating pickups manually. Now we browse available items, request what we need, and track everything in one place.', verified: false },
        { name: 'Amira Patel', role: 'Platform Administrator', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', text: 'The analytics dashboard gives us incredible visibility into donation patterns. We can see which categories are most active, peak times, and environmental impact — data we never had before.', verified: false },
    ]

    const stats = [
        { label: 'Items Redirected', value: '12,847+', color: 'text-white' },
        { label: 'NGOs Registered', value: '340+', color: 'text-brand' },
        { label: 'Active Donors', value: '5,210+', color: 'text-white' },
        { label: 'Waste Reduction', value: '67%', color: 'text-brand' },
    ]

    const tickerItems = [
        { icon: ShieldCheck, text: 'GDPR Compliant' },
        { icon: Lock, text: 'JWT Secured' },
        { icon: ScanEye, text: 'Full Transparency' },
        { icon: Users, text: 'Role-Based Access' },
        { icon: GitBranch, text: 'Circular Economy' },
        { icon: MapPin, text: 'Location Aware' },
        { icon: BarChart3, text: 'Real-Time Analytics' },
        { icon: Terminal, text: 'Responsive Design' },
    ]

    return (
        // ---> CHANGE IS HERE: Added "bg-grid-pattern" <---
        <div className="min-h-screen bg-dark-900 bg-grid-pattern">
            
            {/* Background Orbs */}
            <div className="fixed w-[800px] h-[500px] bg-brand rounded-full blur-[120px] mix-blend-screen opacity-[0.06] -top-[200px] -left-[300px] pointer-events-none" />
            <div className="fixed w-[600px] h-[600px] bg-brand rounded-full blur-[120px] mix-blend-screen opacity-[0.04] -bottom-[100px] -right-[200px] pointer-events-none" />

            {/* ===== NAVBAR ===== */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300" id="landing-nav">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
                            <HeartHandshake className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-white tracking-tight">Donate<span className="text-brand">Smart</span></span>
                    </a>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#problem" className="text-sm text-neutral-400 hover:text-white transition-colors">Problem</a>
                        <a href="#features" className="text-sm text-neutral-400 hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="text-sm text-neutral-400 hover:text-white transition-colors">How It Works</a>
                        <a href="#categories" className="text-sm text-neutral-400 hover:text-white transition-colors">Categories</a>
                        <a href="#faq" className="text-sm text-neutral-400 hover:text-white transition-colors">FAQ</a>
                    </div>
                    <Link to="/login">
                        <Button className="text-sm px-5 py-2.5">Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <section className="relative pt-32 pb-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8">
                        <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                        <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em]">Bridging surplus with need</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.08] mb-6">
                        <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">Don't waste what</span><br />
                        <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">someone </span>
                        <em className="font-normal font-serif text-brand">desperately</em>
                        <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent"> needs</span>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
                        DonateSmart connects donors with verified NGOs and beneficiaries — making resource redistribution <span className="text-neutral-200">transparent</span>, <span className="text-neutral-200">efficient</span>, and <span className="text-neutral-200">impactful</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link to="/register"><Button icon={PackagePlus} className="text-base px-8 py-4 shadow-[0_0_20px_rgba(94,165,0,0.3)]">Start Donating</Button></Link>
                        <a href="#how-it-works"><Button variant="secondary" icon={Play} className="text-base px-8 py-4">See How It Works</Button></a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {stats.map((s, i) => (
                            <Card key={i} padding="p-5" className="text-center relative overflow-hidden">
                                <div className={`text-2xl md:text-3xl font-semibold ${s.color} mb-1`}>{s.value}</div>
                                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{s.label}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRUST TICKER ===== */}
            <section className="relative py-6 border-y border-white/[0.05] overflow-hidden">
                <div className="flex animate-[ticker-slide_30s_linear_infinite] w-max">
                    {[...tickerItems, ...tickerItems].map((item, i) => (
                        <span key={i} className="flex items-center gap-2 px-6 text-neutral-600 text-sm font-medium whitespace-nowrap">
                            <item.icon className="w-4 h-4 text-brand/40" />{item.text}
                        </span>
                    ))}
                </div>
            </section>

            {/* ===== PROBLEM ===== */}
            <section id="problem" className="relative py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-xs font-medium text-red-400 uppercase tracking-wider">The Problem</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">Millions of usable items</span><br />
                            <span className="text-neutral-500">end up in landfills</span>
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8">Surplus food from restaurants, unused books from students, functional electronics from households — all discarded despite retaining real value.</p>

                        <div className="space-y-5">
                            {[
                                { icon: Scissors, title: 'Fragmented Channels', desc: 'No centralised system exists. Donors can\'t find recipients; recipients can\'t find donors.' },
                                { icon: EyeOff, title: 'Zero Transparency', desc: 'Donors never know if their items reached the intended recipients, killing trust and repeat engagement.' },
                                { icon: Trash2, title: 'Environmental Cost', desc: 'Landfill accumulation, resource depletion, and increased carbon emissions from avoidable waste.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <item.icon className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                        <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Card padding="p-8 md:p-10" className="relative overflow-hidden">
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { val: '1.3B', label: 'Tonnes of food wasted globally each year' },
                                { val: '92M', label: 'Tonnes of textile waste generated annually' },
                                { val: '50M', label: 'Tonnes of e-waste produced per year' },
                                { val: '73%', label: 'Of donated items never get tracked', highlight: true },
                            ].map((s, i) => (
                                <div key={i} className={`bg-white/[0.03] rounded-2xl p-6 border border-white/5 text-center ${s.highlight ? 'relative overflow-hidden' : ''}`}>
                                    {s.highlight && <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent" />}
                                    <div className={`text-4xl md:text-5xl font-bold mb-2 ${s.highlight ? 'relative z-10 text-brand' : 'text-red-400'}`}>{s.val}</div>
                                    <div className={`text-xs leading-relaxed ${s.highlight ? 'relative z-10 text-neutral-500' : 'text-neutral-500'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section id="features" className="relative py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6">
                            <Star className="w-3.5 h-3.5 text-brand" />
                            <span className="text-xs font-medium text-brand uppercase tracking-wider">Platform Features</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-5">
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">Everything needed to</span><br />
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">redistribute </span>
                            <em className="font-normal font-serif text-brand">smartly</em>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f, i) => (
                            <Card key={i} padding="p-7" hover>
                                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-5">
                                    <f.icon className="w-6 h-6 text-brand" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">{f.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section id="how-it-works" className="relative py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6">
                            <GitBranch className="w-3.5 h-3.5 text-brand" />
                            <span className="text-xs font-medium text-brand uppercase tracking-wider">How It Works</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-5">
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">From surplus to</span><br />
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">impact in </span>
                            <em className="font-normal font-serif text-brand">four steps</em>
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-12">A seamless flow designed for both donors and recipients, with full visibility at every stage.</p>

                        <div className="space-y-8">
                            {[
                                { num: 1, title: 'Register & Verify', desc: 'Sign up as a Donor or NGO. Organisations go through a verification process to ensure legitimacy.' },
                                { num: 2, title: 'List Your Donation', desc: 'Add item details — category, condition, quantity, pickup location, and photos.' },
                                { num: 3, title: 'NGO Requests & Coordinates', desc: 'Verified NGOs browse listings, submit requests, and coordinate pickup logistics directly with the donor.' },
                                { num: 4, title: 'Track & Confirm Delivery', desc: 'Both parties update the donation status in real time. Donors receive confirmation that their items reached the recipients.' },
                            ].map((step, i) => (
                                <div key={i} className="flex gap-5">
                                    <div className="relative">
                                        <div className={`w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0 z-10 shadow-lg ${i === 0 ? 'shadow-brand/30' : i === 1 ? 'shadow-brand/20' : i === 2 ? 'shadow-brand/15' : 'shadow-brand/10'}`}>
                                            <span className="text-xs font-bold text-white">{step.num}</span>
                                        </div>
                                        {i < 3 && <div className="absolute left-[15px] top-9 bottom-[-16px] w-0.5 bg-gradient-to-b from-brand/30 to-transparent" />}
                                    </div>
                                    <div className="pb-2">
                                        <h4 className="text-white font-medium mb-1">{step.title}</h4>
                                        <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mock Dashboard Card */}
                    <Card padding="p-6 md:p-8" className="sticky top-28">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                            <span className="ml-3 text-xs text-neutral-600 font-medium">DonateSmart — Donor Dashboard</span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Shirt, title: 'Winter Clothing Bundle', cat: 'Clothing', qty: '12 items', city: 'Central London', date: '12 Jan 2025', org: 'Helping Hands NGO', status: 'Delivered', statusColor: 'green', pct: 100 },
                                { icon: BookOpen, title: 'University Textbooks', cat: 'Books', qty: '8 items', city: 'Manchester', date: '18 Jan 2025', org: 'EduReach Foundation', status: 'In Transit', statusColor: 'yellow', pct: 75 },
                                { icon: Apple, title: 'Surplus Restaurant Food', cat: 'Food', qty: '15 meals', city: 'Birmingham', date: '20 Jan 2025', org: 'City Food Bank', status: 'Requested', statusColor: 'blue', pct: 25 },
                            ].map((d, i) => (
                                <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg ${d.statusColor === 'green' ? 'bg-green-500/10' : d.statusColor === 'yellow' ? 'bg-yellow-500/10' : 'bg-blue-500/10'} flex items-center justify-center`}>
                                                <d.icon className={`w-5 h-5 ${d.statusColor === 'green' ? 'text-green-400' : d.statusColor === 'yellow' ? 'text-yellow-400' : 'text-blue-400'}`} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{d.title}</div>
                                                <div className="text-xs text-neutral-500">{d.cat} • {d.qty}</div>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium bg-${d.statusColor}-500/15 text-${d.statusColor}-400`}>{d.status}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-neutral-600">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{d.city}</span>
                                        <span>{d.date}</span>
                                        <span>{d.org}</span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                            <div className={`h-full rounded-full bg-${d.statusColor}-500`} style={{ width: `${d.pct}%` }} />
                                        </div>
                                        <span className={`text-[10px] font-medium text-${d.statusColor}-400`}>{d.pct}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mini chart */}
                        <div className="mt-6 pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-medium text-neutral-400">Monthly Donations</span>
                                <span className="text-xs text-brand font-medium">+34%</span>
                            </div>
                            <div className="flex items-end gap-2 h-16">
                                {[30, 45, 35, 60, 50, 70, 65, 80, 75, 90, 85, 100].map((h, i) => (
                                    <div key={i} className="flex-1 bg-brand/20 rounded-sm" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* ===== CATEGORIES ===== */}
            <section id="categories" className="relative py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6">
                            <LayoutGrid className="w-3.5 h-3.5 text-brand" />
                            <span className="text-xs font-medium text-brand uppercase tracking-wider">Categories</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-5">
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">One platform for</span><br />
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">every type of </span>
                            <em className="font-normal font-serif text-brand">donation</em>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {categories.map((cat, i) => (
                            <Card key={i} padding="p-8" hover className="group cursor-pointer">
                                <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-400`}>
                                    <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">{cat.label}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed mb-5">{cat.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {cat.tags.map((tag, j) => (
                                        <span key={j} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-neutral-500">{tag}</span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRANSPARENCY ===== */}
            <section id="tracking" className="relative py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <Card padding="p-8 md:p-10" className="order-2 lg:order-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-brand/20 flex items-center justify-center"><ScanEye className="w-4 h-4 text-brand" /></div>
                            <div>
                                <div className="text-sm font-medium text-white">Donation ID: DS-2025-00847</div>
                                <div className="text-xs text-neutral-500">Winter Clothing Bundle — 12 items</div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: true, title: 'Listed', date: '10 Jan 2025, 14:23', who: 'Donor: Sarah M.', note: 'Item posted with photos and condition details' },
                                { icon: true, title: 'Requested', date: '11 Jan 2025, 09:15', who: 'NGO: Helping Hands', note: 'Verified NGO submitted collection request' },
                                { icon: true, title: 'Collected', date: '12 Jan 2025, 16:40', who: 'Pickup confirmed', note: 'Items collected from donor\'s location' },
                                { icon: false, title: 'Delivered ✓', date: '12 Jan 2025, 18:10', who: 'Received by beneficiaries', note: '12 items distributed to 8 families in South London', active: true },
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="relative">
                                        <div className={`w-8 h-8 rounded-full ${step.active ? 'bg-brand animate-pulse' : 'bg-brand'} flex items-center justify-center shrink-0 shadow-lg shadow-brand/20`}>
                                            <span className="text-xs font-bold text-white">✓</span>
                                        </div>
                                        {i < 3 && <div className="absolute left-[15px] top-9 bottom-[-16px] w-0.5 bg-brand/30" />}
                                    </div>
                                    <div className="pb-4">
                                        <div className={`text-sm font-medium ${step.active ? 'text-brand' : 'text-white'} mb-1`}>{step.title}</div>
                                        <div className="text-xs text-neutral-500">{step.date} • {step.who}</div>
                                        <div className="text-xs text-neutral-600 mt-1">{step.note}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2"><Leaf className="w-4 h-4 text-brand" /><span className="text-xs text-neutral-400">Environmental impact saved</span></div>
                            <div className="flex gap-3">
                                <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">4.2 kg CO₂</span>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">0.8 kg landfill</span>
                            </div>
                        </div>
                    </Card>

                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6">
                            <ScanEye className="w-3.5 h-3.5 text-brand" />
                            <span className="text-xs font-medium text-brand uppercase tracking-wider">Transparency</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">Every donation tells</span><br />
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">its </span>
                            <em className="font-normal font-serif text-brand">full story</em>
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8">The #1 reason people don't donate more? They don't trust that their items actually reach people in need.</p>

                        <div className="space-y-5">
                            {[
                                { icon: Clock, title: 'Real-Time Status', desc: 'From listing to delivery — every status change is timestamped and visible to both parties.' },
                                { icon: Fingerprint, title: 'Verified Recipients', desc: 'Only verified NGOs can request donations. Beneficiaries are confirmed before distribution.' },
                                { icon: Leaf, title: 'Impact Metrics', desc: 'See the environmental impact of every donation — CO₂ saved, landfill waste prevented, resources reused.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-brand" /></div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                        <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="relative py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6">
                            <MessageCircle className="w-3.5 h-3.5 text-brand" />
                            <span className="text-xs font-medium text-brand uppercase tracking-wider">Voices</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">What stakeholders </span>
                            <em className="font-normal font-serif text-brand">say</em>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        {testimonials.map((t, i) => (
                            <Card key={i} padding="p-7" className={i === 1 ? 'border-brand/20' : ''}>
                                <div className="flex items-center gap-1 mb-5">
                                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className="text-sm text-neutral-400 leading-relaxed mb-6">"{t.text}"</p>
                                <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                                    <img src={t.avatar} alt={t.name} className={`w-10 h-10 rounded-full object-cover ${i === 1 ? 'ring-2 ring-brand p-0.5' : ''}`} />
                                    <div>
                                        <div className="text-sm font-medium text-white">{t.name}</div>
                                        <div className="text-xs text-neutral-500">{t.role}</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section id="faq" className="relative py-24 md:py-32 px-6 border-t border-white/[0.05]">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6">
                            <ChevronDown className="w-3.5 h-3.5 text-brand" />
                            <span className="text-xs font-medium text-brand uppercase tracking-wider">FAQ</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
                            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">Frequently asked </span>
                            <em className="font-normal font-serif text-brand">questions</em>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <Card key={i} padding="p-0" className="overflow-hidden">
                                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer bg-transparent border-none">
                                    <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-400 ${openFaq === i ? 'max-h-[300px] px-5 pb-5' : 'max-h-0'}`}>
                                    <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="relative py-24 md:py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <Card padding="p-10 md:p-16" className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand/5 pointer-events-none" />
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-brand/20 border border-brand/30 flex items-center justify-center mx-auto mb-8 animate-[float_5s_ease-in-out_infinite]">
                                <HeartHandshake className="w-8 h-8 text-brand" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-5">
                                <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">Ready to make your</span><br />
                                <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">surplus count?</span>
                            </h2>
                            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">Join a growing community of donors and NGOs who are turning waste into impact.</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/register"><Button icon={PackagePlus} className="text-base px-8 py-4 shadow-[0_0_20px_rgba(94,165,0,0.3)]">Register as Donor</Button></Link>
                                <Link to="/register"><Button variant="secondary" icon={Building2} className="text-base px-8 py-4">Register as NGO</Button></Link>
                            </div>
                            <p className="text-xs text-neutral-600 mt-6">Free forever • No credit card required • GDPR compliant</p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="border-t border-white/[0.05] py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        <div>
                            <a href="#" className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center"><HeartHandshake className="w-4 h-4 text-white" /></div>
                                <span className="text-lg font-semibold text-white">Donate<span className="text-brand">Smart</span></span>
                            </a>
                            <p className="text-sm text-neutral-500 leading-relaxed mb-4">Bridging the gap between surplus and need through transparent, efficient digital redistribution.</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-white mb-4">Platform</h4>
                            <ul className="space-y-3">
                                {['Features', 'How It Works', 'Categories', 'Transparency'].map(l => <li key={l}><a href={`#${l.toLowerCase().replace(' ', '-')}`} className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">{l}</a></li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-white mb-4">Resources</h4>
                            <ul className="space-y-3">
                                {['Documentation', 'API Reference', 'FAQ', 'Research Paper'].map(l => <li key={l}><a href="#" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">{l}</a></li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-white mb-4">Legal</h4>
                            <ul className="space-y-3">
                                {['Privacy Policy', 'Terms of Service', 'GDPR Compliance', 'Cookie Policy'].map(l => <li key={l}><a href="#" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">{l}</a></li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-neutral-600">© 2025 DonateSmart. All rights reserved.</p>
                        <div className="flex items-center gap-2 text-xs text-neutral-600">
                            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                            <span>Platform in development</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing