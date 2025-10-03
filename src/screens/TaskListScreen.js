import { Platform, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

export default function TaskListScreen({ tasks, onNavigate, onToggleTask, onSetEditingTask, userData }) {
  const handleEdit = (task) => {
    onSetEditingTask(task);
    onNavigate('EditTask');
  };
  
  const groupedTasks = [
      { title: 'A Fazer', data: tasks.filter(t => !t.completed) },
      { title: 'Concluídas', data: tasks.filter(t => t.completed) },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity style={styles.taskContent} onPress={() => onToggleTask(item.id)}>
        <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
          {item.completed && <Text style={styles.checkboxMark}>✓</Text>}
        </View>
        <View style={styles.taskTextContainer}>
          <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>{item.title}</Text>
          {item.description ? <Text style={styles.taskDescription}>{item.description}</Text> : null}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
          <Text>✏️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
            <Text style={styles.headerWelcome}>Bem-vindo(a),</Text>
            <Text style={styles.headerName}>{userData?.name || 'Usuário'}</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('Profile')}>
            <Text style={styles.profileIcon}>{userData?.avatar || '👤'}</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={groupedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title, data } }) => (
          data.length > 0 ? <Text style={styles.sectionHeader}>{title}</Text> : null
        )}
        ListEmptyComponent={<Text style={styles.emptyListText}>Tudo em ordem! Nenhuma tarefa pendente.</Text>}
        contentContainerStyle={styles.listContentContainer}
      />
      <TouchableOpacity style={styles.fab} onPress={() => onNavigate('CreateTask')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 30,
    },
    headerWelcome: {
      fontSize: SIZES.body,
      color: COLORS.textSecondary,
    },
    headerName: {
      fontSize: SIZES.h2,
      color: COLORS.text,
      fontWeight: 'bold',
    },
    profileIcon: {
      fontSize: 40,
    },
    sectionHeader: {
      fontSize: SIZES.h3,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginTop: 20,
      marginBottom: 10,
    },
    taskCard: {
      backgroundColor: COLORS.white,
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      ...Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
        android: { elevation: 2 },
        web: { boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }
      })
    },
    taskContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    taskTextContainer: {
        flex: 1,
    },
    taskTitle: {
      fontSize: 16,
      color: COLORS.text,
      fontWeight: '600',
    },
    taskTitleCompleted: {
      textDecorationLine: 'line-through',
      color: COLORS.gray,
    },
    taskDescription: {
      fontSize: 13,
      color: COLORS.textSecondary,
      marginTop: 4,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: COLORS.primary,
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxCompleted: {
      backgroundColor: COLORS.success,
      borderColor: COLORS.success,
    },
    checkboxMark: {
      color: 'white',
      fontWeight: 'bold',
    },
    editButton: {
      padding: 10,
    },
    emptyListText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: COLORS.gray,
    },
    listContentContainer: {
        paddingHorizontal: 20,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
            android: { elevation: 5 },
            web: { boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)' }
        })
    },
    fabText: {
      color: COLORS.white,
      fontSize: 30,
      lineHeight: 30,
    },
});