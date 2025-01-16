import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default function Shotgun (){
  const [message, setMessage] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputShotgun, setInputShotgun] = useState('');
  const [inputSeats, setInputSeats] = useState('');
  const [seatsLeft, setSeatsLeft] = useState('');
  const [participants, setParticipants] = useState('');


  const reserver = () => {
    // Exemple de données à envoyer
    const name = 'Noé MADRANGES';
    const id = '2349164';
  
    fetch(`http://localhost:3000/api/shotguns/${id}/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nom: name}),
    })
    .then((response) => {
      const data = response.json();

      if (!response.ok) {
        throw new Error('Plus de place disponible, désolé !');
      }
      return data;
    })      
    .then((data) => {
        setMessage(data.message);
        setSeatsLeft(data.seatsLeft);
      })
      .catch((error) => {
        setMessage(error.message);
        console.error('Erreur lors de la requête POST :', error); 
      });
  };

  const creer = () => {
    const shotgunName = inputShotgun
    const seats = inputSeats

    fetch('http://localhost:3000/api/shotguns/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "nom": shotgunName, "places": inputSeats }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l’événement.');
      }
      return response.json(); // Récupérer la réponse JSON
    })
    .then((data) => {
      setMessage(data.message);
    })
    .catch((error) => {
      console.error('Erreur lors de la requete post', error);
    });
  };

  const recuperer = () => {
    fetch('http://localhost:3000/shotgun/event/3/participants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async (response) => {
      const data = await response.json();
      if(!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des participants');
      }

      setParticipants(data.participants || []);
      setMessage(data.message || 'Liste récupérée')
    })
    .catch((error) => {
      setMessage(error.message);
      console.error('Erreur lors de la requete GET :', error);
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2E4A8E' }}>
      <Header />
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 100,
            padding: 10,
            backgroundColor: '#ADD8E6', // Fond de la boîte
          }}
        >
          <Button title="Shotgun !" onPress={reserver} />
        </View>
      <Text style={{ marginTop: 20 }}>{message || 'Aucune réponse'}</Text>
      </View>
  
      <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Button title="Récupérer les participants " onPress={recuperer} />
        </View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%', paddingLeft: 8, color: 'white' }}
          placeholder="Numéro de l'event"
          onChangeText={setInputShotgun}
          value={inputShotgun}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', paddingLeft: 8, color:'white' }}
          placeholder="Nombre de places"
          onChangeText={setInputSeats}
          value={inputSeats}
        />
      </View>
  
      <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' }}>
        <Button title="Créer l'event" onPress={creer} />
      </View>
  
    </View>
  );
}