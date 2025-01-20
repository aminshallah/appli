import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Shotgun (){
  const [message, setMessage] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputSeats, setInputSeats] = useState('');
  const [inputDescription, setInputDescripttion] = useState('');
  const [seatsLeft, setSeatsLeft] = useState('');
  const [participants, setParticipants] = useState('');
  const [role, setRole] = useState('admin');
  const [isConnected, setIsConnected] = useState(true);
  const [chef, setChef] = useState(true);
  const [shotgunSuccess, setShotgunSuccess] = useState(false); // Pour savoir si le shotgun a réussi
  const [loading, setLoading] = useState(false); // Indique si les données sont en cours de chargement
  const [shotguns, setShotguns] = useState([{ _id: '21', nom:'caca'}]);
  const [currentShotgun, setCurrentShotgun] = useState({});
  const [shotgunChoisi, setShotgunChoisi] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations utilisateur');
      }

      const data = await response.json();
      setIsConnected(data.isConnected);
      setRole(data.role);
      setChef(data.chef);
      setShotgunSuccess(data.shotgunSuccess);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur :', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchShotguns = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/shotgun', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des shotguns');
      }

      const data = await response.json();
      setShotguns(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des shotguns :', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([/*fetchUserData(), */fetchShotguns()]).then(() => setLoading(false));
  }, []);


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
        fetchUserData();
      })
      .catch((error) => {
        setMessage(error.message);
        console.error('Erreur lors de la requête POST :', error); 
      });
  };

  const creer = () => {
    fetch('http://localhost:3000/api/shotguns/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "nom": inputName, "places": inputSeats }),
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

  const choisirShotgun = () => {
    fetch('http://localhost:3000/api/shotgun/current', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "id": shotgunChoisi }),
    })
    .then(async (response) => {
      const data = await response.json();
      if(!response.ok) {
        throw new Error(data.message || 'Erreur lors de la maj du currentShotgun');
      }
      setCurrentShotgun(data.updatedShotgun || []);
    })
    .catch((error) => {
      setMessage(error.message);
      console.error('Erreur lors de la requete PUT :', error);
    });
  }

  function renderContent() {
    if (loading) {
      return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Chargement...</Text>
      </View>
      )
    }

    if (!isConnected) {
      return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Veuillez vous connecter pour accéder à cette page.</Text>
      </View>
      );
    }

    if (role === 'admin') {
      return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#2E4A8E', padding: 20 }}>
          <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 10,
                marginBottom: 10,
                width: 300,
                paddingLeft: 20,
                paddingRight: 20,
                color: 'white',
                backgroundColor: '#3E5C9A',
                borderRadius: 20,
              }}
              placeholder="Nom de l'event"
              placeholderTextColor="lightgray"
              onChangeText={setInputName}
              value={inputName}
            />
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 20,
                width: 300,
                paddingLeft: 20,
                paddingRight: 20,
                color: 'white',
                backgroundColor: '#3E5C9A',
                borderRadius: 20,
              }}
              placeholder="Nombre de places"
              placeholderTextColor="lightgray"
              onChangeText={setInputSeats}
              value={inputSeats}
            />
            <Button title="Créer l'event" onPress={creer} />
          </View>
      
          {/* Section des shotguns */}
          <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: 'white', marginBottom: 10 }}>
              Sélectionnez un shotgun :
            </Text>
            <Picker
              selectedValue={shotgunChoisi}
              onValueChange={(itemValue) => setShotgunChoisi(itemValue)}
              style={{
                width: '100%',
                height: 50,
                color: 'white',
                backgroundColor: '#ADD8E6',
                marginBottom: 20,
              }}
            >
              <Picker.Item label="-- Choisir un shotgun --" value="" />
              {shotguns.map((shotgun) => (
                <Picker.Item key={shotgun._id} label={shotgun.nom} value={shotgun._id} />
              ))}
            </Picker>
            <Button title="Mettre à jour" onPress={choisirShotgun} />
          </View>
        </View>
      );
    }

    if (shotgunSuccess) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Votre famille a réussi le shotgun ! Félicitations !</Text>
        </View>
      );
    }

    if (chef) {
      return (
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
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Demandez à votre chef de famille de faire le shotgun !</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2E4A8E' }}>
      <Header />
      {renderContent()}
    </View>
  );
}