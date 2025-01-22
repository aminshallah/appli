import { Image, StyleSheet, Platform, Button, ScrollView, Text  } from 'react-native';
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
import AnnonceView from '@/components/AnnonceView'
import Annonce from '@/components/Annonce'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';

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

const annonceTest = {
  title : "Bienvenue à CentraleSupélec !",
  genre :"bienvenue",
  from : "La team WW",
  date : "2025-09-01",
  description : "Meilleure ecole du monde oouuuu"
}


export default function Home(){
  const navigation = useNavigation() ; 
  

 
  const { user } = useContext(UserContext);

  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect (() => {
    const interval = setInterval(() => {setCurrentTime(new Date());

    }, 1000);
    
    return () => clearInterval(interval);
  },[])

  const [hour, setHour] = useState(new Date().getHours());
  const [showFilterOptions,setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [fetchedAnnonce, setFetchedAnnonce] = useState([])


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

useEffect(() => {
  axios
      .get(`http://192.168.0.101:3000/api/annonce`) // URL du backend
      .then((response) => {
        console.log('Annonces récupérés :', response.data.annonces);
        setFetchedAnnonce(response.data.annonces)
        // Stocke les événements dans un state
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des événements :', error.message);
      });
    }
  , []);

 {/*}   const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchFavorites = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:3000/api/user/favoris/${user.id}`);
          setFavorites(response.data.favoris); // Assurez-vous que la réponse contient un tableau "favoris"
          setLoading(false);
        } catch (err) {
          setError(err.response?.data || 'Erreur lors de la récupération des favoris');
          setLoading(false);
        }
      };
  
      if (user.id) {
        fetchFavorites();
      }
    }, [user.id]); // Dépendance sur userId


    const [favoritesDisplayed, setFavoritesDisplayed] = useState([]) */}

  return (
    <ThemedView style={styles.pageContainer}>
    <StatusBar style="light"/>
  <Header nom ={"WeildWeeks 2025"} />
  <ThemedView style ={styles.titleContainer}>
  <ThemedText style = {styles.title} > </ThemedText>

  </ThemedView>

  <ThemedView style ={styles.annonceView}>

    <Text style = {styles.annonceTitle}>Annonces</Text>
    <ScrollView horizontal ={true}>

    {fetchedAnnonce.map(annonce => <Annonce annonce={annonce} onPress={() => navigation.navigate('annonceDetail', { annonce: annonce })}/>)}
    </ScrollView>


  </ThemedView>


  <ThemedText style = {styles.subtitle}>{fullDate}</ThemedText>
  {/*<ThemedView style={styles.buttonContainer}>

    <Button title='gauche' onPress={()=> setHour((hour -1+24)%24)}/>
    <ThemedText style={styles.centeredText}>{hour}h - {hour +1}h </ThemedText>
    <Button title='droite' onPress={()=> setHour((hour +1)%24)}/>
  </ThemedView> */}

  <ThemedView style={styles.optionContainer}>
    <ThemedText style = {styles.option} onPress={changeFilterOptions()}>Filtrer par {filterOptions}</ThemedText>
    <ThemedText style = {styles.option} onPress={changeSortOptions()}>Trier par {sortOption}</ThemedText>
 
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
    {sortedElements.map(element => <Element key={element.id} element={element} onPress={() => navigation.navigate('eventDetail', { element })}/>)}
  </ThemedView>
  </ScrollView>

  </ThemedView>);

}

const styles = StyleSheet.create({
  title : {
    color : 'orange',
    fontSize : 30,
    fontWeight : 'bold'
    
  },
  pageContainer : {
    backgroundColor: '#244B93',
    flex: 1,
    width: '100%',
    paddingLeft : 10,
    paddingRight : 10
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
  paddingHorizontal: 90, 
  justifyContent : 'center',
  marginRight : 0
  },
  centeredText: {
    textAlign: 'center',
    color: 'white',
  },
  optionContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    backgroundColor : 'transparent',
    marginLeft:15 ,
    marginRight : 30,
    paddingBottom : 10,
    color : 'orange'
  },
  annonceView : {
    fontSize : 30,
    color : 'orange',
    padding : 15,
    paddingBottom :0
  },
  annonceTitle :{
    fontSize : 25,
    color : 'orange',
    fontWeight : 'bold',
    marginBottom : 10
  },
  subtitle  :{
    fontSize : 25,
    color : 'orange',
    fontWeight : 'bold',
    marginBottom : 10, 
    textAlign : 'center',
    padding : 15
  },
  option : {
    color : 'orange',
    fontSize : 18
  }
});