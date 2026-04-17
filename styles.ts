import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F6F8',
      paddingTop: 60,
      paddingHorizontal: 16,
    },
  
    header: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#1A1A1A',
      textAlign: 'center',
    },
  
    subtitle: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginTop: 6,
      marginBottom: 20,
    },
  
    list: {
      paddingBottom: 20,
      alignItems: 'center',
    },
  
    card: {
      backgroundColor: '#fff',
      padding: 18,
      borderRadius: 14,
      marginBottom: 14,
      width: 340,
  
      borderLeftWidth: 5,
      borderLeftColor: '#4A90E2',
  
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
  
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111',
      marginBottom: 6,
    },
  
    cardDescription: {
      fontSize: 14,
      color: '#444',
      lineHeight: 20,
    },
  });