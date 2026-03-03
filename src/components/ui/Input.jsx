
const Input = ({
    label,
    id,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    required = false,
    className = '',
    error,
    ...props
}) => {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`
                    w-full px-3 py-2 border rounded-lg text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                    transition-colors duration-150
                    ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
                `}
                {...props}
            />
            {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
        </div>
    )
}

export default Input
