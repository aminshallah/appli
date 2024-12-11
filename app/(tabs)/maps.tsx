import React, { useState, useEffect  } from 'react';
import MapView from 'react-native-maps';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { markers } from '@/assets/markers';
import { elements } from '@/app/(tabs)/calendar';
import Element2 from '@/components/Element2';
import Overlay  from '@/components/Overlay';
import { useNavigation } from '@react-navigation/native';

const INITIAL_REGION = {
  latitude: 48.71031109060841,
  longitude: 2.165207189863445,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function Maps() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const navigation = useNavigation();

  // Fonction pour récupérer les événements associés à un marqueur
  const getEventsForMarker = (markerLocation) => {
    const events = elements.filter(event => event.location === markerLocation);
    return events;
  };


  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_REGION} onPress={()=>setSelectedMarker(null)}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            onPress={() => {setSelectedMarker(marker)}}
          />

        ))}
      </MapView>
      {selectedMarker != null &&<Overlay elements = {getEventsForMarker(selectedMarker.name)} location={selectedMarker.name} />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});