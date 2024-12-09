import { Image, StyleSheet, TouchableOpacity  } from 'react-native';
import {useState, useEffect} from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';


const DEFAULT_ELEMENT_VALUES = {
  id : '',
  genre: '',
  name : '',
  date: '',
  location : '',
  startTime : '',
  endTime : '',
  duration : '',
  assos : '',
  logo : '',
  description : ''
};

const images = {
  adr : require('@/assets/images/adr.png'),
  wei : require('@/assets/images/wei.png'),
  ce : require('@/assets/images/ce.png'),
  voirie : require('@/assets/images/voirie.png'),
  vr : require('@/assets/images/vr.png'),
}

export default function Element({element, onPress}) {
  
  const [elementValue, setElementValue] = useState(DEFAULT_ELEMENT_VALUES);

  useEffect( () => {
    setElementValue({
      id : '',
      genre : element.genre,
      name : element.name,
      date : element.date,
      location : element.location,
      startTime : element.startTime,
      endTime : element.endTime,
      duration : element.duration,
      assos : element.assos,
      logo : element.logo,
      description : element.description
    })
  },[element]);




  return (
    
    <TouchableOpacity style={styles.container} onPress={onPress}>


      {(element.assos).map((assos =>(
        <Image source={images[assos]}
        style={styles.reactLogo}
      />
      )))}
      <ThemedView style={styles.textContainer}>
        <ThemedText type='title' style={styles.titleText}>{element.name}</ThemedText>
        
        <ThemedText> <Ionicons name="time-outline" size={22} color="orange" />{element.startTime}h-{element.endTime}h</ThemedText>
        <ThemedText><Ionicons name="navigate-outline" size={22} color="orange" />{element.location}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.iconContainer}>
      <Ionicons name="star" size={32} color="orange" />
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',       // Arrange l'image et le texte en ligne
    alignItems: 'center',        // Centre verticalement
    padding: 10,
    margin: 10,
    backgroundColor: 'lightgrey',
    borderRadius :20,
    overflow : 'hidden',
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
