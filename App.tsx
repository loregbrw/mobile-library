import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Livro = {
  id: string;
  titulo: string;
  descricao: string;
};

const livros: Livro[] = [
  { id: '1', titulo: 'Livro 1', descricao: 'Descrição do livro 1' },
  { id: '2', titulo: 'Livro 2', descricao: 'Descrição do livro 2' },
  { id: '3', titulo: 'Livro 3', descricao: 'Descrição do livro 3' },
  { id: '4', titulo: 'Livro 4', descricao: 'Descrição do livro 4' },
  { id: '5', titulo: 'Livro 5', descricao: 'Descrição do livro 5' },
  { id: '6', titulo: 'Livro 6', descricao: 'Descrição do livro 6' },
];

type CardProps = {
  titulo: string;
  descricao: string;
};

function Card({ titulo, descricao }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{titulo}</Text>
      <Text style={styles.cardDescription}>{descricao}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biblioteca de Aprendizado</Text>

      <Text style={styles.subtitle}>
        Veja todos os livros da nossa Biblioteca
      </Text>

      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card titulo={item.titulo} descricao={item.descricao} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 18,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    borderRadius: 14,
    marginBottom: 14,
    width: '96%',
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
});