import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header' ;
import Visionneuse from '@/components/Visionneuse';
import axios from 'axios';

const getSelectedDate = (selectedDay) => {
  const date = new Date(2025, 8, selectedDay); // Crée une date avec le mois (0-indexed) et le jour
  return date.toISOString().split('T')[0]; // Format ISO 8601 : YYYY-MM-DD
};

const adr = {
  id : '1',
  genre: 'barspe',
  name : 'BARSPE MUSEE',
  date: '03/04/2004',
  location : 'Musée',
  startTime : '17',
  endTime : '18',
  duration : '1',
  assos : ['adr'],
  logo : 'adr',
  description : ''
}
const wei = {
  id : '2',
  genre: 'acti',
  name : 'ACTI WEI',
  date: '03/04/2004',
  location : 'Moulon',
  startTime : '12',
  endTime : '13',
  duration : '1',
  assos : ['wei'],
  logo : 'wei',
  description : 'Vienakjhzmlfqsmlkjf qslmk jgslqmklmqskjdflqskdjf qlskf qlskfd lqskdfl kqsjfksj lfmksqlfkjsq mlfkjsq mkf qsmlkfj qlskj'
}

const ce = {
  id : '3',
  genre: 'gouter',
  name : 'GOUTER CE',
  date: '03/04/2004',
  location : 'Carré des sciences',
  startTime : '16',
  endTime : '18',
  duration : '2',
  assos : ['ce'],
  logo : 'ce',
  description : ''
}

const voirie = {
  id : '4',
  genre: 'soiree',
  name : 'NANAUTO ',
  date: '03/04/2004',
  location : 'Bouygues',
  startTime : '22',
  endTime : '2',
  duration : '4',
  assos : ['voirie'],
  logo : 'voirie',
  description : ''
}


const vr = {
  id : '5',
  genre: 'acti',
  name : 'LAN VR ',
  date: '03/04/2004',
  location : 'Bouygues',
  startTime : '18',
  endTime : '20',
  duration : '2',
  assos : ['vr'],
  logo : 'vr',
  description : ''
}

export const elements = [adr,wei,ce,voirie,vr]

export default function Calendrier() {
  const weeks = [
    ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    ['28', '29', '30', '31', '1', '2', '3'],
    ['4', '5', '6', '7', '8', '9', '10'],
    ['11', '12', '13', '14', '15', '16', '17'],
  ];

  const outOfMonthDays = ['28', '29', '30', '31'];
  const [selectedDay, setSelectedDay] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date())
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());
  const [eventsFetched, setEventsFetched] = useState([])

  const date = currentTime.toLocaleString('fr-FR',{
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'});

    console.log(date)
    console.log(currentTime)


    console.log(month)

    useEffect(() => {if (month==9){
      setSelectedDay(day)
    } },[selectedDay])

    useEffect(() => {
      if (selectedDay) {
        const selectedDate = getSelectedDate(selectedDay, month, currentTime.getFullYear());

    console.log(selectedDay)
    console.log(selectedDay)

    console.log(selectedDay, date)
    axios
      .get(`http://localhost:3000/api/event/by-date?date=${selectedDate}`) // URL du backend
      .then((response) => {
        console.log('Événements récupérés :', response.data.events);
        setEventsFetched(response.data.events)
        // Stocke les événements dans un state
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des événements :', error.message);
      });
  }
}, [selectedDay]);



    const handleDayPress = (day) => {
      if (!outOfMonthDays.includes(day)) {
        setSelectedDay(parseInt(day));  // Assure-toi de convertir en entier
      }
    };

    
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>Weild Weeks 2025</ThemedText>
          <View style={styles.calendar}>
            <View style={styles.weekRow}>
              {weeks[0].map((day, index) => (
                <Text key={index} style={styles.dayHeader}>
                  {day}
                </Text>
              ))}
            </View>
    
            {weeks.slice(1).map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekRow}>
                {week.map((date, dateIndex) => (
                  <TouchableOpacity
                    key={dateIndex}
                    onPress={() => handleDayPress(date)}
                    disabled={outOfMonthDays.includes(date)}
                    style={[
                      styles.dayContainer,
                      selectedDay === parseInt(date) && styles.selectedDayContainer,
                    ]}
                  >
                    <Text
                      style={[
                        styles.day,
                        outOfMonthDays.includes(date) && styles.outOfMonthDay,
                        selectedDay === parseInt(date) && styles.selectedDayText,
                      ]}
                    >
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          <Text>{eventsFetched.length} évenements ce jour ci </Text>
          <Visionneuse elements={eventsFetched} />
        </ThemedView>
      </SafeAreaView>
    )}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#244B93',
  },
  title: {
    color: 'orange',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8, // Réduction de l'écart sous le titre
  },
  calendar: {
    backgroundColor: '#4A69A2',
    borderRadius: 10,
    padding: 8, // Réduction du padding global
    marginHorizontal: 20,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 3, // Réduction de l'écart entre les lignes
  },
  dayHeader: {
    color: 'white',
    fontSize: 11, // Réduction de la taille du texte
    fontWeight: 'bold',
  },
  dayContainer: {
    paddingVertical: 3, // Réduction du padding vertical
    borderRadius: 12, // Ajustement pour un look plus compact
  },
  day: {
    color: 'white',
    fontSize: 12, // Réduction de la taille du texte
    textAlign: 'center',
    width: 25, // Réduction de la largeur
    fontWeight :'bold',
  },
  selectedDayContainer: {
    backgroundColor: 'orange',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  outOfMonthDay: {
    color: 'grey',
  },
});
