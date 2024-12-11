import { Image, StyleSheet, Platform, Button, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import Sorts from '@/components/Sorts';
import Element2 from '@/components/Element2';
import { useNavigation } from '@react-navigation/native';

// Définition des événements
const adr = {
  id: '1',
  genre: 'barspe',
  name: 'BARSPE MUSEE',
  date: '03/04/2004',
  location: 'Musée',
  startTime: '17',
  endTime: '18',
  duration: '1',
  assos: ['adr'],
  logo: 'adr',
  description: '',
};
const wei = {
  id: '2',
  genre: 'acti',
  name: 'ACTI WEI',
  date: '03/04/2004',
  location: 'Moulon',
  startTime: '12',
  endTime: '13',
  duration: '1',
  assos: ['wei'],
  logo: 'wei',
  description: 'Description de l\'activité.',
};
const ce = {
  id: '3',
  genre: 'gouter',
  name: 'GOUTER CE',
  date: '03/04/2004',
  location: 'Carré des sciences',
  startTime: '16',
  endTime: '18',
  duration: '2',
  assos: ['ce'],
  logo: 'ce',
  description: '',
};
const voirie = {
  id: '4',
  genre: 'soiree',
  name: 'NANAUTO',
  date: '03/04/2004',
  location: 'Bouygues',
  startTime: '22',
  endTime: '2',
  duration: '4',
  assos: ['voirie'],
  logo: 'voirie',
  description: '',
};
const vr = {
  id: '5',
  genre: 'acti',
  name: 'LAN VR',
  date: '03/04/2004',
  location: 'Bouygues',
  startTime: '18',
  endTime: '20',
  duration: '2',
  assos: ['vr'],
  logo: 'vr',
  description: '',
};

export const elements = [adr, wei, ce, voirie, vr];

// Fonction pour regrouper les événements par jour
const groupEventsByDate = (events) => {
  return events.reduce((acc, event) => {
    const date = event.date; // Utiliser la date de l'événement
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event); // Ajouter l'événement sous la clé correspondant à la date
    return acc;
  }, {});
};

export default function Calendar() {
  const navigation = useNavigation();

  // Groupement des événements
  const eventsByDay = groupEventsByDate(elements);

  // État pour le jour sélectionné
  const [selectedDay, setSelectedDay] = useState(Object.keys(eventsByDay)[0]); // Par défaut, le premier jour
  const [isGlobalView, setIsGlobalView] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [sortOption, setSortOption] = useState('heure');

  const currentEvents = eventsByDay[selectedDay] || [];
  const allEvents = Object.keys(eventsByDay).flatMap((date) => eventsByDay[date]);

  // Change le jour sélectionné
  const changeDay = (direction) => {
    const dates = Object.keys(eventsByDay).sort(); // Trier les dates
    const currentIndex = dates.indexOf(selectedDay);
    const newIndex = Math.max(0, Math.min(dates.length - 1, currentIndex + direction));
    setSelectedDay(dates[newIndex]);
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
            onPress={() => setIsGlobalView(!isGlobalView)}
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

      {/* Liste des événements */}
      <ScrollView>
        <ThemedView style={styles.eventListContainer}>
          {sortedElements.map((event) => (
            <Element2
              key={event.id}
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