import React from 'react'
import { useAppSelector } from '../store'
import { TaskItem } from './task-item'

export const TaskList: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks)

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
