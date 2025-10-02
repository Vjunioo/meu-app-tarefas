import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Alert, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TaskService } from './src/services/TaskService';
import { COLORS } from './src/styles/theme';

import LoginScreen from './src/screens/LoginScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const ALL_USERS_STORAGE_KEY = '@FocoTotal:allUsers';

const SplashScreen = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
);

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
        await TaskService.loadAllData();
        setIsLoading(false);
    };
    initializeApp();
  }, []);

  const refreshTasks = (userName) => {
    setTasks([...TaskService.getTasks(userName)]);
  };
  
  const handleRegister = async (newUserData) => {
      try {
        const storedUsersJson = await AsyncStorage.getItem(ALL_USERS_STORAGE_KEY);
        const allUsers = storedUsersJson ? JSON.parse(storedUsersJson) : [];

        const userExists = allUsers.some(
          user => user.name.toLowerCase() === newUserData.name.toLowerCase()
        );

        if (userExists) {
            Alert.alert("Erro", "Este nome de perfil já está em uso. Por favor, escolha outro.");
            return;
        }

        const updatedUsers = [...allUsers, newUserData];
        await AsyncStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
        
        await TaskService.registerUserTasks(newUserData.name);
        setUserData(newUserData);
        refreshTasks(newUserData.name);
        setScreen('TaskList');
      } catch (e) {
        Alert.alert("Erro", "Não foi possível criar sua conta.");
      }
  };

  const handleLogin = async (loginData) => {
      try {
        const storedUsersJson = await AsyncStorage.getItem(ALL_USERS_STORAGE_KEY);
        if (!storedUsersJson) {
            Alert.alert("Erro", "Nenhuma conta encontrada. Cadastre-se primeiro.");
            return;
        }
        
        const allUsers = JSON.parse(storedUsersJson);
        
        const foundUser = allUsers.find(
            user => user.name.toLowerCase() === loginData.name.toLowerCase().trim()
        );

        if (foundUser) {
            setUserData(foundUser);
            refreshTasks(foundUser.name);
            setScreen('TaskList');
        } else {
            Alert.alert("Erro de Login", "O nome do perfil está incorreto.");
        }
      } catch (e) {
          Alert.alert("Erro", "Não foi possível entrar.");
      }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
        const storedUsersJson = await AsyncStorage.getItem(ALL_USERS_STORAGE_KEY);
        let allUsers = storedUsersJson ? JSON.parse(storedUsersJson) : [];
        
        const updatedUser = { ...userData, ...updatedData };

        const updatedUsers = allUsers.map(user => 
            user.name.toLowerCase() === userData.name.toLowerCase() ? updatedUser : user
        );

        await AsyncStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
        setUserData(updatedUser); 
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  const handleLogout = () => {
      setUserData(null);
      setScreen('Login');
  };

  const handleAddTask = async (taskData) => {
    await TaskService.addTask(userData.name, taskData);
    refreshTasks(userData.name);
  };

  const handleEditTask = async (updatedTask) => {
    await TaskService.updateTask(userData.name, updatedTask);
    refreshTasks(userData.name);
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    await TaskService.deleteTask(userData.name, taskId);
    refreshTasks(userData.name);
  };

  const handleToggleTask = async (taskId) => {
    await TaskService.toggleTaskCompleted(userData.name, taskId);
    refreshTasks(userData.name);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  const renderScreen = () => {
    if (!userData) {
        return <LoginScreen onRegister={handleRegister} onLogin={handleLogin} />;
    }
    switch (screen) {
      case 'TaskList':
        return <TaskListScreen tasks={tasks} userData={userData} onNavigate={setScreen} onToggleTask={handleToggleTask} onSetEditingTask={setEditingTask} />;
      case 'CreateTask':
        return <CreateTaskScreen onNavigate={setScreen} onAddTask={handleAddTask} />;
      case 'EditTask':
        return <EditTaskScreen editingTask={editingTask} onNavigate={setScreen} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />;
      case 'Profile':
        return <ProfileScreen userData={userData} onNavigate={setScreen} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} />;
      default:
        return <LoginScreen onRegister={handleRegister} onLogin={handleLogin} />;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F6FA' },
});