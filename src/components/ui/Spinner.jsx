const Spinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-10 h-10',
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`
                    ${sizes[size] || sizes.md}
                    border-2 border-gray-200 border-t-gray-900
                    rounded-full animate-spin
                `}
            />
        </div>
    )
}

export default Spinner
