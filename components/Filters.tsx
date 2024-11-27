import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Filters({ onFilterChange, filterOptions }) {
  return (
    <ThemedView style={styles.filtersContainer}>
      <ThemedText
        onPress={() => onFilterChange('acti')}
        style={filterOptions.includes('acti') ? styles.activeFilter : styles.inactiveFilter}
      >
        Actis
      </ThemedText>
      <ThemedText
        onPress={() => onFilterChange('barspe')}
        style={filterOptions.includes('barspe') ? styles.activeFilter : styles.inactiveFilter}
      >
        Barspés
      </ThemedText>
      <ThemedText
        onPress={() => onFilterChange('gouter')}
        style={filterOptions.includes('gouter') ? styles.activeFilter : styles.inactiveFilter}
      >
        Goûters
      </ThemedText>
      <ThemedText
        onPress={() => onFilterChange('soiree')}
        style={filterOptions.includes('soiree') ? styles.activeFilter : styles.inactiveFilter}
      >
        Soirées
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',  // Assure un espacement uniforme entre les éléments
    alignItems: 'center',
    margin : 5,
  },
  activeFilter: {
    color: 'orange', // Couleur orange pour les filtres actifs
  },
  inactiveFilter: {
    color: 'black', // Couleur noire pour les filtres inactifs
  },
});

