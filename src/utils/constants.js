// Task statuses used as Kanban columns
export const TASK_STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    IN_REVIEW: 'in_review',
    DONE: 'done',
}

export const TASK_STATUS_LABELS = {
    [TASK_STATUS.TODO]: 'To Do',
    [TASK_STATUS.IN_PROGRESS]: 'In Progress',
    [TASK_STATUS.IN_REVIEW]: 'In Review',
    [TASK_STATUS.DONE]: 'Done',
}

export const TASK_STATUS_COLORS = {
    [TASK_STATUS.TODO]: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', dot: 'bg-gray-400' },
    [TASK_STATUS.IN_PROGRESS]: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300', dot: 'bg-blue-500' },
    [TASK_STATUS.IN_REVIEW]: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', dot: 'bg-amber-500' },
    [TASK_STATUS.DONE]: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300', dot: 'bg-emerald-500' },
}

export const TASK_PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
}

export const TASK_PRIORITY_LABELS = {
    [TASK_PRIORITY.LOW]: 'Low',
    [TASK_PRIORITY.MEDIUM]: 'Medium',
    [TASK_PRIORITY.HIGH]: 'High',
    [TASK_PRIORITY.URGENT]: 'Urgent',
}

export const TASK_PRIORITY_COLORS = {
    [TASK_PRIORITY.LOW]: { bg: 'bg-slate-100', text: 'text-slate-600' },
    [TASK_PRIORITY.MEDIUM]: { bg: 'bg-sky-100', text: 'text-sky-700' },
    [TASK_PRIORITY.HIGH]: { bg: 'bg-orange-100', text: 'text-orange-700' },
    [TASK_PRIORITY.URGENT]: { bg: 'bg-red-100', text: 'text-red-700' },
}

// Column ordering
export const COLUMN_ORDER = [
    TASK_STATUS.TODO,
    TASK_STATUS.IN_PROGRESS,
    TASK_STATUS.IN_REVIEW,
    TASK_STATUS.DONE,
]
