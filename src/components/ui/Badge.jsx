const Badge = ({ children, className = '', variant = 'default' }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-700',
        primary: 'bg-indigo-100 text-indigo-700',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-red-100 text-red-700',
    }

    return (
        <span
            className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${variants[variant] || variants.default}
                ${className}
            `}
        >
            {children}
        </span>
    )
}

export default Badge
