import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

export default function EditTaskScreen({ onNavigate, onEditTask, onDeleteTask, editingTask }) {
  const [title, setTitle] = useState(editingTask.title);
  const [description, setDescription] = useState(editingTask.description);

  const handleSave = () => {
    if (title.trim()) {
      onEditTask({ ...editingTask, title, description });
      onNavigate('TaskList');
    } else {
      Alert.alert('Atenção', 'O título da tarefa é obrigatório.');
    }
  };

  const handleDelete = () => {
      Alert.alert(
          "Excluir Tarefa",
          "Você tem certeza que deseja excluir esta tarefa?",
          [
              {
                text: "Cancelar",
                style: "cancel"
              },
              {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                  await onDeleteTask(editingTask.id);
                  onNavigate('TaskList');
                }
              }
          ]
      );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.header}>Editar Tarefa</Text>
      <TextInput
        placeholder="Título da tarefa"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Descrição (opcional)"
        style={[styles.input, styles.multilineInput]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Excluir Tarefa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => onNavigate('TaskList')}>
        <Text style={styles.buttonOutlineText}>Voltar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontSize: SIZES.h2,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 30,
    },
    input: {
      width: '100%',
      backgroundColor: COLORS.white,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: COLORS.lightGray,
    },
    multilineInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    button: {
      width: '100%',
      backgroundColor: COLORS.primary,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.primary,
    },
    buttonOutlineText: {
      color: COLORS.primary,
      fontWeight: 'bold',
      fontSize: 16,
    },
    deleteButton: {
      backgroundColor: COLORS.danger,
    },
});