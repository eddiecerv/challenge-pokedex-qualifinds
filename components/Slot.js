import React from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
import { FlatGrid } from 'react-native-super-grid';

import axios from 'axios';

const Slot = (props) => {
    const [pokemon, setPokemon] = React.useState({});
    const [img, setPokemonImg] = React.useState("https://reactnative.dev/img/tiny_logo.png");

    React.useEffect(() => {
        fetch(`${props.hostname}/pokemon/${props.entry_number}`)
        .then( res => res.json() )
        .then( result => {
            setPokemon(result);
        }).catch(e => console.log('Cannot get pokemon'));


        fetch(`${props.hostname}/pokemon-form/${props.entry_number}`)
        .then( res => res.json() )
        .then( result => {
            console.log('Result: ', result);
            setPokemonImg(result.sprites.front_default);
            console.log('Src: ', img);
        }).catch(e => console.log('Cannot get pokemon form'));

    }, []);

    /*
    React.useEffect(() => {
        
    }, []);
    */

    return (
        <View style={[styles.itemContainer, { backgroundColor: "#fff", backgroundImage: `url(${img})` }]}>
            
            <Image
                style={styles.icon}
                source={{ uri: img }}
            />
            
            <Text style={styles.itemName}>{props.pokemon_species.name}</Text>
            { /* <Text style={styles.itemCode}>{props.entry_number}</Text> */ }
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