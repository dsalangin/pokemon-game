import { createSlice } from '@reduxjs/toolkit'; 

export const slice = createSlice({
  name: 'gameStatus',
  initialState: {
    status: false,
  },
  reducers: { 
    setGameStatus: (state, action) => ({
      ...state,
      status: action.payload,
    })
  }
})


export const {setGameStatus} = slice.actions;

export  const currentGameStatus = (state) => state.gameStatus.status;

export default slice.reducer;