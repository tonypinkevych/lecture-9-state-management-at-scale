import React, { useCallback, useEffect, useState } from 'react'
import { EmptyState, LoadingState } from '../../components'
import { Task, tasksService } from '../../services/tasks'
import { Container, Header, Progress, TaskInput, TaskList } from './components'

function App() {
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

  return (
    <Container>
      <Header />

      <TaskInput
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
        loading={isSubmitting}
      />

      {loading ? (
        <LoadingState />
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            loading={isSubmitting}
          />
          <Progress stats={stats} />
        </>
      )}
    </Container>
  )
}

export default App
