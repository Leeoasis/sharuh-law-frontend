import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchreg = createAsyncThunk(
  'sign_up/fetchregistration',
  async (userFormData) => {
    const url = 'https://sharuh-law-backend.onrender.com/signup';
    const response = await axios.post(url, userFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    localStorage.setItem('token', response.headers['Authorization']);
    localStorage.setItem('data', JSON.stringify(response.data.user));
    return response.data.user;
  }
);

const initialState = {
  sign_up: {},
  error: undefined,
  isLoading: false,
};

const registrationSlice = createSlice({
  name: 'sign_up',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchreg.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchreg.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sign_up = action.payload;
    });
    builder.addCase(fetchreg.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default registrationSlice.reducer;
