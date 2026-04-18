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


const Cards = [
  { id: '1', titulo: 'OutSystems', descricao: 'Desenvolvimento de aplicações com OutSystems na Bosch.', cor: '#e11d48' },
  { id: '2', titulo: 'Full Stack Dev', descricao: 'Experiência com C, Python, C#, JavaScript, SQL e outra tecnologias.', cor: '#38bdf8' },
  { id: '3', titulo: 'Idiomas', descricao: 'Português nativo e Inglês avançado.', cor: '#a855f7' },
  { id: '4', titulo: 'Data Analytics', descricao: 'Experiência com bancos de dados, tratamento de dados e Power BI.', cor: '#10b981' },
  { id: '5', titulo: 'Voluntariado', descricao: 'Trabalho voluntário no Instituto Robert Bosch, ensinando programação.', cor: '#f59e0b' },
  { id: '6', titulo: 'Trajetória', descricao: 'Iniciei como Aprendiz na Bosch e agora sigo como Meio Oficial, antes estava no planejamento trabalhando com análise de dados e atualmente estou desenvolvendo aplicações focadas em IA.', cor: '#a4bad8ff' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.profileSection}>
          <Image 
            source={require('./assets/perfil.jpeg')} 
            style={styles.profileImage} 
          />
          <View style={styles.headerText}>
            <Text style={styles.userName}>Adrian Gobara Falci</Text>
            <Text style={styles.userRole}>Software Developer</Text>
          </View>
        </View>

        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>Sobre mim</Text>
          <Text style={styles.aboutText}>
            Desenvolvedor Full Stack, no momento trabalhando com OutSystems. 
            Atualmente trabalho na Bosch em um time focado em IA.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Skills & Experiências</Text>

        {Cards.map((skill) => (
          <View key={skill.id} style={styles.card}>
            <View style={[styles.cardIndicator, { backgroundColor: skill.cor }]} />
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: skill.cor }]}>{skill.titulo}</Text>
              <Text style={styles.cardDescription}>{skill.descricao}</Text>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#38bdf8',
  },
  headerText: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  userRole: {
    fontSize: 14,
    color: '#38bdf8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  aboutBox: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
  },
  aboutTitle: {
    color: '#f8fafc',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  aboutText: {
    color: '#94a3b8',
    lineHeight: 20,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardIndicator: {
    width: 5,
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
  },
});