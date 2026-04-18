import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Image 
} from 'react-native';

const Livros = [
  { 
    id: '1', 
    titulo: 'O Senhor dos Anéis', 
    autor: 'J.R.R. Tolkien',
    descricao: 'Uma jornada épica pela Terra Média para destruir o Um Anel.', 
    categoria: 'Fantasia',
    cor: '#f59e0b' 
  },
  { 
    id: '2', 
    titulo: '1984', 
    autor: 'George Orwell',
    descricao: 'Uma distopia assustadora sobre vigilância governamental e totalitarismo.', 
    categoria: 'Ficção Científica',
    cor: '#e11d48' 
  },
  { 
    id: '3', 
    titulo: 'Dom Casmurro', 
    autor: 'Machado de Assis',
    descricao: 'Bentinho narra sua história e sua dúvida eterna sobre a fidelidade de Capitu.', 
    categoria: 'Clássico Brasileiro',
    cor: '#10b981' 
  },
  { 
    id: '4', 
    titulo: 'O Hobbit', 
    autor: 'J.R.R. Tolkien',
    descricao: 'Bilbo Bolseiro sai de sua zona de conforto para uma aventura com anões e um dragão.', 
    categoria: 'Fantasia',
    cor: '#38bdf8' 
  },
  { 
    id: '5', 
    titulo: 'Admirável Mundo Novo', 
    autor: 'Aldous Huxley',
    descricao: 'Uma sociedade moldada pela genética e pelo consumo condicionado.', 
    categoria: 'Distopia',
    cor: '#a855f7' 
  },
  { 
    id: '6', 
    titulo: 'Sapiens', 
    autor: 'Yuval Noah Harari',
    descricao: 'Uma breve história da humanidade, do surgimento da espécie até os dias atuais.', 
    categoria: 'História / Ciência',
    cor: '#a4bad8ff' 
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.headerSection}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>📚</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.libraryName}>Biblioteca</Text>
            <Text style={styles.libraryStatus}>6 livros catalogados</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Acervo Disponível</Text>

        {Livros.map((livro) => (
          <View key={livro.id} style={styles.card}>
            <View style={[styles.cardIndicator, { backgroundColor: livro.cor }]} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: '#f8fafc' }]}>{livro.titulo}</Text>
                <View style={[styles.tag, { borderColor: livro.cor }]}>
                  <Text style={[styles.tagText, { color: livro.cor }]}>{livro.categoria}</Text>
                </View>
              </View>
              <Text style={styles.cardAuthor}>por {livro.autor}</Text>
              <Text style={styles.cardDescription}>{livro.descricao}</Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconEmoji: {
    fontSize: 32,
  },
  headerText: {
    marginLeft: 15,
  },
  libraryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  libraryStatus: {
    fontSize: 14,
    color: '#38bdf8',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 15,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
  },
  infoTitle: {
    color: '#f8fafc',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  infoText: {
    color: '#94a3b8',
    lineHeight: 22,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardIndicator: {
    width: 6,
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  cardAuthor: {
    fontSize: 13,
    color: '#38bdf8',
    fontStyle: 'italic',
    marginBottom: 8,
    marginTop: 2,
  },
  cardDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  tag: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});