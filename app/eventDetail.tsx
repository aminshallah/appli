import { Image, StyleSheet } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from '@/contexts/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';

export default function EventDetail() {
  const route = useRoute();
  const { element } = route.params;

  const { user, setUser  } = useContext(UserContext);

  const images = {
    adr: require('@/assets/images/adr.png'),
    wei: require('@/assets/images/wei.png'),
    ce: require('@/assets/images/ce.png'),
    voirie: require('@/assets/images/voirie.png'),
    vr: require('@/assets/images/vr.png'),
  };

  const [estFavoris, setEstFavori] = useState(false);

  useEffect(() => {
    const estDansFavoris = user.favoris.includes(element._id);
    console.log("test d'user includes",user.favoris.includes(element._id))
    console.log("elementid",element._id)
    console.log(estDansFavoris)
    setEstFavori(estDansFavoris);
    const tmp = "caca"
    console.log(tmp)
    console.log(user.favoris)
    console.log("Favoris:", estDansFavoris, "pour l'élément:", element._id); // Vérifie ici
  }, [user, element._id]); // Ajoute les dépendances pour que l'effet se déclenche correctement


  const addToFavorisContext = (eventId) => {
    const updatedFavoris = [...user.favoris, eventId];
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      idVR: user.idVR,
      id: user.id,
      familyId: user.familyId,
      familyMembers : user.familyMembers,
      familyName : user.familyName,
      shotgun: user.shotgun,
      role: user.role,
      favoris : updatedFavoris
    };
    setUser(newUser)
  };


  const removeFromFavorisContext = (eventId) => {
    const updatedFavoris = user.favoris.filter((id) => id !== eventId);
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      idVR: user.idVR,
      id: user.id,
      familyId: user.familyId,
      familyMembers : user.familyMembers,
      familyName : user.familyName,
      shotgun: user.shotgun,
      role: user.role,
      favoris : updatedFavoris
    };
    setUser(newUser)
  };



  const addToFavorites = async (userId, eventId) => {
    try {
      const response = await axios.post(
        'http://192.168.0.101:3000/api/user/favoris',  // Remplace par l'URL de ton serveur
        {
          userId: userId,
          eventId: eventId
        }
      );
  
      console.log('Réponse du serveur:', response.data);
      return response.data;
  
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux favoris:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const removeFromFavorites = async (userId, eventId) => {
    try {
      const response = await axios.delete('http://192.168.0.101:3000/api/user/delete/favoris', {
        data: { userId, eventId }
      });
  
      console.log('Réponse du serveur:', response.data);
      return response.data;
  
    } catch (error) {
      console.error('Erreur lors du retrait des favoris:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      const response = await removeFromFavorites(user.id, element._id);
      if (response.message === 'Élément retiré des favoris avec succès') {
        removeFromFavorisContext(element._id);
        setEstFavori(false);  // Mise à jour de l'état après retrait des favoris
      }
    } catch (error) {
      console.error("Erreur lors du retrait des favoris:", error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const response = await addToFavorites(user.id, element._id);
      if (response.message === 'Élément ajouté aux favoris avec succès') {
        addToFavorisContext(element._id);
        setEstFavori(true);  // Mise à jour de l'état après ajout aux favoris
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris:", error);
    }
  };

  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.imageContainer}>
          {element.assos && (
            <Image
              key={element.assos}
              source={images[element.assos]}
              style={styles.associationLogo}
            />
          )}
        </ThemedView>
        <ThemedText type="title" style={styles.eventTitle}>{element.name}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.detailContainer}>
        <ThemedText style={styles.detailText}>
          <Ionicons name="time-outline" size={40} color="orange" /> {element.startTime}h - {element.endTime}h
        </ThemedText>
        <ThemedText style={styles.detailText}>
          <Ionicons name="navigate-outline" size={40} color="orange" /> {element.location}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.iconContainer}>
        <Ionicons
          name={estFavoris ? "star" : "star-outline"}
          size={50}
          color="orange"
          onPress={estFavoris ? handleRemoveFromFavorites : handleAddToFavorites}
        />
        <ThemedText style={styles.descriptionText}>{element.description}</ThemedText>
      </ThemedView>
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#244B93",
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E79140',
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  associationLogo: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  detailContainer: {
    flexDirection: 'column',
    margin: 20,
    backgroundColor: 'transparent',
    padding: 20,
  },
  detailText: {
    fontSize: 32,
    color: 'white',
    margin: 0,
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  descriptionText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
