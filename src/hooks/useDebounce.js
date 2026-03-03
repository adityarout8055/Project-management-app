import { useEffect, useState } from 'react'

/**
 * useDebounce — delay updating a value until after a specified wait time.
 * Useful for search inputs to avoid firing on every keystroke.
 */
export function useDebounce(value, delayMs = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delayMs)

        return () => clearTimeout(timer)
    }, [value, delayMs])

    return debouncedValue
}
