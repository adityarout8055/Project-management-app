import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS } from '../../utils/constants'
import TaskCard from './TaskCard'

const Column = ({ status, tasks, onSelectTask }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `column-${status}`,
        data: {
            type: 'column',
            status,
        },
    })

    const colors = TASK_STATUS_COLORS[status]
    const taskIds = tasks.map((t) => t.id)

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

            {/* Droppable + sortable area */}
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                <div
                    ref={setNodeRef}
                    className={`
                        flex-1 rounded-xl p-2 space-y-2 min-h-[200px]
                        transition-colors duration-200
                        ${isOver
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
                        />
                    ))}

                    {tasks.length === 0 && !isOver && (
                        <div className='flex items-center justify-center h-24 text-gray-400 text-sm'>
                            No tasks
                        </div>
                    )}
                </div>
            </SortableContext>
        </div>
    )
}

export default Column
