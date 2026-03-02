import React from 'react'

const Button = ({ children, onClick, className, disabled = false }) => {
  return (
    <button className={`bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 border border-gray-500 ${className}`} onClick={onClick} disabled={disabled} >
        {children}
    </button>
  )
}

export default Button