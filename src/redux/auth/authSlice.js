import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('data');
    },
    rehydrate: (state) => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('data') || 'null');
      if (token && user) {
        state.token = token;
        state.user = user;
      }
    },
  },
});

export const { setAuth, logout, rehydrate } = authSlice.actions;
export default authSlice.reducer;
