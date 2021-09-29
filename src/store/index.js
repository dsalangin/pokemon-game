import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter';
import pokemonsReducer from './pokemons';
import selectedPokemonsReducer from './selectedPokemons';
import enemyPokemonsReducer from "./enemyPokemons";
import gameStatusReducer from './gameStatus';

export default configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
    selectedPokemons: selectedPokemonsReducer,
    enemyPokemons: enemyPokemonsReducer,
    gameStatus: gameStatusReducer,
  }
})