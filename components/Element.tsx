import { Image, StyleSheet, TouchableOpacity  } from 'react-native';
import {useState, useEffect} from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';

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
  const {user} = useContext(UserContext)
  
  const [elementValue, setElementValue] = useState(DEFAULT_ELEMENT_VALUES);
  const [fetched, setFetched] = useState(false)

  useEffect( () => {
    setElementValue({
      id : element._id||'',
      genre : element.genre|| '',
      name : element.name|| '',
      date : element.date|| '',
      location : element.location|| '',
      startTime : element.startTime|| '',
      endTime : element.endTime|| '',
      duration : element.duration|| '',
      assos : element.assos || '',
      logo : element.logo|| '',
      description : element.description|| ''
    });
    setFetched(true)
  },[element]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Image */}
      <ThemedView style={styles.imageContainer}>
        <Image
          source={images[element.assos]}
          style={styles.logo}
        />
      </ThemedView>

      {/* Text and Details */}
      <ThemedView style={styles.detailsContainer}>
        <ThemedText style={styles.title}>{element.name}</ThemedText>
        <ThemedText style={styles.detail}>
          <Ionicons name="time-outline" size={18} color="orange" /> {element.startTime}h - {element.endTime}h
        </ThemedText>
        <ThemedText style={styles.detail}>
          <Ionicons name="location-outline" size={18} color="orange" /> {element.location}
        </ThemedText>
      </ThemedView>

      {/* Notification Icon */}
      {user.favoris.includes(elementValue.id)&&<Ionicons name="star" size={32} color="orange" style={styles.icon} /> }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor : '#4867A1', // Bleu similaire à l'image
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : '#4867A1'
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 3,
    justifyContent: 'space-evenly',
    paddingLeft: 10,
    backgroundColor : '#4867A1'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F4A622', // Orange
  },
  detail: {
    fontSize: 16,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  icon: {
    flex: 0.5,
    textAlign: 'right',
  },
});
