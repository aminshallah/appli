import React from 'react';
import { StyleSheet, Button, ScrollView, View, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';

export default function Profile() {
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
          <ThemedText style={styles.userName}>Nom de l'utilisateur</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Ma famille de parrainage</ThemedText>
          <ThemedText style={styles.familyName}>{familyName}</ThemedText>
          <ThemedText>Membres :</ThemedText>
          {familyMembers.map((member) => (
            <ThemedText key={member.id} style={styles.memberText}>
              • {member.name}
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
          title="Changer de famille"
          onPress={() => alert('Demande envoyée à l\'administrateur')}
          color="#F44336"
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
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
  memberText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#555',
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