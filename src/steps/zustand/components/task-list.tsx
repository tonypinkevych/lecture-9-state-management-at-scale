import React from 'react'
import { useTaskStore } from '../store'
import { TaskItem } from './task-item'

export const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks)

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
