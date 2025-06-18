import React from 'react'

interface TaskInputProps {
  inputValue: string
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  loading?: boolean
}

export const TaskInput: React.FC<TaskInputProps> = ({
  inputValue,
  onInputChange,
  onSubmit,
  loading = false,
}) => (
  <form onSubmit={onSubmit} className="mb-8">
    <div className="flex gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="What needs to be done?"
        disabled={loading}
        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={loading || !inputValue.trim()}
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Adding...
          </div>
        ) : (
          'Add'
        )}
      </button>
    </div>
  </form>
)
