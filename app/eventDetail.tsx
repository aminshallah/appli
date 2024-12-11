import { Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

export default function eventDetail() {
  const route = useRoute();
  const { elements } = route.params;

  const images = {
    adr: require('@/assets/images/adr.png'),
    wei: require('@/assets/images/wei.png'),
    ce: require('@/assets/images/ce.png'),
    voirie: require('@/assets/images/voirie.png'),
    vr: require('@/assets/images/vr.png'),
  };


  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.headerContainer}>
      <ThemedView style={styles.imageContainer}>
        {elements.assos.map((assos, index) => (
          <Image key={index} source={images[assos]} style={styles.associationLogo} />
        ))}
      </ThemedView>
        <ThemedText type='title' style={styles.eventTitle}>{element.name}</ThemedText>
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
        <Ionicons name="star" size={50} color="orange" />
        <ThemedText style={styles.descriptionText}>{element.description}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#244B93",
    padding: 20,  // Ajoute du padding pour espacer le contenu
  },
  headerContainer: {
    flexDirection: 'row',  // Pour aligner le logo et le titre
    alignItems: 'center',   // Centrer verticalement
    marginBottom: 20,
    backgroundColor : 'transparent'      // Espace sous l'en-tête
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E79140',
    marginLeft: 10,  // Espace entre le logo et le titre
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems : 'center',
 // Espace sous les logos
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
    padding : 20
  },
  detailText: {
    fontSize: 32,
    color: 'white',
    margin: 0,
    padding : 20
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  descriptionText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,  // Ajoute du padding autour de la description
  }
});