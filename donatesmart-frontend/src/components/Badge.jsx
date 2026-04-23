export default function Badge({ children, variant = 'default' }) {
    const variants = {
        default: "bg-white/[0.05] text-neutral-400",
        brand: "bg-brand/10 text-brand",
        green: "bg-green-500/10 text-green-400",
        blue: "bg-blue-500/10 text-blue-400",
        yellow: "bg-yellow-500/10 text-yellow-400",
        red: "bg-red-500/10 text-red-400",
        purple: "bg-purple-500/10 text-purple-400",
    }

    return (
        <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium ${variants[variant]}`}>
            {children}
        </span>
    )
}