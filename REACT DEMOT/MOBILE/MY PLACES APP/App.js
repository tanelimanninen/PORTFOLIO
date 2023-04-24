import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FloatingAction } from "react-native-floating-action";
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function App() {
  const [visible, setVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [address, setAddress] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState(null);

  //APP LOADS POSSIBLE OLD SAVED MARKERS
  useEffect(() => {
    async function loadMarkers() {
      try {
        const markersString = await AsyncStorage.getItem('markers');
        if (markersString !== null) {
          setMarkers(JSON.parse(markersString));
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadMarkers();
  }, []);

  //APP ASKS PERMISSION TO GET CURRENT LOCATION
  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    getLocation();
  }, []);

  //DEFINE THE MARKER AND ADD IT
  const handleAddMarker = async (latitude, longitude) => {
    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const address = `${geocode[0].city}, ${geocode[0].country}`;

    const newMarker = { address, latitude, longitude, text };

    try {
      const updatedMarkers = [...markers, newMarker];
      setMarkers(updatedMarkers);
      await AsyncStorage.setItem('markers', JSON.stringify(updatedMarkers));
    } catch (e) {
      console.log(e);
    }
  };

  //THIS WILL MAKE THE DIALOG ELEMENT VISIBLE
  const showDialog = () => {
    setVisible(true);
    console.log('showDialog called');
  };

  //THIS MAKES THE DIALOG DISSAPEAR
  const handleCancel = () => {
    setVisible(false);
  };

  //SAVES THE NEW GIVEN DATA AND ADDS NEW MARKER
  const handleSave = async () => {
    setVisible(false);
    const geocode = await Location.geocodeAsync(address);
    if (geocode.length > 0) {
      const { latitude, longitude } = geocode[0];
      handleAddMarker(latitude, longitude);
    }
  };

  //DEFINE THE MARKER ELEMENTS
  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        title={marker.address}
        description={marker.text} // <-- Add text property to marker description
      />
    ));
  };

  return (
    <View style={styles.container}>

      <MapView style={styles.map}>
      {renderMarkers()}
      </MapView>

      <FloatingAction
        visible={true}
        onPressMain={showDialog}
      />

    <Dialog.Container visible={visible}>
      
        <Dialog.Title>Add a new Place</Dialog.Title>
        <Dialog.Input
          label="City:"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Dialog.Input
          label="Text:"
          onChangeText={(text) => setText(text)}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Save" onPress={handleSave} />
      </Dialog.Container>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
