import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TaskService } from './src/services/TaskService';

import LoginScreen from './src/screens/LoginScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const USER_STORAGE_KEY = '@FocoTotal:userData';

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setTasks(TaskService.getTasks());
  }, []);

  const refreshTasks = () => {
    setTasks([...TaskService.getTasks()]);
  };
  
  const handleRegister = async (newUserData) => {
      try {
        const userJson = JSON.stringify(newUserData);
        await AsyncStorage.setItem(USER_STORAGE_KEY, userJson);
        setUserData(newUserData);
        setScreen('TaskList');
      } catch (e) {
        Alert.alert("Erro", "Não foi possível criar sua conta.");
      }
  };

  const handleLogin = async (loginData) => {
      try {
        const storedUserJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (!storedUserJson) {
            Alert.alert("Erro", "Nenhuma conta encontrada. Cadastre-se primeiro.");
            return;
        }
        const storedUser = JSON.parse(storedUserJson);
        if (storedUser.name === loginData.name) {
            setUserData(storedUser);
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
      
      const updatedUser = { ...userData, ...updatedData };
      const userJson = JSON.stringify(updatedUser);
      
      await AsyncStorage.setItem(USER_STORAGE_KEY, userJson);
      
      setUserData(updatedUser); 
    } catch (e) {
      console.error("Failed to update user data.", e);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  const handleLogout = () => {
      setUserData(null);
      setScreen('Login');
  };

  const handleAddTask = (taskData) => { TaskService.addTask(taskData); refreshTasks(); };
  const handleEditTask = (updatedTask) => { TaskService.updateTask(updatedTask); refreshTasks(); setEditingTask(null); };
  const handleDeleteTask = (taskId) => { TaskService.deleteTask(taskId); refreshTasks(); };
  const handleToggleTask = (taskId) => { TaskService.toggleTaskCompleted(taskId); refreshTasks(); };

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