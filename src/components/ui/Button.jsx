
const variants = {
  primary: 'bg-gray-900 hover:bg-gray-800 text-white',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const Button = ({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
                inline-flex items-center justify-center gap-2 font-medium rounded-lg
                transition-colors duration-150 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant] || variants.primary}
                ${sizes[size] || sizes.md}
                ${className}
            `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button