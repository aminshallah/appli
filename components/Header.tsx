import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function Header() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.textContainer}>
        <ThemedText style={styles.title}>WeildWeeks 2025</ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#244B93',
    width: '100%', // Prend toute la hauteur de l'écran
    justifyContent: 'flex-start', // Place le contenu en haut
    alignItems: 'center',
    paddingTop : 25,
    paddingBottom : 10 // Centre le texte horizontalement
  },
  textContainer: {
    width: '100%', // Prend toute la largeur
    justifyContent: 'center', // Centre verticalement si nécessaire
    alignItems: 'center', // Centre horizontalement
  },
  title: {
    color: '#E79140',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center', // Centrer le texte
  },
});
