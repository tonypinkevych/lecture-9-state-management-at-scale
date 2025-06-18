import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Task, tasksService } from '../../services/tasks'

interface Stats {
  total: number
  completed: number
  pending: number
  completionRate: number
}

interface TaskState {
  tasks: Task[]
  loading: boolean
  isSubmitting: boolean
  inputValue: string
  stats: Stats
}

const initialState: TaskState = {
  tasks: [],
  loading: true,
  isSubmitting: false,
  inputValue: '',
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
  },
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await tasksService.getAllTasks()
})

export const fetchStats = createAsyncThunk('tasks/fetchStats', async () => {
  return await tasksService.getTaskStats()
})

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (text: string) => {
    return await tasksService.createTask(text)
  }
)

export const toggleTask = createAsyncThunk(
  'tasks/toggleTask',
  async (id: number) => {
    return await tasksService.toggleTask(id)
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number) => {
    await tasksService.deleteTask(id)
    return id
  }
)

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload
    },
    setIsSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.loading = false
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload
      })
      .addCase(createTask.pending, (state) => {
        state.isSubmitting = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
        state.inputValue = ''
        state.isSubmitting = false
      })
      .addCase(createTask.rejected, (state) => {
        state.isSubmitting = false
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        )
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      })
  },
})

export const { setInputValue, setIsSubmitting } = taskSlice.actions

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Custom hook to initialize tasks and stats on mount
export function useTaskStoreInit() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchStats())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
