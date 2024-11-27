import { Image, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Header() {
  return (
    <SafeAreaView style={styles.safeContainer}>
    <ThemedView style={styles.titleContainer}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.reactLogo}
      />
      <ThemedText type="title">WEI 2024 CENTRALESUPELEC </ThemedText>
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',        // Aligne le texte et l'image en ligne
    alignItems: 'center',         // Centre le contenu verticalement
    padding: 10,                  // Ajoute un léger padding pour éviter que l'en-tête soit trop haut
    backgroundColor: '#244B93',
    paddingTop: 50,
    color : "#E79140"
  },
  safeContainer: {
    backgroundColor: '#244B93',     // Assure que la couleur de fond couvre tout
  },
  reactLogo: {
    height: 50,                   // Réduit la taille du logo
    width: 50,                    // Assure que le logo reste proportionnel
    marginRight: 10,              // Espace entre le logo et le texte
  },
});
