import { useEffect, useState } from 'react'

/**
 * useLocalStorage — persist and retrieve a value from localStorage.
 * Syncs React state with the stored value.
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch {
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue))
        } catch {
            // Storage full or unavailable — silently fail
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}
