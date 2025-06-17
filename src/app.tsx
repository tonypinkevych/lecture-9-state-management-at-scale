import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Header Component
const Header = () => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
      ✨ Todo App
    </h1>
    <p className="text-gray-600 text-sm">
      Organize your day, one task at a time
    </p>
  </div>
);

// Task Input Component
interface TaskInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TaskInput = ({ inputValue, onInputChange, onSubmit }: TaskInputProps) => (
  <form onSubmit={onSubmit} className="mb-8">
    <div className="flex gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium shadow-lg hover:shadow-xl"
      >
        Add
      </button>
    </div>
  </form>
);

// Task Item Component
interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem = ({ task, index, onToggle, onDelete }: TaskItemProps) => (
  <div
    className="group flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-sm hover:shadow-md transform hover:-translate-y-1 animate-slide-in"
    style={{
      animationDelay: `${index * 100}ms`,
    }}
  >
    <div className="flex items-center gap-4 flex-1">
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          task.completed
            ? "bg-gradient-to-r from-green-400 to-emerald-500 border-transparent text-white shadow-lg"
            : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
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
            ? "line-through text-gray-400"
            : "text-gray-700 font-medium"
        }`}
      >
        {task.text}
      </span>
    </div>
    <button
      onClick={() => onDelete(task.id)}
      className="ml-3 p-2 text-gray-400 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100 transform hover:scale-110 rounded-lg hover:bg-red-50"
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
);

// Task List Component
interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => (
  <div className="space-y-3">
    {tasks.map((task, index) => (
      <TaskItem
        key={task.id}
        task={task}
        index={index}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
  </div>
);

// Empty State Component
const EmptyState = () => (
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
);

// Progress Component
interface ProgressProps {
  tasks: Task[];
}

const Progress = ({ tasks }: ProgressProps) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="mt-6 pt-4 border-t border-gray-200/50">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {completedCount} of {totalCount} completed
        </span>
        <span className="text-indigo-500 font-medium">{percentage}% done</span>
      </div>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: inputValue.trim(), completed: false },
      ]);
      setInputValue("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/20">
        <Header />

        <TaskInput
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSubmit={addTask}
        />

        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
            <Progress tasks={tasks} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
