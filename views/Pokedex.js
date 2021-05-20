import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Button, TextInput
} from 'react-native';
  
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { FlatGrid } from 'react-native-super-grid';

import SearchBar from "react-native-dynamic-search-bar";

import React from 'react';
import axios from 'axios';
import Slot from '../components/Slot';
import Menu from '../components/Menu';

const PokedexScreen = ({ navigation, route }) => {
    const [allPokemons, setListPokemons] = React.useState([]);
    const [pokemons, setPokemons] = React.useState([]);

    const filterList = (e) => {
        if( e.length > 2 ) {
            e = e.toLowerCase();
            setPokemons( allPokemons.filter(pokemon => pokemon.pokemon_species.name.toLowerCase().includes(e) ) );
            //console.log('Filtered: ', pokemons);
        } else{
            setPokemons( allPokemons.slice(0, 50) );
        }
    };

    React.useEffect(() => {
        fetch(`${route.params.host}/pokedex`)
        .then( res => res.json())
        .then( result => {
            //console.log('Results: ', result.results)
            //Get Kanto 
            //console.log('Data: ', result.results[0].url);

            axios.get(result.results[0].url).then(
                data => {
                    setPokemons(data.data.pokemon_entries.slice(0, 50));
                    setListPokemons(data.data.pokemon_entries);
                }
            ).catch( e => console.log('Error: ', e));
        }).catch( e => console.log('Error: ', e) );
    }, []);
  
    return (
      <SafeAreaView>
        <ScrollView>
          <Menu />
            {/*
            <TextInput
                style={styles.input}
                onChangeText={filterList}
                value={1}
                placeholder="Search"
                keyboardType="numeric"
            />
            */}
            <SearchBar
  fontColor="#cccccc"
  iconColor="#cccccc"
  shadowColor="#282828"
  cancelIconColor="#c6c6c6"
  placeholder="Search"
  onChangeText={(text) => filterList(text)}
  onSearchPress={() => console.log("Search Icon is pressed")}
  onClearPress={() => filterList("")}
  onPress={() => alert("onPress")}
/>
          <FlatGrid
            itemDimension={90}
            data={pokemons}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item }) => (
                <Slot {...item} hostname={route.params.host} />
            )}
        />
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        padding: 10
    },
});

export default PokedexScreen;