import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

export default function CreateTaskScreen({ onNavigate, onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      onAddTask({ title, description });
      onNavigate('TaskList');
    } else {
      Alert.alert('Atenção', 'O título da tarefa é obrigatório.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Text style={styles.header}>Criar Nova Tarefa</Text>
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
            <Text style={styles.buttonText}>Salvar Tarefa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => onNavigate('TaskList')}>
            <Text style={styles.buttonOutlineText}>Cancelar</Text>
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
});