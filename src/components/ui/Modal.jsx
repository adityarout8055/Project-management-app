import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Modal — portal-based overlay.
 * Closes on Escape key and backdrop click.
 */
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    const overlayRef = useRef(null)

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    const handleBackdropClick = (e) => {
        if (e.target === overlayRef.current) onClose()
    }

    if (!isOpen) return null

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    }

    return createPortal(
        <div
            ref={overlayRef}
            onClick={handleBackdropClick}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
        >
            <div
                className={`
                    bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size] || sizeClasses.md}
                    transform transition-all duration-200
                    animate-in fade-in zoom-in-95
                `}
            >
                {/* Header */}
                {title && (
                    <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
                        <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
                        <button
                            onClick={onClose}
                            className='text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>
                )}
                {/* Body */}
                <div className='px-6 py-4'>{children}</div>
            </div>
        </div>,
        document.body
    )
}

export default Modal
