import { Image, StyleSheet, TouchableOpacity, Text, View  } from 'react-native';
import {useState, useEffect} from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';


const DEFAULT_ANNONCE_VALUES = {
  genre: '',
  title : '',
  date: '',
  description : '',
  from : ''
};



export default function Annonce({annonce, onPress}) {
  
  const [annonceValue, setAnnonceValue] = useState(DEFAULT_ANNONCE_VALUES);
  const [fetched, setFetched] = useState(false)

  useEffect( () => {
    setAnnonceValue({
    genre: annonce.genre ||'',
    title : annonce.title ||'',
    date: annonce.date || '',
    description : annonce.description || '',
    from : annonce.from || ''
    });
    setFetched(true)
  },[annonce]);





  return (<View style={styles.container}>
    <TouchableOpacity  onPress={onPress}>
{fetched && (
  <ThemedView style={styles.container}>
    <Text style={styles.title}>{annonceValue.title}</Text>
    <Text>De {annonceValue.from}</Text>

  </ThemedView>
)}

    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor : 'lightgrey',
    borderRadius :10,
    margin : 20,
  },
  title : {
    fontSize : 20,
    fontWeight : 'bold'
  }
})
