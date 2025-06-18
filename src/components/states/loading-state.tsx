import React from 'react'

export const LoadingState: React.FC = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
    <p className="text-gray-500 text-lg font-medium">Loading tasks...</p>
  </div>
)
