import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// CORREÇÃO AQUI: Ajustando o caminho para o nome correto do arquivo
import Logo from '../components/LogoComponent'; 
import { COLORS, SIZES } from '../styles/theme';

// A tela recebe duas funções: onLogin e onRegister
export default function LoginScreen({ onLogin, onRegister }) {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [registerName, setRegisterName] = useState('');
  const [registerAvatar, setRegisterAvatar] = useState('');
  const [loginName, setLoginName] = useState('');

  const handleRegister = () => {
    if (registerName.trim() && registerAvatar.trim()) {
      onRegister({ name: registerName, avatar: registerAvatar });
    } else {
      Alert.alert('Quase lá!', 'Para se cadastrar, preencha seu nome e um emoji para o avatar.');
    }
  };

  const handleLogin = () => {
    if (loginName.trim()) {
      onLogin({ name: loginName });
    } else {
      Alert.alert('Atenção!', 'Por favor, digite o nome do seu perfil para entrar.');
    }
  };
  
  const toggleMode = () => {
      setIsLoginMode(!isLoginMode);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Logo size={100} />
      <Text style={styles.appName}>Foco Total</Text>

      {isLoginMode ? (
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Bem-vindo(a) de volta!</Text>
          <TextInput
            placeholder="Digite o nome do seu perfil"
            style={styles.input}
            value={loginName}
            onChangeText={setLoginName}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Crie seu perfil para começar</Text>
          <TextInput
            placeholder="Como podemos te chamar?"
            style={styles.input}
            value={registerName}
            onChangeText={setRegisterName}
          />
          <TextInput
            placeholder="Escolha um emoji para seu avatar (ex: 😎)"
            style={styles.input}
            value={registerAvatar}
            onChangeText={setRegisterAvatar}
            maxLength={2}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar e Organizar</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.toggleButton} onPress={toggleMode}>
          <Text style={styles.toggleButtonText}>
              {isLoginMode ? "Não tem uma conta? Cadastre-se" : "Já possui uma conta? Entre"}
          </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', padding: 20 },
  appName: { fontSize: SIZES.h1, fontWeight: 'bold', color: COLORS.primary, marginTop: SIZES.base, marginBottom: SIZES.base * 4 },
  formContainer: { width: '100%', backgroundColor: COLORS.white, padding: 20, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  formHeader: { fontSize: SIZES.h3, color: COLORS.text, marginBottom: 20, textAlign: 'center', fontWeight: '600' },
  input: { width: '100%', backgroundColor: COLORS.background, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: COLORS.lightGray },
  button: { width: '100%', backgroundColor: COLORS.primary, padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  toggleButton: { marginTop: 20 },
  toggleButtonText: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
});