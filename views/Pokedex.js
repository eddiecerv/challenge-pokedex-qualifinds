import {
    SafeAreaView, Pressable,
    ScrollView,
    StyleSheet,
    useColorScheme
} from 'react-native';
  
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import { FlatGrid } from 'react-native-super-grid';

import SearchBar from "react-native-dynamic-search-bar";

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slot from '../components/Slot';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokedex, getPokemons } from '../functions/getPokemonData';

const PokedexScreen = ({ navigation, route }) => {
    const [screenSize, setSize] = useState(0);
    const [offsetList, setOffset] = useState(50);
    const [allPokemons, setListPokemons] = useState([]);
    const [pokemons, setPokemons] = useState([]);

    const filterList = (e) => {
        if( isNaN( parseInt(e) ) ) {
          if( e.length > 2 ) {
            e = e.toLowerCase();
            setPokemons( allPokemons.filter(pokemon => pokemon.pokemon_species.name.toLowerCase().includes(e) ) );
          } else{
            setPokemons( allPokemons.slice(0, 50) );
          }
        } else{
          setPokemons( allPokemons.filter(pokemon => pokemon.entry_number === parseInt(e) ) );
        }        
    };

    useEffect( async () => {
      if( !allPokemons.length ){
        try {
          const values = await AsyncStorage.getItem('@all_pokemons')
          setListPokemons( values ? JSON.parse(values) : [] );
          
          if( !allPokemons.length ) {
            const result = await getPokedex();
            const pokemonDB = await getPokemons( result.results[0].url );
            
            setOffset(50);
            setPokemons(pokemonDB.pokemon_entries.slice(0, offsetList));
            setListPokemons(pokemonDB.pokemon_entries);
          } else{
            setOffset(50);
            setPokemons(allPokemons.slice(0, offsetList));
          }

        } catch(e) {
          const result = await getPokedex();
          const pokemonDB = await getPokemons( result.results[0].url );
          setOffset(50);
          setPokemons(pokemonDB.pokemon_entries.slice(0, offsetList));
          setListPokemons(pokemonDB.pokemon_entries);
        }

        if( allPokemons.length ){
          await AsyncStorage.setItem('@all_pokemons', JSON.stringify( allPokemons ) );
        }

      }
    }, []);

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const getMoreElements = (view) => {
      const max = view.contentSize.height - view.contentOffset.y;
      if( max < 1000 ) {
        setSize(max);
      }
    }

    useEffect(() => {
      if( screenSize < 1000 ){
        setPokemons(allPokemons.slice(0, offsetList+50));
        setOffset(offsetList+50);
        setSize(0);
      }
    }, [screenSize]);
  
    return (
      <SafeAreaView style={backgroundStyle}>
        <ScrollView scrollEventThrottle onScroll={ view => getMoreElements(view.nativeEvent) }>
            { /* <Menu /> */ }
            <SearchBar
              fontColor="#cccccc"
              iconColor="#cccccc"
              shadowColor="#282828"
              cancelIconColor="#c6c6c6"
              placeholder="Search"
              onChangeText={(text) => filterList(text)}
              onSearchPress={() => console.log("Search Icon is pressed")}
              onClearPress={() => filterList("")}
              onPress={() => console.log('Do something...')}
              style={{ marginTop: 12 }}
            />
            <FlatGrid
              itemDimension={90}
              data={pokemons}
              style={styles.gridView}
              // staticDimension={300}
              // fixed
              spacing={10}
              renderItem={({ item }) => (
                <Pressable onPress={() =>
                  navigation.navigate('Pokemon', { pokemon: item, host: route.params.host })
                }>
                  <Slot {...item} hostname={route.params.host} />
                </Pressable>
                
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
    }
});

export default PokedexScreen;