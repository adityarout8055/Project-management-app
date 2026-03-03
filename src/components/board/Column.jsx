import { useState } from 'react'
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS } from '../../utils/constants'
import TaskCard from './TaskCard'

const Column = ({ status, tasks, onSelectTask, onDropTask, onDragStart }) => {
    const [isDragOver, setIsDragOver] = useState(false)
    const colors = TASK_STATUS_COLORS[status]

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)
        const taskId = e.dataTransfer.getData('taskId')
        if (taskId) {
            onDropTask(taskId, status)
        }
    }

    return (
        <div className='flex flex-col min-w-[280px] w-[280px]'>
            {/* Column header */}
            <div className='flex items-center gap-2 mb-3 px-1'>
                <div className={`w-2.5 h-2.5 rounded-full ${colors?.dot || 'bg-gray-400'}`} />
                <h3 className='text-sm font-semibold text-gray-700'>
                    {TASK_STATUS_LABELS[status]}
                </h3>
                <span className='text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full'>
                    {tasks.length}
                </span>
            </div>

            {/* Droppable area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    flex-1 rounded-xl p-2 space-y-2 min-h-[200px]
                    transition-colors duration-200
                    ${isDragOver
                        ? 'bg-blue-50 border-2 border-dashed border-blue-300'
                        : 'bg-gray-50/50 border-2 border-dashed border-transparent'
                    }
                `}
            >
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onSelect={onSelectTask}
                        onDragStart={onDragStart}
                    />
                ))}

                {tasks.length === 0 && !isDragOver && (
                    <div className='flex items-center justify-center h-24 text-gray-400 text-sm'>
                        No tasks
                    </div>
                )}
            </div>
        </div>
    )
}

export default Column
