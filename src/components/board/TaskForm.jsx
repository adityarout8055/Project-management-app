import { useState } from 'react'
import {
    TASK_PRIORITY,
    TASK_PRIORITY_LABELS,
    TASK_STATUS,
    TASK_STATUS_LABELS,
} from '../../utils/constants'
import Button from '../ui/Button'
import Input from '../ui/Input'

const TaskForm = ({ onSubmit, onCancel, initialData = null, projects = [] }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        priority: initialData?.priority || TASK_PRIORITY.MEDIUM,
        status: initialData?.status || TASK_STATUS.TODO,
        assignee: initialData?.assignee || '',
        projectId: initialData?.projectId || '',
        dueDate: initialData?.dueDate || '',
    })

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title.trim()) return
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
                label='Title'
                id='task-title'
                value={formData.title}
                onChange={handleChange('title')}
                placeholder='Enter task title'
                required
            />

            <div>
                <label htmlFor='task-description' className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                </label>
                <textarea
                    id='task-description'
                    value={formData.description}
                    onChange={handleChange('description')}
                    placeholder='Describe the task...'
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none'
                />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label htmlFor='task-priority' className='block text-sm font-medium text-gray-700 mb-1'>
                        Priority
                    </label>
                    <select
                        id='task-priority'
                        value={formData.priority}
                        onChange={handleChange('priority')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900'
                    >
                        {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor='task-status' className='block text-sm font-medium text-gray-700 mb-1'>
                        Status
                    </label>
                    <select
                        id='task-status'
                        value={formData.status}
                        onChange={handleChange('status')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900'
                    >
                        {Object.entries(TASK_STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <Input
                    label='Assignee'
                    id='task-assignee'
                    value={formData.assignee}
                    onChange={handleChange('assignee')}
                    placeholder='Assign to...'
                />

                <Input
                    label='Due Date'
                    id='task-due-date'
                    type='date'
                    value={formData.dueDate}
                    onChange={handleChange('dueDate')}
                />
            </div>

            {projects.length > 0 && (
                <div>
                    <label htmlFor='task-project' className='block text-sm font-medium text-gray-700 mb-1'>
                        Project
                    </label>
                    <select
                        id='task-project'
                        value={formData.projectId}
                        onChange={handleChange('projectId')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900'
                    >
                        <option value=''>No project</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className='flex justify-end gap-3 pt-2'>
                <Button variant='secondary' onClick={onCancel}>
                    Cancel
                </Button>
                <Button type='submit'>
                    {initialData ? 'Update Task' : 'Create Task'}
                </Button>
            </div>
        </form>
    )
}

export default TaskForm
