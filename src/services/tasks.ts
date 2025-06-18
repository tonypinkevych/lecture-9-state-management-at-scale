export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Error simulation configuration
interface ErrorConfig {
  networkErrorProbability: number; // 0-1, probability of network timeout/connection error
  serverErrorProbability: number; // 0-1, probability of 5xx server error
  validationErrorProbability: number; // 0-1, probability of 4xx validation error
  networkTimeoutMs: number; // milliseconds before network timeout
}

// Default error configuration (10% chance of various errors)
const defaultErrorConfig: ErrorConfig = {
  networkErrorProbability: 0, // 0.05, // 5% chance of network error
  serverErrorProbability: 0, //0.03, // 3% chance of server error
  validationErrorProbability: 0, //0.02, // 2% chance of validation error
  networkTimeoutMs: 3000, // 3 second timeout
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to generate a random delay between 100-500ms
const randomDelay = () => delay(Math.random() * 400 + 100);

export class Tasks {
  private tasks: Task[] = [];
  private nextId = 1;
  private errorConfig: ErrorConfig;

  constructor(errorConfig?: Partial<ErrorConfig>) {
    this.errorConfig = { ...defaultErrorConfig, ...errorConfig };
  }

  // Error simulation helper
  private async simulateErrors(operation: string): Promise<void> {
    const random = Math.random();

    // Simulate network timeout/connection error
    if (random < this.errorConfig.networkErrorProbability) {
      await delay(this.errorConfig.networkTimeoutMs);
      throw new Error(
        `Network error: ${operation} failed due to connection timeout`
      );
    }

    // Simulate server error (5xx)
    if (
      random <
      this.errorConfig.networkErrorProbability +
        this.errorConfig.serverErrorProbability
    ) {
      await randomDelay();
      throw new Error(
        `Server error: ${operation} failed due to internal server error (500)`
      );
    }

    // Simulate validation error (4xx)
    if (
      random <
      this.errorConfig.networkErrorProbability +
        this.errorConfig.serverErrorProbability +
        this.errorConfig.validationErrorProbability
    ) {
      await randomDelay();
      throw new Error(
        `Validation error: ${operation} failed due to invalid request (400)`
      );
    }
  }

  // Configure error simulation
  configureErrors(config: Partial<ErrorConfig>): void {
    this.errorConfig = { ...this.errorConfig, ...config };
  }

  // Reset error configuration to defaults
  resetErrorConfig(): void {
    this.errorConfig = { ...defaultErrorConfig };
  }

  // Get current error configuration
  getErrorConfig(): ErrorConfig {
    return { ...this.errorConfig };
  }

  // Get all tasks
  async getAllTasks(): Promise<Task[]> {
    await this.simulateErrors("getAllTasks");
    await randomDelay();
    return [...this.tasks];
  }

  // Get a single task by ID
  async getTaskById(id: number): Promise<Task | null> {
    await this.simulateErrors("getTaskById");
    await randomDelay();
    const task = this.tasks.find((t) => t.id === id);
    return task ? { ...task } : null;
  }

  // Create a new task
  async createTask(text: string): Promise<Task> {
    await this.simulateErrors("createTask");
    await randomDelay();

    if (!text.trim()) {
      throw new Error("Task text cannot be empty");
    }

    const newTask: Task = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.push(newTask);
    return { ...newTask };
  }

  // Update a task
  async updateTask(
    id: number,
    updates: Partial<Pick<Task, "text" | "completed">>
  ): Promise<Task> {
    await this.simulateErrors("updateTask");
    await randomDelay();

    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTask: Task = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date(),
    };

    this.tasks[taskIndex] = updatedTask;
    return { ...updatedTask };
  }

  // Toggle task completion status
  async toggleTask(id: number): Promise<Task> {
    await this.simulateErrors("toggleTask");
    await randomDelay();

    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTask: Task = {
      ...this.tasks[taskIndex],
      completed: !this.tasks[taskIndex].completed,
      updatedAt: new Date(),
    };

    this.tasks[taskIndex] = updatedTask;
    return { ...updatedTask };
  }

  // Delete a task
  async deleteTask(id: number): Promise<void> {
    await this.simulateErrors("deleteTask");
    await randomDelay();

    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);
  }

  // Delete all completed tasks
  async deleteCompletedTasks(): Promise<void> {
    await this.simulateErrors("deleteCompletedTasks");
    await randomDelay();
    this.tasks = this.tasks.filter((task) => !task.completed);
  }

  // Get tasks statistics
  async getTaskStats(): Promise<{
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
  }> {
    await this.simulateErrors("getTaskStats");
    await randomDelay();

    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      pending,
      completionRate: Math.round(completionRate),
    };
  }

  // Clear all tasks (for testing/reset)
  async clearAllTasks(): Promise<void> {
    await this.simulateErrors("clearAllTasks");
    await randomDelay();
    this.tasks = [];
    this.nextId = 1;
  }

  // Seed with some initial tasks (for demo purposes)
  async seedInitialTasks(): Promise<void> {
    await this.simulateErrors("seedInitialTasks");
    await randomDelay();

    if (this.tasks.length === 0) {
      const initialTasks = [
        "Learn React hooks",
        "Build a todo app",
        "Implement state management",
        "Add error handling",
        "Write unit tests",
      ];

      for (const text of initialTasks) {
        await this.createTask(text);
      }
    }
  }
}

export const tasksService = new Tasks();
