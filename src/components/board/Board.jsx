import { COLUMN_ORDER } from '../../utils/constants'
import Spinner from '../ui/Spinner'
import Column from './Column'

const Board = ({ groupedTasks, loading, onSelectTask, onDropTask }) => {
    if (loading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <Spinner size='lg' />
            </div>
        )
    }

    return (
        <div className='flex gap-4 overflow-x-auto pb-4'>
            {COLUMN_ORDER.map((status) => (
                <Column
                    key={status}
                    status={status}
                    tasks={groupedTasks[status] || []}
                    onSelectTask={onSelectTask}
                    onDropTask={onDropTask}
                />
            ))}
        </div>
    )
}

export default Board
