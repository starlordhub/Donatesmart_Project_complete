export default function Button({ children, onClick, type = 'button', disabled, variant = 'primary', className = '', icon: Icon }) {
    const variants = {
        primary: "bg-brand text-white shadow-[0_0_20px_rgba(94,165,0,0.3)] hover:bg-brand-dark hover:shadow-[0_0_30px_rgba(94,165,0,0.5)] hover:-translate-y-0.5",
        secondary: "bg-white/[0.03] border border-white/[0.08] text-neutral-200 hover:bg-white/[0.06] hover:border-white/[0.15] hover:-translate-y-0.5",
        danger: "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20",
        success: "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:bg-green-600",
        blue: "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-blue-600",
        ghost: "bg-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.03]",
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium
                transition-all duration-300 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                ${variants[variant]}
                ${className}
            `}
        >
            {Icon && <Icon size={16} />}
            {children}
        </button>
    )
}