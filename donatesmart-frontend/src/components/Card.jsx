export default function Card({ children, className = '', padding = 'p-6', hover = false }) {
    return (
        <div className={`
            bg-white/[0.02] border border-white/[0.06] rounded-2xl
            ${padding}
            ${hover ? 'hover:border-brand/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(94,165,0,0.08)] transition-all duration-400' : ''}
            ${className}
        `}>
            {children}
        </div>
    )
}