// src/features/auth/loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchlogin = createAsyncThunk(
  'login/fetchlogin',
  async (user) => {
    const url = 'http://127.0.0.1:3000/users/sign_in';
    const response = await axios.post(url, user);
    localStorage.setItem('token', response.headers['Authorization']);
    localStorage.setItem('data', JSON.stringify(response.data.user));
    return response.data.user;
  },
);

const initialState = {
  login: {},
  error: undefined,
  isLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchlogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchlogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.login = action.payload;
    });
    builder.addCase(fetchlogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default loginSlice.reducer;