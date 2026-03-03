import {
    closestCorners,
    DndContext,
    DragOverlay,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { useState } from 'react'
import { COLUMN_ORDER } from '../../utils/constants'
import Spinner from '../ui/Spinner'
import Column from './Column'
import TaskCard from './TaskCard'

const Board = ({ groupedTasks, loading, onSelectTask, onDropTask, allTasks }) => {
    const [activeTask, setActiveTask] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 200, tolerance: 5 },
        })
    )

    if (loading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <Spinner size='lg' />
            </div>
        )
    }

    const handleDragStart = (event) => {
        const { active } = event
        const task = allTasks.find((t) => t.id === active.id)
        if (task) setActiveTask(task)
    }

    const handleDragOver = (event) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        // Determine which column we're over
        const overData = over.data?.current
        let targetStatus = null

        if (overData?.type === 'column') {
            // Dropped directly on a column
            targetStatus = overData.status
        } else if (overData?.type === 'task') {
            // Dropped on a task — find which column that task is in
            targetStatus = overData.task.status
        }

        if (!targetStatus) return

        // Find current task
        const activeTask = allTasks.find((t) => t.id === activeId)
        if (!activeTask || activeTask.status === targetStatus) return

        // Move task to new column
        onDropTask(activeId, targetStatus)
    }

    const handleDragEnd = (event) => {
        setActiveTask(null)

        const { active, over } = event
        if (!over) return

        const overData = over.data?.current
        let targetStatus = null

        if (overData?.type === 'column') {
            targetStatus = overData.status
        } else if (overData?.type === 'task') {
            targetStatus = overData.task.status
        }

        if (!targetStatus) return

        const task = allTasks.find((t) => t.id === active.id)
        if (task && task.status !== targetStatus) {
            onDropTask(active.id, targetStatus)
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className='flex gap-4 overflow-x-auto pb-4'>
                {COLUMN_ORDER.map((status) => (
                    <Column
                        key={status}
                        status={status}
                        tasks={groupedTasks[status] || []}
                        onSelectTask={onSelectTask}
                    />
                ))}
            </div>

            {/* Drag overlay — floats above everything while dragging */}
            <DragOverlay>
                {activeTask ? (
                    <div className='rotate-3 opacity-90'>
                        <TaskCard task={activeTask} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

export default Board
