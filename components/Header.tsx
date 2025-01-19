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
      <ThemedText style={styles.title}>WEI CENTRALESUPELEC </ThemedText>
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',        // Aligne le texte et l'image en ligne
    alignItems: 'center',         // Centre le contenu verticalement
    backgroundColor: '#244B93',
    paddingTop: 25,
  },
  safeContainer: {
    backgroundColor: '#244B93',     // Assure que la couleur de fond couvre tout
  },
  reactLogo: {
    height: 60,                   // Réduit la taille du logo
    width: 60,                    // Assure que le logo reste proportionnel
    marginRight: 10,              // Espace entre le logo et le texte
  },
  title : {
    color : '#E79140',
    fontWeight : 'bold',
    fontSize: 25,
  }
});
