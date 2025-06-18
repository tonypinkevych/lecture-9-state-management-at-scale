import React from 'react'

interface ProgressProps {
  stats: {
    total: number
    completed: number
    pending: number
    completionRate: number
  }
}

export const Progress: React.FC<ProgressProps> = ({ stats }) => {
  const { total, completed, completionRate } = stats

  return (
    <div className="mt-6 pt-4 border-t border-gray-200/50">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {completed} of {total} completed
        </span>
        <span className="text-indigo-500 font-medium">
          {completionRate}% done
        </span>
      </div>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${completionRate}%`,
          }}
        ></div>
      </div>
    </div>
  )
}
