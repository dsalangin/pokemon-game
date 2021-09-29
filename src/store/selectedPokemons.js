import { createSlice } from '@reduxjs/toolkit'; 

export const slice = createSlice({
  name: 'selectedPokemons',
  initialState: {
    selectedPokemons: {},
  },
  reducers: { 
    onSelectedPokemons: (state, {payload: {key, pokemon}}) => {
      const newPokemons = {...state.selectedPokemons}
      if(newPokemons[key]) {
        delete newPokemons[key];
        return {
          ...state,
          selectedPokemons: newPokemons
        }
      }
      if(Object.entries(state.selectedPokemons).length < 5) {
        newPokemons[key] = pokemon;
        return {
          ...state,
          selectedPokemons: newPokemons
        }
      }
    },
    clearSelectedPokemons: (state) => ({
      ...state,
      selectedPokemons: {},
    }),
  }
})


export const {onSelectedPokemons, clearSelectedPokemons} = slice.actions;

export  const areSelectedPokemons = (state) => state.selectedPokemons.selectedPokemons;

export default slice.reducer;