import { SectionList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Element2 from '@/components/Element2';

export default function GlobalView() {
  const navigation = useNavigation();

  // Données d'exemple
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

  // Transformer les données en sections
  const sections = Object.keys(eventsByDay).map((date) => ({
    title: new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }),
    data: eventsByDay[date],
  }));

  return (
    <ThemedView style={styles.pageContainer}>
      <Button title="Retour" onPress={() => navigation.goBack()} />
      <ThemedText style={styles.title}>Vue globale des événements</ThemedText>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedText style={styles.sectionHeader}>{title}</ThemedText>
        )}
        renderItem={({ item }) => (
          <Element2
            element={item}
            onPress={() => navigation.navigate('eventDetail', { event: item })}
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#244B93',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#1B3C70',
    padding: 5,
  },
});