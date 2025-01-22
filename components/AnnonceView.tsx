import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';


export default function AnnonceView(){
  return(
    <View>
      <Text>Annonces</Text>
      <ScrollView horizontal = {true} style ={styles.container}>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >Tap</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >me</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >to </Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
        <View style ={[styles.card, styles.cardElevated]}>
          <Text >scroll</Text>
        </View>
      </ScrollView>
    </View> 
  )
}

const styles = StyleSheet.create({
  container : {
    padding :8,
  },
  card : {
    flex : 1,
    width : 100,
    height :100,
    alignItems : 'center',
    justifyContent : 'center'
  },
  cardElevated : {
    backgroundColor : 'red'
  }


})