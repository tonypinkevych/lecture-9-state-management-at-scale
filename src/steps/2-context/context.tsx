import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Task, tasksService } from '../../services/tasks'

interface TaskContextType {
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
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
  })

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      const fetchedTasks = await tasksService.getAllTasks()
      setTasks(fetchedTasks)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const taskStats = await tasksService.getTaskStats()
      setStats(taskStats)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }, [])

  const addTask = useCallback(
    async (text: string) => {
      const newTask = await tasksService.createTask(text)
      setTasks((prev) => [...prev, newTask])
      await fetchStats()
    },
    [fetchStats]
  )

  const toggleTask = useCallback(
    async (id: number) => {
      const updatedTask = await tasksService.toggleTask(id)
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      )
      await fetchStats()
    },
    [fetchStats]
  )

  const deleteTask = useCallback(
    async (id: number) => {
      await tasksService.deleteTask(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
      await fetchStats()
    },
    [fetchStats]
  )

  useEffect(() => {
    const initializeTasks = async () => {
      await fetchTasks()
      await fetchStats()
    }

    initializeTasks()
  }, [fetchTasks, fetchStats])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim() && !isSubmitting) {
      try {
        setIsSubmitting(true)
        await addTask(inputValue)
        setInputValue('')
      } catch (err) {
        console.error('Failed to add task:', err)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleToggle = async (id: number) => {
    try {
      await toggleTask(id)
    } catch (err) {
      console.error('Failed to toggle task:', err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id)
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  const value = {
    tasks,
    loading,
    isSubmitting,
    inputValue,
    stats,
    setInputValue,
    handleSubmit,
    handleToggle,
    handleDelete,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
