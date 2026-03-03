import { useMemo, useState } from 'react'
import { COLUMN_ORDER } from '../utils/constants'
import { groupTasksByStatus } from '../utils/helpers'
import { useDebounce } from './useDebounce'

/**
 * useFilter — compute a filtered and grouped task list.
 * Accepts the raw task array and returns filtered results + filter state setters.
 */
export function useFilter(tasks) {
    const [searchQuery, setSearchQuery] = useState('')
    const [priorityFilter, setPriorityFilter] = useState('')
    const [projectFilter, setProjectFilter] = useState('')

    const debouncedSearch = useDebounce(searchQuery, 300)

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                !debouncedSearch ||
                task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                task.description?.toLowerCase().includes(debouncedSearch.toLowerCase())

            const matchesPriority = !priorityFilter || task.priority === priorityFilter
            const matchesProject = !projectFilter || task.projectId === projectFilter

            return matchesSearch && matchesPriority && matchesProject
        })
    }, [tasks, debouncedSearch, priorityFilter, projectFilter])

    const groupedTasks = useMemo(() => {
        return groupTasksByStatus(filteredTasks, COLUMN_ORDER)
    }, [filteredTasks])

    const clearFilters = () => {
        setSearchQuery('')
        setPriorityFilter('')
        setProjectFilter('')
    }

    const hasActiveFilters = !!(debouncedSearch || priorityFilter || projectFilter)

    return {
        searchQuery,
        setSearchQuery,
        priorityFilter,
        setPriorityFilter,
        projectFilter,
        setProjectFilter,
        filteredTasks,
        groupedTasks,
        clearFilters,
        hasActiveFilters,
    }
}
