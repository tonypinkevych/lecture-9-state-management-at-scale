import React from 'react'
import { useTaskContext } from '../context'
import { TaskItem } from './task-item'

export const TaskList: React.FC = () => {
  const { tasks } = useTaskContext()

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
