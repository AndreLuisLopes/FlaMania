import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    useWindowDimensions,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const logoWidth = width * 0.6;
    const logoHeight = Math.min(height * 0.25, logoWidth * 0.6);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        setLoading(true);
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/pagina_inicio');
        } catch (error) {
            let errorMessage = 'Erro ao fazer login';
            
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Usuário não encontrado';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Senha incorreta';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Email inválido';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Esta conta foi desativada';
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
                <Image
                    source={require('./assets/flamania.png')}
                    style={{
                        width: logoWidth,
                        height: logoHeight,
                        marginBottom: 20,
                    }}
                    resizeMode="contain"
                />

                <Text style={styles.welcomeText}>Bem Vindo ao FlaMania</Text>
                <Text style={styles.subtitleText}>
                    Entre para acompanhar o Mengão de perto!
                </Text>

                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    importantForAutofill="yes"
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    importantForAutofill="yes"
                />

                <TouchableOpacity 
                    style={styles.loginButton} 
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Não tem uma conta?{' '}
                    <Text 
                        style={styles.registerLink} 
                        onPress={() => router.push('/registro')}
                    >
                        Registrar
                    </Text>
                </Text>

                {/* Botões sociais - desativados por enquanto */}
                {false && (
                    <>
                        <TouchableOpacity style={styles.googleButton}>
                            <Text style={styles.googleButtonText}>Logar com o Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.appleButton}>
                            <Text style={styles.appleButtonText}>Logar com a Apple</Text>
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
    welcomeText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
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
    loginButton: {
        backgroundColor: '#d00',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    registerText: {
        fontSize: 14,
        marginVertical: 10,
    },
    googleButton: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    googleButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    appleButton: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    appleButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    registerText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
    },
    registerLink: {
        fontWeight: 'bold',
        color: '#d00',
    },

});  