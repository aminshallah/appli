import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, ScrollView, View, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import Profil from '@/components/Profil';
import axios from 'axios';
import {useRouter} from 'expo-router'
import { Pressable, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Profile() {
  const router = useRouter()
  const familyName = "Famille des Dragons";
  const familyMembers = [
    { id: 1, name: "Alice Dupont" },
    { id: 2, name: "Bob Martin" },
    { id: 3, name: "Clara Lemoine" },
  ];
  const familyEvents = [
    { id: 1, name: "Soirée Pizza", date: "15/12/2024" },
    { id: 2, name: "Sortie Bowling", date: "22/12/2024" },
  ];
  const familyRanking = { position: 3, points: 120 };
  const { user, setUser } = useContext(UserContext);
  
  const [memberNames, setMemberNames] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);  // Marquer le composant comme monté après le premier rendu
  }, []);

  useEffect(() => {
    if (!user.accessToken&&isMounted) {
      router.push('/');  // Redirige vers la page Home dès que l'accessToken est défini
    }
  }, [user.accessToken]);

  useEffect(() => {
    const fetchNames = async () => {
      const names = [];
      for (const member of user.familyMembers) {
        const name = await fetchUserName(member);
        names.push(name);
      }
      setMemberNames(names);
    };

    if (user) {
      fetchNames();
    }
  }, [user]);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.0.101:3000/api/user/name/${userId}`);
      return response.data.name;
    } catch (error) {
      console.error('Erreur de récupération du nom:', error);
      return 'Nom indisponible';
    }
  };

  console.log(user.id)

  // Lien vers le groupe WhatsApp
  const whatsappGroupLink = "https://chat.whatsapp.com/your-group-id";

  const openWhatsAppGroup = async () => {
    const supported = await Linking.canOpenURL(whatsappGroupLink);
    if (supported) {
      await Linking.openURL(whatsappGroupLink);
    } else {
      alert("Impossible d'ouvrir le groupe WhatsApp.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header />
      <ScrollView>
        <ThemedView style={styles.profileSection}>
          <Profil />
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Ma famille de parrainage</ThemedText>
          <ThemedText style={styles.familyName}>{user.familyName}</ThemedText>
          <ThemedText>Membres :</ThemedText>
          {memberNames.map((name, index) => (
            <ThemedText key={index}>
              • {name}
            </ThemedText>
          ))}
          <Button
            title="Chat de la famille"
            onPress={openWhatsAppGroup}
            color="#4CAF50"
          />
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Événements de la famille</ThemedText>
          {familyEvents.map((event) => (
            <ThemedText key={event.id} style={styles.eventText}>
              {event.name} - {event.date}
            </ThemedText>
          ))}
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Statistiques</ThemedText>
          <View style={styles.statsContainer}>
            <ThemedText>Classement : {familyRanking.position}ᵉ</ThemedText>
            <ThemedText>Points totaux : {familyRanking.points}</ThemedText>
          </View>
        </ThemedView>

        <Button
          title="Se déconnecter"
          onPress={() => {
            const newUser = {
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar,
              idVR: user.idVR,
              id: user.id,
              familyId: user.familyId,
              familyMembers : user.familyMembers,
              familyName : user.familyName,
              shotgun: user.shotgun,
              role: user.role,
              favoris : user.favoris,
              accessToken : ''
            };
            setUser(newUser)
          }}
          color="#F44336"
        />
{user.role =='admin' &&
<Link href="/admin " asChild>
<Button
          title="Admin"
          onPress={() => {
            
          }}
          color="rose"
        />
    </Link>}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#244B93',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  familyName: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  eventText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  statsContainer: {
    marginTop: 10,
  },
});
