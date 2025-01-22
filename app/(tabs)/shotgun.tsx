import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRouter} from 'expo-router'

export default function Shotgun (){
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('user');
  const [isConnected, setIsConnected] = useState(true);
  const [chef, setChef] = useState(true);
  const [shotgunSuccess, setShotgunSuccess] = useState(false); // Pour savoir si le shotgun a réussi
  const [loading, setLoading] = useState(false); // Indique si les données sont en cours de chargement
  const [shotguns, setShotguns] = useState([{ _id: '', nom:''}]);
  const [currentShotgun, setCurrentShotgun] = useState({_id:'', nom: '', date: new Date()});
  const [shotgunChoisi, setShotgunChoisi] = useState('');
  const [timeLeft, setTimeLeft] = useState<string | null>(null);


  const [inputShotgun, setInputShotgun] = useState({
    nom: '',
    description: '',
    places: '',
    currentShotgun: false,
    date: new Date(), // Date par défaut
  });
  const handleChange = (field, value) => {
    setInputShotgun((prev) => ({ ...prev, [field]: value }));
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Masquer le DatePicker après sélection
    if (selectedDate) {
      handleChange('date', new Date(selectedDate.setSeconds(0, 0))); // Réinitialiser secondes/millisecondes
      setShowTimePicker(true); // Ouvrir le TimePicker
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false); // Masquer le TimePicker après sélection
    if (selectedTime) {
      const updatedDate = new Date(inputShotgun.date);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      handleChange('date', updatedDate);
    }
  };

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

  const fetchCurrentShotgun = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/shotgun/current', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du shotgun actif');
      }

      const data = await response.json();
      setCurrentShotgun(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du shotgun actif :', error);
    }
  };
  
  /* const fetchShotgunSuccess = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/shotgun/current', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du shotgun actif');
      }

      const data = await response.json();
      const participants = data.participants;
      if user
      setShotgunSuccess(true);
    } catch (error) {
      console.error('Erreur lors de la récupération du shotgun actif :', error);
    }
  }; */

  useEffect(() => {
    Promise.all([/*fetchUserData(), */fetchShotguns(), fetchCurrentShotgun()]).then(() => setLoading(false));
    if (currentShotgun && currentShotgun.date) {
      const targetDate = new Date(currentShotgun.date).getTime();

      if (targetDate > Date.now()) {
        const interval = setInterval(() => {
          const now = Date.now();
          const diff = targetDate - now;

          if (diff <= 0) {
            clearInterval(interval);
            setTimeLeft(null);
          } else {
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [currentShotgun]);

  const reserver = () => {
    // Exemple de données à envoyer
    const familyId = '678c6ec600b57f871a6f57b0';
  
    fetch(`http://localhost:3000/api/shotgun/${currentShotgun._id}/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ familyId }),  // Assurez-vous que le body a la bonne structure
    })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            // Si la réponse n'est pas OK, l'API renvoie une erreur
            throw new Error(data.error || 'Une erreur est survenue lors de la requête.');
          }
          return data; // Retourner les données si tout est ok
        });
      })
      .then((data) => {
        setMessage(data.message);  // Affiche le message de succès
      })
      .catch((error) => {
        setMessage(error.message);  // Affiche l'erreur
        console.error('Erreur lors de la requête POST :', error);
      });
};

  const creer = () => {
    fetch('http://localhost:3000/api/shotgun/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...inputShotgun,
        date: inputShotgun.date.toISOString(), // Format ISO pour l'API
      }),
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
      setCurrentShotgun(data.updatedShotgun || {});
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
              onChangeText={(text) => handleChange('nom', text)}
              value={inputShotgun.nom}
            />
            <TextInput
              style={{
                height: 40,
                width: 300,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                color: 'white',
                backgroundColor: '#3E5C9A',
                borderRadius: 20,
              }}
              placeholder="Description"
              placeholderTextColor="lightgray"
              onChangeText={(text) => handleChange('description', text)}
              value={inputShotgun.description}
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
              onChangeText={(text) => handleChange('places', text)}
              value={inputShotgun.places}
            />
            <View style={{ marginBottom: 10 }}>
              <Button
                title={`Date et heure : ${inputShotgun.date.toLocaleString()}`}
                onPress={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={inputShotgun.date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={handleDateChange}
                />
              )}
              {showTimePicker && (
                <DateTimePicker
                  value={inputShotgun.date}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleTimeChange}
                />
              )}
            </View>
            <Button title="Créer l'event" onPress={creer} />
          </View>
          { !(Platform.OS === 'ios') && (<View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
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
          </View>)}
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

      if (!currentShotgun) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Pas de shotgun actif.</Text>
          </View>
        );
      }

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:20 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' }}>
            {currentShotgun.nom}
          </Text>
          {timeLeft ? (
            <View>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>Début dans : {timeLeft}</Text>
            </View>
          ) : (
            chef && (
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
            )
          )}
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