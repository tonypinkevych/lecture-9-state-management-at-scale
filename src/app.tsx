import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Task, tasksService } from "./services/tasks";

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
  loading?: boolean;
}

const TaskInput = ({
  inputValue,
  onInputChange,
  onSubmit,
  loading = false,
}: TaskInputProps) => (
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
          "Add"
        )}
      </button>
    </div>
  </form>
);

// Task Item Component
interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
}

const TaskItem = ({
  task,
  onToggle,
  onDelete,
  loading = false,
}: TaskItemProps) => (
  <div className="group flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-sm hover:shadow-md transform hover:-translate-y-1 animate-slide-in">
    <div className="flex items-center gap-4 flex-1">
      <button
        onClick={() => onToggle(task.id)}
        disabled={loading}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
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
);

// Task List Component
interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
}

const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  loading = false,
}: TaskListProps) => (
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
);

// Loading State Component
const LoadingState = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
    <p className="text-gray-500 text-lg font-medium">Loading tasks...</p>
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

// Error State Component
interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => (
  <div className="text-center py-8">
    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <p className="text-red-500 text-lg font-medium mb-2">
      Something went wrong
    </p>
    <p className="text-gray-400 text-sm mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Progress Component
interface ProgressProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
  };
}

const Progress = ({ stats }: ProgressProps) => {
  const { total, completed, completionRate } = stats;

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
  );
};

const Container = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/20">
      {children}
    </div>
  </div>
);

// Main App Component
function App() {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedTasks = await tasksService.getAllTasks();
      setTasks(fetchedTasks);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const taskStats = await tasksService.getTaskStats();
      setStats(taskStats);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  const addTask = useCallback(
    async (text: string) => {
      const newTask = await tasksService.createTask(text);
      setTasks((prev) => [...prev, newTask]);
      await fetchStats();
    },
    [fetchStats]
  );

  const toggleTask = useCallback(
    async (id: number) => {
      const updatedTask = await tasksService.toggleTask(id);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      await fetchStats();
    },
    [fetchStats]
  );

  const deleteTask = useCallback(
    async (id: number) => {
      await tasksService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      await fetchStats();
    },
    [fetchStats]
  );

  // Initialize tasks on mount
  useEffect(() => {
    const initializeTasks = async () => {
      await fetchTasks();
      await fetchStats();
    };

    initializeTasks();
  }, [fetchTasks, fetchStats]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && !isSubmitting) {
      try {
        setIsSubmitting(true);
        await addTask(inputValue);
        setInputValue("");
      } catch (err) {
        // Error is handled by the hook
        console.error("Failed to add task:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleTask(id);
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <Container>
      <Header />

      <TaskInput
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
        loading={isSubmitting}
      />

      {loading ? (
        <LoadingState />
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            loading={isSubmitting}
          />
          <Progress stats={stats} />
        </>
      )}
    </Container>
  );
}

export default App;
