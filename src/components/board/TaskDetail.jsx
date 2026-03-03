import {
    TASK_PRIORITY_COLORS,
    TASK_PRIORITY_LABELS,
    TASK_STATUS_COLORS,
    TASK_STATUS_LABELS,
} from '../../utils/constants'
import { formatDate } from '../../utils/helpers'
import Button from '../ui/Button'

const TaskDetail = ({ task, onEdit, onDelete, onClose }) => {
    if (!task) return null

    const priorityColor = TASK_PRIORITY_COLORS[task.priority]
    const statusColor = TASK_STATUS_COLORS[task.status]

    return (
        <div className='space-y-5'>
            {/* Status + Priority */}
            <div className='flex items-center gap-2'>
                <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColor?.bg} ${statusColor?.text}`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor?.dot}`} />
                    {TASK_STATUS_LABELS[task.status]}
                </span>
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${priorityColor?.bg} ${priorityColor?.text}`}
                >
                    {TASK_PRIORITY_LABELS[task.priority]}
                </span>
            </div>

            {/* Title */}
            <h3 className='text-xl font-semibold text-gray-900'>{task.title}</h3>

            {/* Description */}
            {task.description && (
                <div>
                    <h4 className='text-sm font-medium text-gray-500 mb-1'>Description</h4>
                    <p className='text-sm text-gray-700 leading-relaxed'>{task.description}</p>
                </div>
            )}

            {/* Meta info */}
            <div className='grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4'>
                <div>
                    <span className='text-xs text-gray-500 block'>Assignee</span>
                    <span className='text-sm font-medium text-gray-900'>{task.assignee || '—'}</span>
                </div>
                <div>
                    <span className='text-xs text-gray-500 block'>Due Date</span>
                    <span className='text-sm font-medium text-gray-900'>
                        {task.dueDate ? formatDate(task.dueDate) : '—'}
                    </span>
                </div>
                <div>
                    <span className='text-xs text-gray-500 block'>Created</span>
                    <span className='text-sm font-medium text-gray-900'>{formatDate(task.createdAt)}</span>
                </div>
                <div>
                    <span className='text-xs text-gray-500 block'>Updated</span>
                    <span className='text-sm font-medium text-gray-900'>{formatDate(task.updatedAt)}</span>
                </div>
            </div>

            {/* Actions */}
            <div className='flex justify-end gap-3 pt-2 border-t border-gray-100'>
                <Button variant='danger' size='sm' onClick={() => onDelete(task.id)}>
                    Delete
                </Button>
                <Button variant='secondary' size='sm' onClick={() => onEdit(task)}>
                    Edit
                </Button>
            </div>
        </div>
    )
}

export default TaskDetail
