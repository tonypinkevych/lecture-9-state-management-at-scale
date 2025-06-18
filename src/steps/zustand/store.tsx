import { useEffect } from 'react'
import { create } from 'zustand'
import { Task, tasksService } from '../../services/tasks'

interface TaskState {
  tasks: Task[]
  loading: boolean
  isSubmitting: boolean
  inputValue: string
  stats: {
    total: number
    completed: number
    pending: number
    completionRate: number
  }
  setInputValue: (value: string) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleToggle: (id: number) => Promise<void>
  handleDelete: (id: number) => Promise<void>
  fetchTasks: () => Promise<void>
  fetchStats: () => Promise<void>
}

export const useTaskStore = create<TaskState>((set, get) => ({
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
  setInputValue: (value) => set({ inputValue: value }),
  fetchTasks: async () => {
    set({ loading: true })
    const fetchedTasks = await tasksService.getAllTasks()
    set({ tasks: fetchedTasks, loading: false })
  },
  fetchStats: async () => {
    try {
      const taskStats = await tasksService.getTaskStats()
      set({ stats: taskStats })
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  },
  handleSubmit: async (e) => {
    e.preventDefault()
    const { inputValue, isSubmitting, fetchStats } = get()
    if (inputValue.trim() && !isSubmitting) {
      try {
        set({ isSubmitting: true })
        const newTask = await tasksService.createTask(inputValue)
        set((state) => ({ tasks: [...state.tasks, newTask], inputValue: '' }))
        await fetchStats()
      } catch (err) {
        console.error('Failed to add task:', err)
      } finally {
        set({ isSubmitting: false })
      }
    }
  },
  handleToggle: async (id) => {
    const { fetchStats } = get()
    try {
      const updatedTask = await tasksService.toggleTask(id)
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }))
      await fetchStats()
    } catch (err) {
      console.error('Failed to toggle task:', err)
    }
  },
  handleDelete: async (id) => {
    const { fetchStats } = get()
    try {
      await tasksService.deleteTask(id)
      set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }))
      await fetchStats()
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  },
}))

export function useTaskStoreInit() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  const fetchStats = useTaskStore((state) => state.fetchStats)
  useEffect(() => {
    fetchTasks()
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
