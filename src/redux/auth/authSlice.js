import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('data')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // ✅ persist to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('data', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // ✅ clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('data');
    },
    rehydrate: (state) => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('data') || 'null');

      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      } else {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const { setAuth, logout, rehydrate } = authSlice.actions;
export default authSlice.reducer;
