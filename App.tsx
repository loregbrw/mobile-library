import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
import { styles } from './src/style';
import { livros } from './src/livro';

export default function App() {

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.header}>📚 Minha Biblioteca</Text>

      {livros.map(function(livro) {
        return (
          <View key={livro.id} style={styles.card}>
            <Image source={livro.capa} style={styles.capa} resizeMode="cover" />
            
            <View style={styles.infoContainer}>
              <Text style={styles.titulo}>{livro.titulo}</Text>
              <Text style={styles.descricao}>{livro.descricao}</Text>
            </View>
          </View>
        );
      })}

      <StatusBar style="auto" />
    </ScrollView>
  );
}