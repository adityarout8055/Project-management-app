import { TASK_PRIORITY, TASK_STATUS } from '../utils/constants'
import { generateId } from '../utils/helpers'

/**
 * Mock Task Service
 * Simulates API calls with localStorage persistence.
 * Swap this file for a real API client later — the interface stays the same.
 */

const STORAGE_KEY = 'pm_tasks'
const PROJECTS_KEY = 'pm_projects'
const SIMULATE_DELAY = 300 // ms

// ─── Helpers ─────────────────────────────────────────────
const delay = (ms = SIMULATE_DELAY) => new Promise((resolve) => setTimeout(resolve, ms))

const getStoredTasks = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

const saveTasks = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

const getStoredProjects = () => {
    const data = localStorage.getItem(PROJECTS_KEY)
    return data ? JSON.parse(data) : []
}

const saveProjects = (projects) => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
}

// ─── Seed data (runs once if storage is empty) ───────────
const seedTasks = () => {
    const existing = getStoredTasks()
    if (existing.length > 0) return existing

    const now = new Date().toISOString()
    const seed = [
        {
            id: generateId(),
            title: 'Set up project repository',
            description: 'Initialize Git repo, configure ESLint, Prettier, and CI pipeline.',
            status: TASK_STATUS.DONE,
            priority: TASK_PRIORITY.HIGH,
            projectId: 'proj_1',
            assignee: 'John Doe',
            dueDate: '2026-03-05',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            title: 'Design database schema',
            description: 'Create ERD for users, projects, and tasks tables.',
            status: TASK_STATUS.IN_REVIEW,
            priority: TASK_PRIORITY.HIGH,
            projectId: 'proj_1',
            assignee: 'Jane Smith',
            dueDate: '2026-03-08',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            title: 'Implement authentication flow',
            description: 'Build login, register, and JWT token refresh endpoints.',
            status: TASK_STATUS.IN_PROGRESS,
            priority: TASK_PRIORITY.URGENT,
            projectId: 'proj_1',
            assignee: 'John Doe',
            dueDate: '2026-03-10',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            title: 'Create Kanban board UI',
            description: 'Build drag-and-drop board with columns for each status.',
            status: TASK_STATUS.IN_PROGRESS,
            priority: TASK_PRIORITY.MEDIUM,
            projectId: 'proj_1',
            assignee: 'Alice Lee',
            dueDate: '2026-03-12',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            title: 'Write API documentation',
            description: 'Document all REST endpoints with request/response examples.',
            status: TASK_STATUS.TODO,
            priority: TASK_PRIORITY.LOW,
            projectId: 'proj_2',
            assignee: 'Bob Chen',
            dueDate: '2026-03-15',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            title: 'Set up monitoring and alerts',
            description: 'Configure Datadog dashboards and PagerDuty alerts.',
            status: TASK_STATUS.TODO,
            priority: TASK_PRIORITY.MEDIUM,
            projectId: 'proj_2',
            assignee: 'Jane Smith',
            dueDate: '2026-03-18',
            createdAt: now,
            updatedAt: now,
        },
    ]

    saveTasks(seed)
    return seed
}

const seedProjects = () => {
    const existing = getStoredProjects()
    if (existing.length > 0) return existing

    const now = new Date().toISOString()
    const seed = [
        {
            id: 'proj_1',
            name: 'Website Redesign',
            description: 'Complete overhaul of the company website with modern UI/UX.',
            color: '#6366f1',
            createdAt: now,
        },
        {
            id: 'proj_2',
            name: 'Mobile App v2',
            description: 'Build the next version of our mobile application.',
            color: '#f59e0b',
            createdAt: now,
        },
        {
            id: 'proj_3',
            name: 'DevOps Pipeline',
            description: 'Automate CI/CD, monitoring, and infrastructure provisioning.',
            color: '#10b981',
            createdAt: now,
        },
    ]

    saveProjects(seed)
    return seed
}

// ─── Task API ────────────────────────────────────────────
export const taskService = {
    async fetchTasks() {
        await delay()
        const tasks = seedTasks()
        return tasks
    },

    async fetchTaskById(id) {
        await delay()
        const tasks = getStoredTasks()
        const task = tasks.find((t) => t.id === id)
        if (!task) throw new Error(`Task ${id} not found`)
        return task
    },

    async createTask(taskData) {
        await delay()
        const tasks = getStoredTasks()
        const now = new Date().toISOString()
        const newTask = {
            id: generateId(),
            status: TASK_STATUS.TODO,
            priority: TASK_PRIORITY.MEDIUM,
            assignee: '',
            dueDate: '',
            ...taskData,
            createdAt: now,
            updatedAt: now,
        }
        tasks.push(newTask)
        saveTasks(tasks)
        return newTask
    },

    async updateTask(id, updates) {
        await delay()
        const tasks = getStoredTasks()
        const index = tasks.findIndex((t) => t.id === id)
        if (index === -1) throw new Error(`Task ${id} not found`)
        tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() }
        saveTasks(tasks)
        return tasks[index]
    },

    async deleteTask(id) {
        await delay()
        let tasks = getStoredTasks()
        tasks = tasks.filter((t) => t.id !== id)
        saveTasks(tasks)
        return id
    },

    async moveTask(id, newStatus) {
        return this.updateTask(id, { status: newStatus })
    },
}

// ─── Project API ─────────────────────────────────────────
export const projectService = {
    async fetchProjects() {
        await delay()
        const projects = seedProjects()
        return projects
    },

    async fetchProjectById(id) {
        await delay()
        const projects = getStoredProjects()
        const project = projects.find((p) => p.id === id)
        if (!project) throw new Error(`Project ${id} not found`)
        return project
    },

    async createProject(projectData) {
        await delay()
        const projects = getStoredProjects()
        const now = new Date().toISOString()
        const newProject = {
            id: generateId(),
            color: '#6366f1',
            ...projectData,
            createdAt: now,
        }
        projects.push(newProject)
        saveProjects(projects)
        return newProject
    },

    async updateProject(id, updates) {
        await delay()
        const projects = getStoredProjects()
        const index = projects.findIndex((p) => p.id === id)
        if (index === -1) throw new Error(`Project ${id} not found`)
        projects[index] = { ...projects[index], ...updates }
        saveProjects(projects)
        return projects[index]
    },

    async deleteProject(id) {
        await delay()
        let projects = getStoredProjects()
        projects = projects.filter((p) => p.id !== id)
        saveProjects(projects)
        return id
    },
}
