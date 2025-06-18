import React from 'react'
import { Task } from '../../../services/tasks'
import {
  deleteTask,
  toggleTask,
  useAppDispatch,
  useAppSelector,
} from '../store'

interface TaskItemProps {
  task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.tasks.isSubmitting)

  const handleToggle = (id: number) => {
    dispatch(toggleTask(id))
  }
  const handleDelete = (id: number) => {
    dispatch(deleteTask(id))
  }

  return (
    <div className="group flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-sm hover:shadow-md transform hover:-translate-y-1 animate-slide-in">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => handleToggle(task.id)}
          disabled={loading}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            task.completed
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-transparent text-white shadow-lg'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
          }`}
        >
          {task.completed && (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <span
          className={`flex-1 text-lg transition-all duration-300 ${
            task.completed
              ? 'line-through text-gray-400'
              : 'text-gray-700 font-medium'
          }`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => handleDelete(task.id)}
        disabled={loading}
        className="ml-3 p-2 text-gray-400 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100 transform hover:scale-110 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}
