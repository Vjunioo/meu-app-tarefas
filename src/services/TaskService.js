import AsyncStorage from '@react-native-async-storage/async-storage';


const TASKS_STORAGE_KEY = '@FocoTotal:allUsersTasks';


const WELCOME_TASK = {
  id: 'welcome-1',
  title: 'Bem-vindo(a) ao Foco Total!',
  description: 'Toque no círculo para concluir, no lápis para editar ou no "+" para adicionar uma nova tarefa.',
  completed: false,
};


let allUsersTasks = {};


export const TaskService = {
  
  loadAllData: async () => {
    try {
      const dataJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (dataJson !== null) {
        allUsersTasks = JSON.parse(dataJson);
      }
    } catch (e) {
      console.error("Failed to load tasks data.", e);
    }
  },

  
  saveAllData: async () => {
    try {
      const dataJson = JSON.stringify(allUsersTasks);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, dataJson);
    } catch (e) {
      console.error("Failed to save tasks data.", e);
    }
  },

  
  registerUserTasks: async (userName) => {
    if (!allUsersTasks[userName]) {
      allUsersTasks[userName] = [WELCOME_TASK];
      await TaskService.saveAllData();
    }
  },


  getTasks: (userName) => {
    return allUsersTasks[userName] || [];
  },

  
  addTask: async (userName, newTaskData) => {
    if (!allUsersTasks[userName]) return; 
    const newTask = {
      id: Math.random().toString(),
      ...newTaskData,
      completed: false,
    };
    allUsersTasks[userName].push(newTask);
    await TaskService.saveAllData();
  },

  
  updateTask: async (userName, updatedTask) => {
    if (!allUsersTasks[userName]) return;
    allUsersTasks[userName] = allUsersTasks[userName].map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    await TaskService.saveAllData();
  },

  
  deleteTask: async (userName, taskId) => {
    if (!allUsersTasks[userName]) return;
    allUsersTasks[userName] = allUsersTasks[userName].filter(
      task => task.id !== taskId
    );
    await TaskService.saveAllData();
  },

  
  toggleTaskCompleted: async (userName, taskId) => {
    if (!allUsersTasks[userName]) return;
    allUsersTasks[userName] = allUsersTasks[userName].map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    await TaskService.saveAllData();
  },
};