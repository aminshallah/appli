import { Image, StyleSheet, Platform, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header' ;

export default function Sorts({onSortChange, sortOption}) {
  
  return(
    <ThemedView style = {styles.sortsContainer}>
      <ThemedText onPress={()=>onSortChange('heure')} style={sortOption ==='heure' ? styles.activeFilter : styles.inactiveFilter}>Heure</ThemedText>
      <ThemedText onPress={()=>onSortChange('A-Z')} style={sortOption ==='A-Z' ? styles.activeFilter : styles.inactiveFilter}>A à Z</ThemedText>
      <ThemedText onPress={()=>onSortChange('Z-A')} style={sortOption ==='Z-A' ? styles.activeFilter : styles.inactiveFilter}>Z à A</ThemedText>
      <ThemedText onPress={()=>onSortChange('genre')} style={sortOption ==='genre' ? styles.activeFilter : styles.inactiveFilter}>Genre</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  sortsContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',  // Assure un espacement uniforme entre les éléments
    alignItems: 'center',
    margin : 5,
    // Pour s'assurer que le conteneur utilise toute la largeur de l'écran
  },
  activeFilter: {
    color: 'orange', // Couleur orange pour les filtres actifs
  },
  inactiveFilter: {
    color: 'black', // Couleur noire pour les filtres inactifs
  }
});