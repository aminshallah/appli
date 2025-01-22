import { Image, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';




export default function eventDetail() {
  const route = useRoute();
  const { annonce } = route.params;



  return (
    <ThemedView style={styles.container}>

      <ThemedText style={styles.title} > {annonce.title}</ThemedText>



      <View style={styles.entete}>
        <Text style={styles.from}>De {annonce.from}</Text>
        <Text style={styles.date}>  Date: {format(annonce.date,'MMMM dd, yyyy')}</Text>
      </View>

      <View>
        <Text style = {styles.description}>   {annonce.description}</Text>
      </View> 

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    width : "100%",
    height : "100%",
    padding : 20
  },
  title : {
    alignItems : 'center',
    justifyContent : 'center',
    textAlign : 'center',
    fontSize : 30,
    fontWeight : 'bold',
    color : 'orange',
    margin : 10,
    padding : 10
  },
  entete : {
    flexDirection :'row',
    justifyContent : 'space-between',
    alignContent : 'center',
    paddingBottom : 10,
  },
  from : {
    color : 'orange',

    fontSize : 14,
  },
  date : {
    color :'orange',
    fontSize : 14
  },

  description : {
    color : 'white',
    marginTop :10
  }

})