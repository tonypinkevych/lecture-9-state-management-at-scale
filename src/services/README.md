# Tasks Service

This is a mock API service for task management that simulates real API calls using promises and in-memory storage.

## Features

- **In-memory storage**: Data persists during the session but resets on page reload
- **Simulated network delays**: Random delays between 100-500ms to simulate real API calls
- **Error handling**: Proper error throwing for invalid operations
- **TypeScript support**: Full type safety with interfaces

## API Methods

### `getAllTasks(): Promise<Task[]>`

Retrieves all tasks from the in-memory storage.

### `getTaskById(id: number): Promise<Task | null>`

Retrieves a specific task by ID. Returns null if not found.

### `createTask(text: string): Promise<Task>`

Creates a new task with the provided text. Throws error if text is empty.

### `updateTask(id: number, updates: Partial<Pick<Task, 'text' | 'completed'>>): Promise<Task>`

Updates an existing task with new data. Throws error if task not found.

### `toggleTask(id: number): Promise<Task>`

Toggles the completion status of a task. Throws error if task not found.

### `deleteTask(id: number): Promise<void>`

Deletes a task by ID. Throws error if task not found.

### `deleteCompletedTasks(): Promise<void>`

Deletes all completed tasks from the storage.

### `getTaskStats(): Promise<{total: number, completed: number, pending: number, completionRate: number}>`

Returns statistics about the current tasks.

### `clearAllTasks(): Promise<void>`

Clears all tasks from storage (useful for testing/reset).

### `seedInitialTasks(): Promise<void>`

Adds some initial demo tasks if the storage is empty.

## Task Interface

```typescript
interface Task {
  id: number
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}
```

## Usage Example

```typescript
import { Tasks } from './services/tasks'

// Create a new task
const newTask = await Tasks.createTask('Learn React')

// Get all tasks
const allTasks = await Tasks.getAllTasks()

// Toggle task completion
const updatedTask = await Tasks.toggleTask(newTask.id)

// Delete a task
await Tasks.deleteTask(newTask.id)
```

## Error Handling

The service throws descriptive errors for various scenarios:

- Task not found
- Empty task text
- Invalid operations

Always wrap API calls in try-catch blocks:

```typescript
try {
  const task = await Tasks.createTask('New task')
} catch (error) {
  console.error('Failed to create task:', error.message)
}
```
