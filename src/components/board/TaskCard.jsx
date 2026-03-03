import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { memo } from 'react'
import { TASK_PRIORITY_COLORS, TASK_PRIORITY_LABELS } from '../../utils/constants'
import { formatDate } from '../../utils/helpers'

const TaskCard = memo(({ task, onSelect }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'task',
            task,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const priorityColor = TASK_PRIORITY_COLORS[task.priority]

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className='
                    bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-3.5
                    opacity-50 min-h-[80px]
                '
            />
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onSelect?.(task)}
            className='
                bg-white border border-gray-200 rounded-lg p-3.5 cursor-grab
                hover:shadow-md hover:border-gray-300
                transition-shadow duration-150
                active:cursor-grabbing active:shadow-lg
                touch-none
            '
        >
            {/* Priority badge */}
            <div className='flex items-center justify-between mb-2'>
                <span
                    className={`
                        inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                        ${priorityColor?.bg || 'bg-gray-100'} ${priorityColor?.text || 'text-gray-700'}
                    `}
                >
                    {TASK_PRIORITY_LABELS[task.priority]}
                </span>
                {task.dueDate && (
                    <span className='text-xs text-gray-400'>{formatDate(task.dueDate)}</span>
                )}
            </div>

            {/* Title */}
            <h4 className='text-sm font-medium text-gray-900 mb-1 line-clamp-2'>
                {task.title}
            </h4>

            {/* Description preview */}
            {task.description && (
                <p className='text-xs text-gray-500 mb-3 line-clamp-2'>
                    {task.description}
                </p>
            )}

            {/* Footer */}
            <div className='flex items-center justify-between'>
                {task.assignee && (
                    <div className='flex items-center gap-1.5'>
                        <div className='w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center'>
                            <span className='text-[10px] font-medium text-gray-600'>
                                {task.assignee.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <span className='text-xs text-gray-500'>{task.assignee}</span>
                    </div>
                )}
            </div>
        </div>
    )
})

TaskCard.displayName = 'TaskCard'

export default TaskCard
