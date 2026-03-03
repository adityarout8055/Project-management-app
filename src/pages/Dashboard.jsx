import Spinner from '../components/ui/Spinner'
import { useTasks } from '../hooks/useTasks'
import {
    TASK_PRIORITY,
    TASK_PRIORITY_COLORS,
    TASK_PRIORITY_LABELS,
    TASK_STATUS,
    TASK_STATUS_COLORS,
    TASK_STATUS_LABELS,
} from '../utils/constants'

const Dashboard = () => {
    const { tasks, loading } = useTasks()

    if (loading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <Spinner size='lg' />
            </div>
        )
    }

    // Stats
    const totalTasks = tasks.length
    const statusCounts = {
        [TASK_STATUS.TODO]: tasks.filter((t) => t.status === TASK_STATUS.TODO).length,
        [TASK_STATUS.IN_PROGRESS]: tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length,
        [TASK_STATUS.IN_REVIEW]: tasks.filter((t) => t.status === TASK_STATUS.IN_REVIEW).length,
        [TASK_STATUS.DONE]: tasks.filter((t) => t.status === TASK_STATUS.DONE).length,
    }
    const urgentTasks = tasks.filter((t) => t.priority === TASK_PRIORITY.URGENT).length

    const completionRate = totalTasks > 0
        ? Math.round((statusCounts[TASK_STATUS.DONE] / totalTasks) * 100)
        : 0

    return (
        <div>
            <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
            <p className='text-gray-500 text-sm mt-0.5 mb-6'>
                Overview of your project progress
            </p>

            {/* Summary cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                <SummaryCard
                    label='Total Tasks'
                    value={totalTasks}
                    icon='📋'
                    color='bg-indigo-50 text-indigo-700'
                />
                <SummaryCard
                    label='In Progress'
                    value={statusCounts[TASK_STATUS.IN_PROGRESS]}
                    icon='🔄'
                    color='bg-blue-50 text-blue-700'
                />
                <SummaryCard
                    label='Completed'
                    value={`${completionRate}%`}
                    icon='✅'
                    color='bg-emerald-50 text-emerald-700'
                />
                <SummaryCard
                    label='Urgent'
                    value={urgentTasks}
                    icon='🔥'
                    color='bg-red-50 text-red-700'
                />
            </div>

            {/* Status breakdown */}
            <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>Status Breakdown</h2>
                <div className='space-y-3'>
                    {Object.entries(statusCounts).map(([status, count]) => {
                        const colors = TASK_STATUS_COLORS[status]
                        const percentage = totalTasks > 0 ? (count / totalTasks) * 100 : 0
                        return (
                            <div key={status} className='flex items-center gap-3'>
                                <div className='flex items-center gap-2 w-28'>
                                    <div className={`w-2.5 h-2.5 rounded-full ${colors?.dot}`} />
                                    <span className='text-sm text-gray-600'>
                                        {TASK_STATUS_LABELS[status]}
                                    </span>
                                </div>
                                <div className='flex-1 bg-gray-100 rounded-full h-2.5'>
                                    <div
                                        className={`h-2.5 rounded-full ${colors?.dot} transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className='text-sm font-medium text-gray-700 w-8 text-right'>
                                    {count}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Recent tasks */}
            <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>Recent Tasks</h2>
                <div className='divide-y divide-gray-100'>
                    {tasks.slice(0, 5).map((task) => {
                        const pColor = TASK_PRIORITY_COLORS[task.priority]
                        const sColor = TASK_STATUS_COLORS[task.status]
                        return (
                            <div key={task.id} className='flex items-center justify-between py-3'>
                                <div className='flex items-center gap-3'>
                                    <div className={`w-2 h-2 rounded-full ${sColor?.dot}`} />
                                    <span className='text-sm font-medium text-gray-900'>
                                        {task.title}
                                    </span>
                                </div>
                                <span
                                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${pColor?.bg} ${pColor?.text}`}
                                >
                                    {TASK_PRIORITY_LABELS[task.priority]}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// Small helper component
const SummaryCard = ({ label, value, icon, color }) => (
    <div className='bg-white border border-gray-200 rounded-xl p-5'>
        <div className='flex items-center justify-between mb-3'>
            <span className='text-sm text-gray-500'>{label}</span>
            <span className={`text-lg w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                {icon}
            </span>
        </div>
        <span className='text-2xl font-bold text-gray-900'>{value}</span>
    </div>
)

export default Dashboard
