import { Image, StyleSheet,  } from 'react-native';
import {useState, useEffect} from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Contact (){
  
  return(
    <ThemedView style={styles.screen}>
      <ThemedText>Detail du contact</ThemedText>
    </ThemedView>
  ) 
}

const styles = StyleSheet.create({
  screen : {
    backgroundColor : "#244B93",
  }
})