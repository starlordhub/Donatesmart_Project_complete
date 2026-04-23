export default function Input({ icon: Icon, type = 'text', name, value, onChange, placeholder, required, maxLength, rows, rightIcon: RightIcon, onRightClick }) {
    const baseClasses = "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-neutral-200 outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_3px_rgba(94,165,0,0.1)] focus:bg-white/[0.04] placeholder:text-neutral-600"

    if (rows) {
        return (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                rows={rows}
                className={`${baseClasses} resize-vertical font-sans`}
            />
        )
    }

    return (
        <div className="relative">
            {Icon && (
                <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
            )}
                        <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                className={`${baseClasses} h-11 ${Icon ? 'pl-10' : 'pl-4'} ${RightIcon ? 'pr-11' : 'pr-4'}`}
            />
            {RightIcon && (
                <button
                    type="button"
                    onClick={onRightClick}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                    <RightIcon size={16} />
                </button>
            )}
        </div>
    )
}