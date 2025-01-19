import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useContext } from "react";
import UserProvider, { UserContext } from '@/contexts/UserContext'

export default function Profil() {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#244B93',
    justifyContent: 'flex-start',
    width : "100 %" // S'assurer que tout commence en haut
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Aligner à gauche
    marginBottom: 20,
  },
  avatar: {
    width: 80, // Agrandir l'avatar
    height: 80, // Agrandir l'avatar
    borderRadius: 40, // Garder un format circulaire
    marginRight: 15, // Espacement entre l'avatar et le nom
  },
  userName: {
    fontSize: 24, // Agrandir la taille du texte
    fontWeight: 'bold',
    color: '#fff',
  },
});
