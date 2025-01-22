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

export default function Visionneuse({elements}) {
  const navigation = useNavigation();
  const [showFilterOptions, setShowFilterOptions] = useState(false);
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
    const filtered = elements ? elements.filter((event) =>
      filterOptions.length === 0 || filterOptions.includes(event?.genre)
    ) : [];
    setFilteredElements(filtered);
  }, [elements, filterOptions]);

  const [sortedElements, setSortedElements] = useState([]);
  const [sortOption, setSortOption] = useState('heure');

  useEffect(() => {
    if (!filteredElements) return;
    
    let sorted = [...filteredElements];
    
    if (sortOption === 'A-Z') {
      sorted.sort((a, b) => (b?.name || '').localeCompare(a?.name || ''));
    }
    else if (sortOption === 'Z-A') {
      sorted.sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
    }
    else if (sortOption === 'genre') {
      sorted.sort((a, b) => (a?.genre || '').localeCompare(b?.genre || ''));
    }
    else if (sortOption === 'heure') {
      sorted.sort((a, b) => {
        const timeA = a?.startTime ? parseInt(a.startTime, 10) : -1;
        const timeB = b?.startTime ? parseInt(b.startTime, 10) : -1;
        return timeA - timeB;
      });
    }
    
    setSortedElements(sorted);
  }, [filteredElements, sortOption]);

  return (
    <ThemedView style={styles.pageContainer}>
      <StatusBar style="light"/>
      
      <ThemedView style={styles.optionContainer}>
        <ThemedText style={styles.options} onPress={changeFilterOptions()}>
          Filtrer par {filterOptions.join(', ')}
        </ThemedText>
        <ThemedText style={styles.options} onPress={changeSortOptions()}>
          Trier par {sortOption}
        </ThemedText>
      </ThemedView>

      {showFilterOptions && (
        <Filters 
          filterOptions={filterOptions} 
          onFilterChange={(option) => setFilterOptions((prev) => {
            if (prev.includes(option)) {
              return prev.filter((item) => item !== option);
            } else {
              return [...prev, option];
            }
          })} 
        />
      )}

      {showSortOptions && (
        <Sorts 
          sortOption={sortOption} 
          onSortChange={(option) => setSortOption(option)} 
        />
      )}

      <ScrollView>
        <ThemedView>
          {sortedElements.map(element => 
            element ? (
              <Element 
                key={element.id} 
                element={element} 
                onPress={() => navigation.navigate('eventDetail', { element })}
              />
            ) : null
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
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
  },
  options : {
    color : 'white'
  }
});