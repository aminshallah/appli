import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router';

const PostFormScreen = () => {
  const [announcementData, setAnnouncementData] = useState({
    genre: '',
    title: '',
    description: '',
    date: '',
    from: ''
  });

  const [eventData, setEventData] = useState({
    genre : '',
    name : '',
    date : '',
    location : '',
    startTime : '',
    endTime :  '',
    duration : '',
    assos : '',
    description :  ''
  });

  const handlePostAnnouncement = async () => {
    try {
      const response = await axios.post('http://192.168.0.101:3000/api/annonce/', announcementData);
      Alert.alert('Succès', `Annonce postée avec succès : ID ${response.data.id}`);
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Une erreur est survenue.');
    }
  };

  const handlePostEvent = async () => {
    try {
      const response = await axios.post('http://192.168.0.101:3000/api/event/', eventData);
      Alert.alert('Succès', `Événement posté avec succès : ID ${response.data.id}`);
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Une erreur est survenue.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style ={styles.title}>Administration</Text>
      <Text style={styles.header}>Poster une Annonce</Text>
      <TextInput
        style={styles.input}
        placeholder="Genre"
        placeholderTextColor="white"
        value={announcementData.genre}
        onChangeText={(text) => setAnnouncementData({ ...announcementData, genre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Titre"
        placeholderTextColor="white"
        value={announcementData.title}
        onChangeText={(text) => setAnnouncementData({ ...announcementData, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="white"
        value={announcementData.description}
        onChangeText={(text) => setAnnouncementData({ ...announcementData, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        placeholderTextColor="white"
        value={announcementData.date}
        onChangeText={(text) => setAnnouncementData({ ...announcementData, date: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="De la part de"
        placeholderTextColor="white"
        value={announcementData.from}
        onChangeText={(text) => setAnnouncementData({ ...announcementData, from: text })}
      />
      <Button title="Poster l'annonce" color="orange" onPress={handlePostAnnouncement} />

      <Text style={styles.header}>Poster un Événement</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="white"
        value={eventData.name}
        onChangeText={(text) => setEventData({ ...eventData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        placeholderTextColor="white"
        value={eventData.date}
        onChangeText={(text) => setEventData({ ...eventData, date: text })}
      />
        <TextInput
        style={styles.input}
        placeholder="Genre"
        placeholderTextColor="white"
        value={eventData.genre}
        onChangeText={(text) => setEventData({ ...eventData, genre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Lieu"
        placeholderTextColor="white"
        value={eventData.location}
        onChangeText={(text) => setEventData({ ...eventData, location: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="white"
        value={eventData.description}
        onChangeText={(text) => setEventData({ ...eventData, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Asso"
        placeholderTextColor="white"
        value={eventData.assos}
        onChangeText={(text) => setEventData({ ...eventData, assos: text })}
      />


    <TextInput
        style={styles.input}
        placeholder="Heure de début"
        placeholderTextColor="white"
        value={eventData.startTime}
        onChangeText={(text) => setEventData({ ...eventData, startTime: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Heure de fin"
        placeholderTextColor="white"
        value={eventData.endTime}
        onChangeText={(text) => setEventData({ ...eventData, endTime: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Durée"
        placeholderTextColor="white"
        value={eventData.duration}
        onChangeText={(text) => setEventData({ ...eventData, duration: text })}
      />

      <Button  title="Poster l'événement" color="orange" onPress={handlePostEvent} />
      <Link href="/" asChild>
      <Button
                title="Retour"
                onPress={() => {
                  
                }}
                color="red"
              />
          </Link>
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button : {
    margin : 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#244B93'
  },
  title : {
    fontSize : 30,
    fontWeight : 'bold',
    color : 'orange',
    textAlign : 'center'

  },
  contentContainer: {
    padding: 20
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'orange'
  }
});

export default PostFormScreen;
