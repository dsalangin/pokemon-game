import { createSlice } from '@reduxjs/toolkit'; 

export const slice = createSlice({
  name: 'selectedPokemons',
  initialState: {
    selectedPokemons: {},
  },
  reducers: { 
    onSelectedPokemons: (state, {payload: {key, pokemon}}) => {
      if(state[key]) {
        const copyState = {...state};
        delete copyState[key];
        return copyState;
      }
      console.log('#### STATE: ',state.selectedPokemons);
      return {
        ...state,
        [key]: pokemon,
      }
    },
  }
})


export const {onSelectedPokemons, setSelectedPokemons} = slice.actions;

export  const areSelectedPokemons = (state) => state.selectedPokemons.selectedPokemons;

export default slice.reducer;