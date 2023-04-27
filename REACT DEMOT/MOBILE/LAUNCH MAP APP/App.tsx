/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import { Button, Linking, Platform, SafeAreaView, StyleSheet, Text, TextInput, View, } from 'react-native';

function App(): JSX.Element {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const launchMap = () => {
    const location = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });
    Linking.openURL(url);
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.headerText}>E09 Launch a Map</Text>
      <TextInput  
        placeholder='Latitude' 
        onChangeText={text => setLatitude(text)} />
      <TextInput 
        placeholder='Longitude' 
        onChangeText={text => setLongitude(text)} />

      <Button title="Launch a Map" onPress={launchMap}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  headerText: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default App;
