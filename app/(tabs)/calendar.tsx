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
import Element2 from '@/components/Element2';
import { useNavigation } from '@react-navigation/native';
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

export default function Calendar(){
  const navigation = useNavigation() ; 
  

 

  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect (() => {
    const interval = setInterval(() => {setCurrentTime(new Date());

    }, 1000);
    
    return () => clearInterval(interval);
  },[])

  const [hour, setHour] = useState(new Date().getHours());
  const [showFilterOptions,setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);


  const changeFilterOptions = () => {
    return () => {
      setShowFilterOptions(!showFilterOptions);
      setShowSortOptions(false);
    }
  }
  const changeSortOptions = () => {
    return () => {
      setShowSortOptions(!showSortOptions);
      setShowFilterOptions(false);
    }
  }  

  const [filteredElements, setFilteredElements] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const filtered = elements.filter((event) =>
      filterOptions.length === 0 || filterOptions.includes(event.genre)
    );
    setFilteredElements(filtered);
  }, [filterOptions]);

  const [sortedElements, setSortedElements] = useState([]);
  const [sortOption, setSortOption] = useState('heure');

  useEffect(() => {
    let sorted = filteredElements ; 
    if (sortOption === 'A-Z'){
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOption === 'Z-A'){
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortOption ===  'genre'){
      sorted.sort((a, b) => a.genre.localeCompare(b.genre));
    }
    if (sortOption ===  'heure'){
      sorted.sort((a, b) => (a.startTime-b.startTime));
    }
    setSortedElements(sorted);

  })


  const postEvent = async () => {
    const eventData = {
      genre: 'acti',
    name : 'ACTI WEI',
    date: '03/04/2004',
    location : 'Musée',
    startTime : '12',
    endTime : '13',
    duration : '1',
    description : ''
    };

    try {
        const response = await fetch('http://10.0.2.2:5000/api/events', {
            method: 'POST', // Méthode de la requête
            headers: {
                'Content-Type': 'application/json' // Indique que les données sont au format JSON
            },
            body: JSON.stringify(eventData) // Convertit l'objet JavaScript en JSON
        });

        // Vérifie si la requête a réussi
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'événement');
        }

        const data = await response.json(); // Parse la réponse JSON
        console.log('Événement créé avec succès:', data);
    } catch (error) {
        console.error('Erreur:', error);
    }
};







  let fullDate = currentTime.toLocaleString('fr-FR',{
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'});

  let fullHour = currentTime.toLocaleString('fr-FR',{
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

  


  return (
    <ThemedView style={styles.pageContainer}>
    <StatusBar style="light"/>
  <Header />
  <ThemedView style ={styles.titleContainer}>
  <ThemedText type = 'title' >WeildWeeks 2025 </ThemedText>
  <ThemedText type = 'title' >WeildWeeks 2025 </ThemedText>
  <ThemedText type = 'title' >WeildWeeks 2025 </ThemedText>
  <ThemedText type = 'title' >WeildWeeks 2025 </ThemedText>
  <ThemedText type = "subtitle">{fullDate}</ThemedText>
  </ThemedView>
  <ThemedView style={styles.buttonContainer}>
    <Button title='gauche' onPress={()=> setHour((hour -1+24)%24)}/>
    <ThemedText style={styles.centeredText}>{hour}h - {hour +1}h </ThemedText>
    <Button title='droite' onPress={()=> setHour((hour +1)%24)}/>
  </ThemedView>

  <ThemedView style={styles.optionContainer}>
    <ThemedText onPress={changeFilterOptions()}>Filtrer par {filterOptions}</ThemedText>
    <ThemedText onPress={changeSortOptions()}>Trier par {sortOption}</ThemedText>
 
  </ThemedView>
  {showFilterOptions&&(<Filters filterOptions ={filterOptions} onFilterChange={(option) => setFilterOptions((prev) => {
          // Ajout ou retrait de l'option
          if (prev.includes(option)) {
            return prev.filter((item) => item !== option);
          } else {
            return [...prev, option];
          }
        })} />)}
  {showSortOptions&&(<Sorts sortOption ={sortOption} onSortChange ={(option =>setSortOption(option))} />)}
  <ScrollView>
  <ThemedView>
    {sortedElements.map(element => <Element2 key={element.id} element={element} onPress={() => navigation.navigate('eventDetail', { element })}/>)}
  </ThemedView>
  </ScrollView>

  </ThemedView>);

}

const styles = StyleSheet.create({
  pageContainer : {
    backgroundColor: '#244B93',
    flex: 1,
    //alignItems: 'flex-start'     // Couleur de fond de la page
  },
  titleContainer: {
    flexDirection: 'column',      // Place les textes l'un au-dessus de l'autre
    alignItems: 'center',
    gap: 8,
    backgroundColor : 'transparent',
    margin : 5,
  },
  buttonContainer : {
    flexDirection : 'row',
    backgroundColor : 'transparent',
    alignItems : 'center',
    gap: 15,
  paddingHorizontal: 90
  },
  centeredText: {
    textAlign: 'center',
    color: 'white',
  },
  optionContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    backgroundColor : 'transparent',
    margin: 15,
    color : 'orange'
  }
});