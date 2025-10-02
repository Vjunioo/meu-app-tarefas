import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

export default function ProfileScreen({ onNavigate, onLogout, userData, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState(userData?.avatar || '');

  const handleSave = () => {
    if (newAvatar.trim()) {
      onUpdateProfile({ avatar: newAvatar });
      setIsEditing(false);
    } else {
      Alert.alert("Atenção", "O avatar não pode ficar vazio.");
    }
  };

  const handleCancel = () => {
    setNewAvatar(userData?.avatar || '');
    setIsEditing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <Text style={styles.formHeader}>Edite seu Avatar</Text>
          <TextInput
            style={styles.avatarInput}
            value={newAvatar}
            onChangeText={setNewAvatar}
            maxLength={2}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleCancel}>
            <Text style={styles.buttonOutlineText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.profileAvatar}>{userData?.avatar || '👤'}</Text>
          <Text style={styles.header}>{userData?.name || 'Usuário'}</Text>
          <Text style={styles.subHeader}>Gerencie suas informações e preferências.</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => onNavigate('TaskList')}>
                <Text style={styles.buttonOutlineText}>Voltar para Tarefas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onLogout}>
                <Text style={styles.buttonText}>Sair (Logout)</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', padding: 20 },
    
    profileAvatar: { fontSize: 100, marginBottom: 20 },
    header: { fontSize: SIZES.h1, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
    subHeader: { fontSize: 16, color: COLORS.textSecondary, marginBottom: 40, textAlign: 'center' },
    buttonContainer: { width: '100%', position: 'absolute', bottom: 40, paddingHorizontal: 20 },
    
    editContainer: { width: '100%', alignItems: 'center' },
    formHeader: { fontSize: SIZES.h2, fontWeight: '600', color: COLORS.text, marginBottom: 20 },
    avatarInput: { fontSize: 60, width: 120, height: 120, textAlign: 'center', backgroundColor: COLORS.white, borderRadius: 20, borderColor: COLORS.primary, borderWidth: 2, marginBottom: 30 },
    
    button: { width: '100%', backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
    buttonOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.primary },
    buttonOutlineText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16 },
    logoutButton: { backgroundColor: COLORS.danger },
});