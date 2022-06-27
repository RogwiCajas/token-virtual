import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  token: '',
  tiempo: 60,
  check: '',
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
      setToken: ( state, action) => {
        state.token = action.payload.token;
        state.tiempo = action.payload.tiempo;
      },
      checkToken: (state, action) =>{
        state.check = action.payload.check;
      },
      setTimer: (state, action) => {
        state.tiempo = state.tiempo - 1;
      }
  },
});


// Action creators are generated for each case reducer function
export const { setToken, checkToken, setTimer} = tokenSlice.actions

export default tokenSlice.reducer