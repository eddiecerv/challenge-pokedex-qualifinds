import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokemonData, getPokemonForm } from '../functions/getPokemonData';

const Slot = (props) => {

    const verifyPokemonData = async (id) => {
      try {
        let pokemonData = await AsyncStorage.getItem('@pokemonLocalDB');
        pokemonData = pokemonData ? JSON.parse(pokemonData) : [];

        const pokemonStored = pokemonData.filter( pokemon => pokemon.id === id);
        
        if( pokemonStored.length === 1 ){
          return pokemonStored[0];
        } else{
          return 0;
        }
        
      } catch(e) {
        return 0;
      }
    }

    const [pokemon, setPokemon] = useState(0);

    useEffect( async () => {
        if(!pokemon) {
          const stored = await verifyPokemonData(props.entry_number);
          
          if( !stored ) {
              const result = await getPokemonData(props.entry_number);
              setPokemon(result);

                // Get and Store in local database
              const pokemonData = await AsyncStorage.getItem('@pokemonLocalDB');
              pokemonData = pokemonData ? JSON.parse(pokemonData) : [];
              const newPokemonStored = {
                id: result.id,
                species: { name: result.species.name }, 
                sprites: { front_default: result.sprites.front_default } 
              };

              pokemonData.push( newPokemonStored );
              await AsyncStorage.setItem('@pokemonLocalDB', JSON.stringify( pokemonData ) );
          } else{
            setPokemon( stored );
          }
        }
    }, [props.entry_number]);

    const [img, setPokemonImg] = useState("https://reactnative.dev/img/tiny_logo.png");

    useEffect( async () => {
      if( !pokemon ) {
        const result = await getPokemonData(props.entry_number);
        setPokemonImg(result.sprites.front_default);
      } else{
        setPokemonImg(pokemon.sprites.front_default);
      }
    });

    return (
        <View style={[styles.itemContainer, { backgroundColor: "#fff", backgroundImage: `url(${img})` }]}>
            <Image style={styles.icon} source={{ uri: img }}/>
            <Text style={styles.itemName}>{props.pokemon_species.name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    icon: {
        width: 64,
        height: 64,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10
    },
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 120,
    },
    itemName: {
      fontSize: 16,
      color: '#333',
      fontWeight: '600',
      textTransform: 'capitalize',
      justifyContent: 'center',
      textAlign: 'center'
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#333',
      justifyContent: 'center',
      textAlign: 'center'
    },
});

export default Slot;