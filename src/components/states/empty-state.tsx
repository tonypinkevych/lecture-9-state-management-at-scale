import React from 'react'

export const EmptyState: React.FC = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-indigo-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    </div>
    <p className="text-gray-500 text-lg font-medium">No tasks yet</p>
    <p className="text-gray-400 text-sm mt-1">
      Add your first task above to get started!
    </p>
  </div>
)
