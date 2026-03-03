import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    clearSelectedTask,
    createTask,
    deleteTask,
    fetchTasks,
    moveTask,
    reorderTasks as reorderTasksAction,
    selectAllTasks,
    selectSelectedTask,
    selectTasksError,
    selectTasksLoading,
    setSelectedTask,
    updateTask,
} from '../store/taskSlice'

/**
 * useTasks — bridge between components and the tasks Redux store.
 * Handles loading from the service layer on mount.
 */
export function useTasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(selectAllTasks)
    const loading = useSelector(selectTasksLoading)
    const error = useSelector(selectTasksError)
    const selectedTask = useSelector(selectSelectedTask)

    // Load tasks on first mount
    useEffect(() => {
        if (tasks.length === 0 && !loading) {
            dispatch(fetchTasks())
        }
    }, [dispatch, tasks.length, loading])

    const addTask = useCallback(
        (taskData) => dispatch(createTask(taskData)),
        [dispatch]
    )

    const editTask = useCallback(
        (id, updates) => dispatch(updateTask({ id, updates })),
        [dispatch]
    )

    const removeTask = useCallback(
        (id) => dispatch(deleteTask(id)),
        [dispatch]
    )

    const changeStatus = useCallback(
        (id, newStatus) => dispatch(moveTask({ id, newStatus })),
        [dispatch]
    )

    const selectTask = useCallback(
        (task) => dispatch(setSelectedTask(task)),
        [dispatch]
    )

    const deselectTask = useCallback(
        () => dispatch(clearSelectedTask()),
        [dispatch]
    )

    const reorderTasks = useCallback(
        (status, oldIndex, newIndex) =>
            dispatch(reorderTasksAction({ status, oldIndex, newIndex })),
        [dispatch]
    )

    return {
        tasks,
        loading,
        error,
        selectedTask,
        addTask,
        editTask,
        removeTask,
        changeStatus,
        selectTask,
        deselectTask,
        reorderTasks,
    }
}
