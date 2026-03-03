/**
 * Generate a unique ID (simple UUID-like)
 */
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

/**
 * Format a date string to a human-readable format
 */
export const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (dateString) => {
    if (!dateString) return ''
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return formatDate(dateString)
}

/**
 * Group tasks by status for Kanban columns
 */
export const groupTasksByStatus = (tasks, columnOrder) => {
    const grouped = {}
    columnOrder.forEach((status) => {
        grouped[status] = []
    })
    tasks.forEach((task) => {
        if (grouped[task.status]) {
            grouped[task.status].push(task)
        }
    })
    return grouped
}

/**
 * Truncate text to a max length
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}
