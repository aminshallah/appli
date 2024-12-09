import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE} // Utiliser Google Maps
        initialRegion={{
          latitude: 48.8584, // Latitude pour Paris
          longitude: 2.2945, // Longitude pour Paris
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 48.8584, longitude: 2.2945 }}
          title="Paris"
          description="Lieu de la Tour Eiffel"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;