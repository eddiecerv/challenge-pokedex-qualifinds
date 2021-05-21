const hostname = "https://pokeapi.co/api/v2";

export const getPokemonName = async (pokemonData) => {
    return pokemonData ? pokemonData.name : '';
}

export const getPokemonData = async (id) => {
    return await fetch(`${hostname}/pokemon/${id}`).then( res => res.json() );
}

export const getPokemonForm = async (id) => {
    return await fetch(`${hostname}/pokemon-form/${id}`).then( res => res.json() );
}

export const getPokemonSpecie = async (id) => {
    return await fetch(`${hostname}/pokemon-species/${id}`).then( res => res.json() );
}

export const getPokedex = async () => {
    return await fetch(`${hostname}/pokedex`).then( res => res.json() );
}

export const getPokemons = async ( url ) => {
    return await fetch( url ).then( res => res.json() );
}