import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';
import { Header, Input, Card, Button, TabView } from 'react-native-elements';
import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: () => ReactNode = () => {

  const [modalVisible, setModalVisible] = useState(false); 
  const [cityName, setCityName] = useState(""); 
  const [cities, setCities] = useState<any[]>([]);

    // load cities when app starts
    useEffect(() => {
      getData();
    },[]);  

  useEffect(() => {
    storeData();
  },[cities]);

  const openDialog = () => {
    setModalVisible(true);
  }

  const addCity = () => {
    setCities( [...cities,{id:Math.floor(Math.random() * 100 + 1), name:cityName}]);
    setModalVisible(false);
  }

  const cancelCity = () => {
    setModalVisible(false);
  }

  const deleteCity = (id) => {
    let filteredArray = cities.filter(city => city.id !== id);
    setCities(filteredArray);
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      // saving error
      console.log("Cities saving error!");
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities')
      if(value !== null) {
        setCities(JSON.parse(value));
      }
    } catch(e) {
      console.log("Cities loading error!");
    }
  }

  const WeatherForecast = (params) => {
    const city = params.city;
    const API_KEY = 'a9ad552ae8927528f493caaecce95c16';
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    const [{ data, loading, error }, refetch] = useAxios(
      URL+city.name+'&appid='+API_KEY+'&units=metric'
    )

    if (loading) return (
      <Card>
        <Card.Title>Loading....</Card.Title>
      </Card>
    )
    if (error) return (
      <Card>
        <Card.Title>Error loading weather forecast!</Card.Title>
      </Card>
    )

    // just for testing
    //console.log(data);

    const refreshForecast = () => {
      refetch();
    }

    const deleteCity = () => {
      params.deleteCity(city.id);
    }


    return (
      <Card>
        <Card.Title>{city.name}</Card.Title>
        <Text>Main: {data.weather[0].main}</Text>
        <Text>Temperature: {data.main.temp} °C</Text>
        <Text>Humidity: {data.main.humidity} </Text>
        <View style={ styles.buttonRow }>
          <Button titleStyle={{ color: '#EE4B2B' }} type='clear' title='delete' onPress={deleteCity} />
          <Button titleStyle={{ color: '#00FFFF' }} type='clear' title='refresh' onPress={refreshForecast} />
        </View>
      </Card>
    );
  }
  

  return (
    <SafeAreaView>
     <Header
      centerComponent={{ text: 'Weather App', style: { color: '#fff' } }}
      rightComponent={{ icon: 'add', color: '#fff', onPress: openDialog }}
      />
      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <View>
          <Input
          onChangeText={ (text) => setCityName(text)}
          placeholder='Type cityname here'
          />
        </View>
        <Dialog.Button label="Cancel" onPress={cancelCity} />
        <Dialog.Button label="Add" onPress={addCity} />
      </Dialog.Container>

      <ScrollView>
        {cities.map(city => (
          <WeatherForecast key={city.id} city={city} deleteCity={deleteCity} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row" , 
    justifyContent: 'space-evenly'
  },
  
});

export default App;
