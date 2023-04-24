/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';
import YouTubeScreen from './YouTubeScreen';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MoviesList"
          component={MovieListScreen}
          options={{ title: 'MovieList' }}
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetailScreen} 
          options={{ title: 'MovieDetails' }}
        />
        <Stack.Screen
          name="YouTube"
          component={YouTubeScreen}
          options={{ title: 'YouTube Video' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
