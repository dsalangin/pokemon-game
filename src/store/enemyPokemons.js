import { createSlice } from '@reduxjs/toolkit'; 

export const slice = createSlice({
  name: 'enemyPokemons',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchEnemyPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchEnemyPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchEnemyPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
  }
})


export const {fetchEnemyPokemons, fetchEnemyPokemonsResolve, fetchEnemyPokemonsReject} = slice.actions;

export const selectEnemyPokemonsData = (state) => state.enemyPokemons.data;

export const getEnemyPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchEnemyPokemons());
  const enemyResponse = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
  const enemyRequest = await enemyResponse.json();
  dispatch(fetchEnemyPokemonsResolve(enemyRequest.data));
};

export default slice.reducer;