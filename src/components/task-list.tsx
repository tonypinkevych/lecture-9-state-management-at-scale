import React from 'react'
import { Task } from '../services/tasks'
import { TaskItem } from './task-item'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => Promise<void>
  onDelete: (id: number) => Promise<void>
  loading?: boolean
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  loading = false,
}) => (
  <div className="space-y-3">
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
        loading={loading}
      />
    ))}
  </div>
)
