/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Slot from '../components/Slot';
import {getPokemonData, getPokemonName} from '../functions/getPokemonData';

it('renders correctly', () => {
  renderer.create(<App />);
  renderer.create(<Slot />);
});

it('works pokemon retrive data', async () => {
  await expect( getPokemonName( getPokemonData(1) ) ).resolves.toEqual('bulbasaur');
});
