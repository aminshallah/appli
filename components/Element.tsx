import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Element() {
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.reactLogo}
      />
      <ThemedView style={styles.textContainer}>
        <ThemedText type='title' style={styles.titleText}>Acti WEI</ThemedText>
        
        <ThemedText> <Ionicons name="time-outline" size={22} color="orange" />18h-19h</ThemedText>
        <ThemedText><Ionicons name="navigate-outline" size={22} color="orange" />Carré des sciences</ThemedText>
      </ThemedView>
      <ThemedView style={styles.iconContainer}>
      <Ionicons name="star" size={32} color="orange" />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',       // Arrange l'image et le texte en ligne
    alignItems: 'center',        // Centre verticalement
    padding: 10,
    margin: 10,
    backgroundColor: 'lightgrey',
  },
  reactLogo: {
    height: 80,                  // Hauteur augmentée pour remplir presque tout le container
    width: 80,                   // Largeur proportionnelle pour que l'image garde ses dimensions
    marginRight: 20,             // Augmente l'espace entre l'image et le texte
  },
  textContainer: {
    flexDirection: 'column',     // Arrange les textes en colonne à droite de l'image
    justifyContent: 'center',    // Centre les textes verticalement
    backgroundColor : 'transparent'
  },
  titleText: {
    color: '#E79140',
    fontWeight: 'bold',
    marginBottom: 4,             // Espace entre le titre et les détails
  },
  iconContainer :{
    flex : 1,
    alignItems : 'center',
    backgroundColor : 'transparent'
  }
});
