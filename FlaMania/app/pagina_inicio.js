import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNoticias = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=Flamengo&language=pt&sortBy=publishedAt&pageSize=3&apiKey=78c5ee28a8674aa6a5a918e724eaf3f0`
      );
      setNoticias(res.data.articles);
    } catch (e) {
      console.error('Erro ao buscar notícias:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olá André,</Text>
        <Text style={styles.headerSubtitle}>Bem vindo ao FlaMania</Text>
        <Text style={styles.headerDescription}>O seu aplicativo para acompanhar o Mais Querido!</Text>
      </View>

      {/* Seção Torneios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Torneios</Text>
        
        <View style={styles.torneioCard}>
          <Text style={styles.torneioHeader}>CONMEBOL - LIBERTADORES</Text>
          <View style={styles.placarContainer}>
            <Text style={styles.placar}>6 - 1</Text>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.time}>
              <Text style={styles.timeSigla}>FLA</Text>
              <Text style={styles.tempoJogo}>64:20</Text>
            </View>
            <Text style={styles.timeSigla}>VAS</Text>
          </View>
        </View>

        <View style={styles.torneioCard}>
          <Text style={styles.torneioHeader}>2025 SUPERBET</Text>
          <Text style={styles.torneioSubheader}>Mariadana</Text>
          <Text style={styles.torneioContent}>Campeonato Carioca</Text>
        </View>

        <TouchableOpacity style={styles.verTodosButton}>
          <Text style={styles.verTodosText}>VER TODOS</Text>
        </TouchableOpacity>
      </View>

      {/* Próximos Jogos */}
      <View style={styles.section}>
        <View style={styles.jogoCard}>
          <Text style={styles.jogoTitle}>Flamengo VS Real Madrid</Text>
          <Text style={styles.jogoData}>Quarta-Feira, 15 Julho 2025, 16:00H</Text>
        </View>

        <View style={styles.jogoCard}>
          <Text style={styles.jogoTitle}>Flamengo VS River Plate</Text>
          <Text style={styles.jogoData}>Domingo, 23 Novembro 2025, 15:00H</Text>
        </View>
      </View>

      {/* Feed de Notícias */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feed</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#d00" style={styles.loading} />
        ) : (
          noticias.map((noticia, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.noticiaCard}
              onPress={() => Linking.openURL(noticia.url)}
            >
              {noticia.urlToImage && (
                <Image source={{ uri: noticia.urlToImage }} style={styles.noticiaImage} />
              )}
              <Text style={styles.noticiaTitle}>{noticia.title}</Text>
              <Text style={styles.noticiaDescription}>{noticia.description}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d00',
    marginTop: 5,
  },
  headerDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  torneioCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  torneioHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d00',
    marginBottom: 10,
  },
  torneioSubheader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  torneioContent: {
    fontSize: 14,
    color: '#666',
  },
  placarContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  placar: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    alignItems: 'center',
  },
  timeSigla: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  tempoJogo: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  verTodosButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  verTodosText: {
    color: '#d00',
    fontWeight: 'bold',
  },
  jogoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  jogoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  jogoData: {
    fontSize: 14,
    color: '#666',
  },
  noticiaCard: {
    marginBottom: 15,
  },
  noticiaImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  noticiaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  noticiaDescription: {
    fontSize: 14,
    color: '#666',
  },
  loading: {
    marginVertical: 20,
  },
});