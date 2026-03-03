const Skeleton = ({ className = '', lines = 1 }) => {
    return (
        <div className='animate-pulse space-y-2'>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={`bg-gray-200 rounded ${className}`}
                    style={{
                        width: i === lines - 1 && lines > 1 ? '75%' : '100%',
                        height: className.includes('h-') ? undefined : '16px',
                    }}
                />
            ))}
        </div>
    )
}

export default Skeleton
