import { Image, StyleSheet, Platform, Button, ScrollView,  } from 'react-native';
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
import Element2 from '@/components/Element2';
import { useNavigation } from '@react-navigation/native';

export default function Calendar() {
  const navigation = useNavigation();

  // Gestion des événements par jour
  const eventsByDay = {
    '2024-09-09': [
      {
        id: '1',
        genre: 'barspe',
        name: 'BARSPE MUSEE',
        date: '2024-09-09',
        location: 'Musée',
        startTime: '17',
        endTime: '18',
        duration: '1',
        assos: ['adr'],
        logo: 'adr',
        description: '',
      },
      {
        id: '2',
        genre: 'acti',
        name: 'ACTI WEI',
        date: '2024-09-09',
        location: 'Musée',
        startTime: '12',
        endTime: '13',
        duration: '1',
        assos: ['wei'],
        logo: 'wei',
        description: 'Description de l\'activité.',
      },
    ],
    '2024-09-10': [
      {
        id: '3',
        genre: 'game',
        name: 'Escape Game',
        date: '2024-09-10',
        location: 'Carré des sciences',
        startTime: '10',
        endTime: '12',
        duration: '2',
        assos: ['esc'],
        logo: 'esc',
        description: '',
      },
      {
        id: '4',
        genre: 'sport',
        name: 'Tournoi de sport BDS',
        date: '2024-09-10',
        location: 'Plaine des sports',
        startTime: '15',
        endTime: '17',
        duration: '2',
        assos: ['bds'],
        logo: 'bds',
        description: '',
      },
    ],
    '2024-09-11': [
      {
        id: '5',
        genre: 'bar',
        name: 'Barspé ForumxCU',
        date: '2024-09-11',
        location: 'Carré des sciences',
        startTime: '14',
        endTime: '16',
        duration: '2',
        assos: ['cu'],
        logo: 'cu',
        description: '',
      },
    ],
    '2024-09-12': [
      {
        id: '6',
        genre: 'beach',
        name: 'Tournoi beach CheerUp',
        date: '2024-09-12',
        location: 'Derrière Rez 2C',
        startTime: '16',
        endTime: '18',
        duration: '2',
        assos: ['cheerup'],
        logo: 'cheerup',
        description: '',
      },
    ],
  };

  // État pour le jour sélectionné
  const [selectedDay, setSelectedDay] = useState(Object.keys(eventsByDay)[0]); // Par défaut, le premier jour avec des événements
  const [isGlobalView, setIsGlobalView] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [sortOption, setSortOption] = useState('heure');

  const currentEvents = eventsByDay[selectedDay] || [];
  const allEvents = Object.keys(eventsByDay).flatMap((date) => eventsByDay[date]);

  // Change le jour sélectionné
  const changeDay = (direction) => {
    const newDate = new Date(selectedDay);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDay(newDate.toISOString().split('T')[0]);
  };

  // Tri des événements
  const sortedElements = [...(isGlobalView ? allEvents : currentEvents)].sort((a, b) => {
    if (sortOption === 'A-Z') return a.name.localeCompare(b.name);
    if (sortOption === 'Z-A') return b.name.localeCompare(a.name);
    if (sortOption === 'genre') return a.genre.localeCompare(b.genre);
    if (sortOption === 'heure') return a.startTime - b.startTime;
    return 0;
  });

  
  return (
    <ThemedView style={styles.pageContainer}>
      <StatusBar style="light" />
      <Header />

      {/* Conteneur des titres */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">WeildWeeks 2025</ThemedText>
        {!isGlobalView && (
          <ThemedText type="subtitle">
            {new Date(selectedDay).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </ThemedText>
        )}
      </ThemedView>

      {/* Navigation entre les jours */}
      {!isGlobalView && (
        <ThemedView style={styles.buttonContainer}>
          <Button title="Jour précédent" onPress={() => changeDay(-1)} />
          <Button title="Jour suivant" onPress={() => changeDay(1)} />
        </ThemedView>
      )}

      {/* Options de tri et de filtre */}
      <ThemedView style={styles.optionContainer}>
        <ThemedView style={styles.buttonWrapper}>
          <Button
            title="Voir tous les événements"
            onPress={() => navigation.navigate('GlobalView')}
          />
        </ThemedView>
        <ThemedText
          style={styles.optionText}
          onPress={() => setShowFilterOptions(!showFilterOptions)}
        >
          Filtrer par {filterOptions.join(', ') || 'aucun'}
        </ThemedText>
        <ThemedText
          style={styles.optionText}
          onPress={() => setShowSortOptions(!showSortOptions)}
        >
          Trier par {sortOption}
        </ThemedText>
      </ThemedView>
      

      {/* Composants de filtre et de tri */}
      {showFilterOptions && (
        <Filters
          filterOptions={filterOptions}
          onFilterChange={(option) =>
            setFilterOptions((prev) =>
              prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
            )
          }
        />
      )}
      {showSortOptions && (
        <Sorts
          sortOption={sortOption}
          onSortChange={(option) => setSortOption(option)}
        />
      )}

      {/* Liste des événements */}
      <ScrollView>
        <ThemedView style={styles.eventListContainer}>
          {sortedElements.map((event) => (
            <Element2
              key={event.id} // Correction de l'erreur de clé
              element={event}
              onPress={() =>
                navigation.navigate('eventDetail', { event })
              }
            />
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#244B93',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    margin: 10,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  eventListContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});