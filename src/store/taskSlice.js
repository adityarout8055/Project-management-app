import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { taskService } from '../services/taskService'

// ─── Async Thunks ────────────────────────────────────────
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
    try {
        return await taskService.fetchTasks()
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { rejectWithValue }) => {
    try {
        return await taskService.createTask(taskData)
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updates }, { rejectWithValue }) => {
    try {
        return await taskService.updateTask(id, updates)
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
    try {
        return await taskService.deleteTask(id)
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

export const moveTask = createAsyncThunk('tasks/moveTask', async ({ id, newStatus }, { rejectWithValue }) => {
    try {
        return await taskService.moveTask(id, newStatus)
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

// ─── Slice ───────────────────────────────────────────────
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        loading: false,
        error: null,
        selectedTask: null,
    },
    reducers: {
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        },
        clearSelectedTask: (state) => {
            state.selectedTask = null
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchTasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // createTask
            .addCase(createTask.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            // updateTask
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.items.findIndex((t) => t.id === action.payload.id)
                if (index !== -1) state.items[index] = action.payload
                if (state.selectedTask?.id === action.payload.id) {
                    state.selectedTask = action.payload
                }
            })
            // deleteTask
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t.id !== action.payload)
                if (state.selectedTask?.id === action.payload) {
                    state.selectedTask = null
                }
            })
            // moveTask
            .addCase(moveTask.fulfilled, (state, action) => {
                const index = state.items.findIndex((t) => t.id === action.payload.id)
                if (index !== -1) state.items[index] = action.payload
            })
    },
})

export const { setSelectedTask, clearSelectedTask, clearError } = taskSlice.actions

// ─── Selectors ───────────────────────────────────────────
export const selectAllTasks = (state) => state.tasks.items
export const selectTasksLoading = (state) => state.tasks.loading
export const selectTasksError = (state) => state.tasks.error
export const selectSelectedTask = (state) => state.tasks.selectedTask
export const selectTasksByStatus = (status) => (state) =>
    state.tasks.items.filter((t) => t.status === status)
export const selectTasksByProject = (projectId) => (state) =>
    state.tasks.items.filter((t) => t.projectId === projectId)

export default taskSlice.reducer
