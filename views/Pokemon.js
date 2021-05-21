import {
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
  
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Range from '../components/Range';

const PokemonScreen = ({ navigation, route }) => {
    const [pokemon, setPokemon] = useState(0);
    useEffect(() => {
        
        if( !pokemon ){
            axios(`${route.params.host}/pokemon/${route.params.pokemon.entry_number}`).then(
                result => setPokemon(result.data)
            ).catch( e => console.log('Error: ', e))
        }
        
    });

    const [pokeData, setPokemonData] = useState(0);
    useEffect(() => {
        if( !pokeData ){
            axios(`${route.params.host}/pokemon-form/${route.params.pokemon.entry_number}`).then(
                result => setPokemonData(result.data)
            ).catch( e => console.log('Error: ', e))
        }
    });

    const [specieData, setSpecie] = useState(0);
    useEffect(() => {
        if( !specieData ){
            axios(`${route.params.host}/pokemon-species/${route.params.pokemon.entry_number}`).then(
                result => setSpecie(result.data)
            ).catch( e => console.log('Error: ', e)) 
        }
    });

    const [img, setPokemonImg] = useState('https://reactnative.dev/img/tiny_logo.png');
    useEffect(() => {
        if( pokeData && pokeData.sprites ) {
            setPokemonImg(pokeData.sprites.front_default);
        }
    });

    const [description, setPokemonDescription] = useState("");
    useEffect(() => {
        if( specieData && specieData.flavor_text_entries ) {
            setPokemonDescription(specieData.flavor_text_entries.filter( item => item.language.name === 'en' )[0].flavor_text);
        }
    })
    //console.log('PokeData Specie: ', specieData ? specieData.flavor_text_entries[0].flavor_text : '');

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const convertSpecial = (val) => {
        if( val ) {
            switch(val){
                case 'special-attack':
                    return 'Sp. Atk';
                break;
    
                case 'special-defense':
                    return 'Sp. Def';
                break;
    
                default: 
                    return val;
                break;
            }
        }
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView>
                <View style={styles.gridView}>
                    <View style={[styles.itemContainer]}>
                        <Image style={styles.icon} source={{ uri: img }}/>
                    </View>
                    <View style={[styles.itemContainer]}>
                        <Text style={styles.number}>#{pokemon.id}</Text>
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Text style={styles.number}>Height: {pokemon.height/10}m</Text>
                        <Text style={styles.number}>Weight: {pokemon.weight/10}kg</Text>
                    </View>
                </View>

                <View styles={[styles.row, {padding: 20}]}>
                    <Text style={styles.description}>{description.split('\n').join(' ')}</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={{ textAlign: 'center', textTransform: 'uppercase', color: "#666666" }}>Statistics</Text>
                    </View>
                    {
                    pokemon ? pokemon.stats.map( item => {
                            return (
                                <View key={item.stat.name} style={styles.gridView}>
                                    <View style={styles.statContainer}>
                                        <Text style={styles.stat}>{ convertSpecial( item.stat.name ) }:</Text>
                                    </View>
                                    <View style={styles.rangeContainer}>
                                        <Range baseStat={item.base_stat} />
                                    </View>
                                </View>
                            );
                        }
                    ) : <View></View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    row: {
        marginTop: 10,
        marginBottom: 10,
        padding: 2
    },
    gridView: {
        flexDirection: "row",
    },
    statContainer: {
        flex: 0.2,
        padding: 8
    },
    rangeContainer: {
        flex: 0.8,
        padding: 8
    },
    description: {
        textAlign: "center",
        color: "#333333"
    },
    itemContainer: {
      justifyContent: 'flex-start',
      borderRadius: 5,
      padding: 10,
      height: 150,
      flex: 0.5,
      textAlignVertical: 'top'
    },
    icon: {
        width: 120,
        height: 120,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
        justifyContent: 'flex-start',
    },
    name: {
        textTransform: 'capitalize',
        fontWeight: "600",
        fontSize: 24
    },
    number: {
        color: "#333333",
        fontSize: 12,
        lineHeight: 26
    },
    stat: {
        textTransform: 'capitalize',
        color: "#333333",
        fontSize: 12,
        lineHeight: 20
    }
});

export default PokemonScreen;