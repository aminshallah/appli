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


export default function Admin() {
  
  const {user} = useContext(UserContext) ; 

  return (
    <ThemedView>
      <ThemedText>Caca</ThemedText>
    </ThemedView>
    )
  }