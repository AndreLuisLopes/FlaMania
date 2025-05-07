import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados para os inputs
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegistro = async () => {
    if (!nome || !usuario || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.replace('/login');
    } catch (error) {
      let errorMessage = 'Erro ao registrar';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está em uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'A senha é muito fraca';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.innerContainer}>
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>FLAMANIA</Text>
          <Text style={{ fontWeight: '600' }}>Complete tudo para concluir seu registro!</Text>
        </View>

        <Text style={styles.label}>Nome Completo:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Seu nome completo" 
          value={nome} 
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Nome de Usuário:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nome de usuário" 
          value={usuario} 
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha (mínimo 6 caracteres):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Confirme a Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegistro}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Registrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Já tem uma Conta?{' '}
          <Text style={{ fontWeight: 'bold', color: '#d00' }} onPress={() => router.push('/login')}>
            Login
          </Text>
        </Text>

        {/* Botões sociais - desativados por enquanto */}
        {false && (
          <>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={18} color="white" />
              <Text style={styles.socialButtonText}>  Continuar com o Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={18} color="white" />
              <Text style={styles.socialButtonText}>  Continuar com a Apple</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f1f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  innerContainer: {
    width: '85%',
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d00',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: '#d00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
