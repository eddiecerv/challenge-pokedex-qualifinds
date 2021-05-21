import React from 'react';
import {
    StyleSheet,
    Text,
    useColorScheme,
    View, Button
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';

const HomeScreen = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
      
    return (
      <View style={{ marginTop: 100 }}>
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 30 }}>Welcome to new React Native Pokedex</Text>
        <Button
          title="Go to Pokedex"
          onPress={() =>
            props.navigation.navigate('Pokedex', { host: props.hostname })
          }
        />
        <View style={{ marginTop: 100 }}>
          <Text style={{ fontSize: 12, textAlign: "center", marginBottom: 10, color: "#ccc" }}>____________________</Text>
          <Text style={{ fontSize: 14, textAlign: "center", marginBottom: 10, color: 'red' }}>Developed by</Text>
          <Text style={{ fontSize: 14, textAlign: "center", marginBottom: 10 }}>Ramiro Eduardo Vallecillo Cervantes</Text>
        </View>      
      </View>
    );
  };

  
export default HomeScreen;