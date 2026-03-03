import { useState } from 'react'
import Board from '../components/board/Board'
import TaskDetail from '../components/board/TaskDetail'
import TaskForm from '../components/board/TaskForm'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { useFilter } from '../hooks/useFilter'
import { useTasks } from '../hooks/useTasks'
import { TASK_PRIORITY_LABELS } from '../utils/constants'

const BoardPage = () => {
    const {
        tasks,
        loading,
        selectedTask,
        addTask,
        editTask,
        removeTask,
        changeStatus,
        selectTask,
        deselectTask,
    } = useTasks()

    const {
        searchQuery,
        setSearchQuery,
        priorityFilter,
        setPriorityFilter,
        groupedTasks,
        clearFilters,
        hasActiveFilters,
    } = useFilter(tasks)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    // ─── Handlers ────────────────────────────────────────
    const handleSelectTask = (task) => {
        selectTask(task)
        setShowDetailModal(true)
    }

    const handleDropTask = (taskId, newStatus) => {
        changeStatus(taskId, newStatus)
    }

    const handleCreateTask = (formData) => {
        addTask(formData)
        setShowCreateModal(false)
    }

    const handleEditTask = (task) => {
        setShowDetailModal(false)
        selectTask(task)
        setShowEditModal(true)
    }

    const handleUpdateTask = (formData) => {
        editTask(selectedTask.id, formData)
        setShowEditModal(false)
        deselectTask()
    }

    const handleDeleteTask = (id) => {
        removeTask(id)
        setShowDetailModal(false)
        deselectTask()
    }

    const handleCloseDetail = () => {
        setShowDetailModal(false)
        deselectTask()
    }

    return (
        <div>
            {/* Header */}
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Board</h1>
                    <p className='text-gray-500 text-sm mt-0.5'>
                        Drag and drop tasks between columns to update status
                    </p>
                </div>
                <Button onClick={() => setShowCreateModal(true)}>
                    + New Task
                </Button>
            </div>

            {/* Filters */}
            <div className='flex items-center gap-3 mb-5'>
                <div className='relative flex-1 max-w-xs'>
                    <svg
                        className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                    </svg>
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search tasks...'
                        className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900'
                    />
                </div>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className='px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900'
                >
                    <option value=''>All Priorities</option>
                    {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>

                {hasActiveFilters && (
                    <Button variant='ghost' size='sm' onClick={clearFilters}>
                        Clear filters
                    </Button>
                )}
            </div>

            {/* Board */}
            <Board
                groupedTasks={groupedTasks}
                loading={loading}
                onSelectTask={handleSelectTask}
                onDropTask={handleDropTask}
            />

            {/* Create Modal */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title='Create New Task'
            >
                <TaskForm
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowCreateModal(false)}
                />
            </Modal>

            {/* Detail Modal */}
            <Modal
                isOpen={showDetailModal}
                onClose={handleCloseDetail}
                title='Task Details'
            >
                <TaskDetail
                    task={selectedTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onClose={handleCloseDetail}
                />
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title='Edit Task'
            >
                <TaskForm
                    initialData={selectedTask}
                    onSubmit={handleUpdateTask}
                    onCancel={() => setShowEditModal(false)}
                />
            </Modal>
        </div>
    )
}

export default BoardPage
