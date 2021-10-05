import { createSlice } from '@reduxjs/toolkit'; 
import FirebaseClass from '../service/firebase';
import { selectLocalID } from './user';

export const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
  }
})


export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject} = slice.actions;

export const selectPokemonsLoading = (state) => state.pokemons.isLoading;
export const selectPokemonsData = (state) => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch, getState) => {
  const localId = selectLocalID(getState());
  console.log('##### localId: ', localId);
  dispatch(fetchPokemons());
  const data = await fetch(`https://pokemon-game-dsa-default-rtdb.firebaseio.com/${localId}/pokemons.json`).then(res => res.json());
  console.log(data);
  dispatch(fetchPokemonsResolve(data));
};

export const addPokemon = (data) => {
  const newKey = FirebaseClass.database.ref().child('pokemons').push().key;
  FirebaseClass.database.ref('pokemons/' + newKey).set(data)
};

export default slice.reducer;