import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingTop: 50,
  },

  header: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 25,
    color: '#2D3436',
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row', 
    alignItems: 'center', 
  },

  capa: {
    width: 65,
    height: 95,
    borderRadius: 6,
    marginRight: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  infoContainer: {
    flex: 1, 
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
  },

  descricao: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
});