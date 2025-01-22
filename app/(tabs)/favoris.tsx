import { Image, StyleSheet, Platform, Button, ScrollView, Text, View  } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header' ;
import Filters from '@/components/Filters'; 
import Sorts from '@/components/Sorts'; 
import Element from '@/components/Element';
import AnnonceView from '@/components/AnnonceView'
import Annonce from '@/components/Annonce'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';
import Visionneuse from '@/components/Visionneuse';



export default function App() {
      const [favorites, setFavorites] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const {user} = useContext(UserContext)
      const [fetchedFavorites, setFetchedFavorites ] = useState([]);
      
    
      useEffect(() => {
        const fetchFavorites = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://192.168.0.101:3000/api/user/favoris/${user.id}`);
            setFavorites(response.data.favoris); // Assurez-vous que la réponse contient un tableau "favoris"
            setLoading(false);
          } catch (err) {
            setError(err.response?.data || 'Erreur lors de la récupération des favoris');
            setLoading(false);
          }
        };
    
        if (user.id) {
          fetchFavorites();
        }
      }, [user.favoris]); // Dépendance sur userId
  
  
      console.log("favoris",favorites)


      const fetchEventById = async (eventId) => {
        try {
          const response = await axios.get(`http://192.168.0.101:3000/api/event/byId/${eventId}`);
          return response.data;
        } catch (error) {
          console.error('Erreur de récupération de l event:', error);
          return 'Event indisponible';
        }
      };

        useEffect(() => {
          const fetchEvent = async () => {
            const events = [];
            for (const event of favorites) {
              const fetched = await fetchEventById(event);
              events.push(fetched);
            }
            setFetchedFavorites(events);
          };
      
          if (favorites) {
            fetchEvent();
          }
        }, [favorites]);


        console.log("test",favorites)
        console.log("test2",fetchedFavorites)
  
  return (
    <View style={styles.container}>
      <Header />
      < Visionneuse elements={fetchedFavorites} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width : "100%",
    height : "100%",
    backgroundColor: "#244B93",
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  tokenInfo: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
  },
});