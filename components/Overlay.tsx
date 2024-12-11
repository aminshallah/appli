import React, { useState, useEffect  } from 'react';
import MapView from 'react-native-maps';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { markers } from '@/assets/markers';
import { elements } from '@/app/(tabs)/calendar';
import Element2 from '@/components/Element2';
import { useNavigation } from '@react-navigation/native';
import selectedMarker from '@/app/(tabs)/maps';

const Overlay = ({elements, location}) =>{
  const navigation = useNavigation() ; 
  return (
    
    <ThemedView style={styles.card}>
      <ScrollView>
      <ThemedText style = {styles.title 

      }>{location}</ThemedText>
      {elements.map(element => <Element2 key={element.id} element={element} onPress={() => navigation.navigate('eventDetail', { element })}/>)}
      
      </ScrollView>
    </ThemedView>
   
  )
}

const styles = StyleSheet.create({
  card : {
    height: 200,
    backgroundColor : 'white',
    position : 'absolute',
    bottom : 50,
    padding : 10,
    left : 10,
    right : 10,
    overflow : 'hidden',
    borderRadius : 20,

  },
  title : {

  }
})

export default Overlay