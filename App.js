/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import Logo from './components/Logo';

/** Views */
import HomeScreen from './views/Home';
import PokedexScreen from './views/Pokedex';
import PokemonScreen from './views/Pokemon';

const hostname = "https://pokeapi.co/api/v2/";
const Stack = createStackNavigator(); //Create Main Stack

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={
            { 
              headerTitle: () => <Logo />, 
              headerStyle: {
                backgroundColor: 'red'
              },
              headerTintColor: '#fff',
              headerTitleStyle: { color: "#FFFFFF" }
            }
          } 
          props={hostname}
        >
          { props => <HomeScreen {...props} hostname={hostname} /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Pokedex" 
          component={PokedexScreen} 
          options={
            { 
              headerTitle: () => <Logo />, 
              headerStyle: {
                backgroundColor: 'red'
              },
              headerTintColor: '#fff',
              headerTitleStyle: { color: "#FFFFFF" }
            }
          } 
          />
        <Stack.Screen 
          name="Pokemon" 
          component={PokemonScreen}
          options={
            { 
              headerTitle: () => <Logo />, 
              headerStyle: {
                backgroundColor: 'red'
              },
              headerTintColor: '#fff',
              headerTitleStyle: { color: "#FFFFFF" }
            }
          } 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
