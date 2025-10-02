
import { INITIAL_TASKS } from '../constants/initialData';

let tasks = [...INITIAL_TASKS];

export const TaskService = {
  getTasks: () => {
    return tasks;
  },

  addTask: (newTaskData) => {
    const newTask = {
      id: Math.random().toString(),
      ...newTaskData,
      completed: false,
    };
    tasks.push(newTask);
    return newTask;
  },

  updateTask: (updatedTask) => {
    tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    return updatedTask;
  },

  deleteTask: (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    return { success: true };
  },

  toggleTaskCompleted: (taskId) => {
    tasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    return tasks.find(task => task.id === taskId);
  }
};