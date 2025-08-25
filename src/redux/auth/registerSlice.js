import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  (import.meta?.env?.VITE_API_URL) ||
  process.env.REACT_APP_API_URL ||
  'https://sharuh-law-backend.onrender.com';

export const fetchreg = createAsyncThunk(
  'sign_up/fetchregistration',
  async (formData) => {
    const url = `${API_URL}/signup`;
    // Don’t manually set Content-Type when sending FormData
    const response = await axios.post(url, formData, {
      headers: { Accept: 'application/json' },
    });

    // Axios lowercases header keys
    const token = response.headers?.authorization;
    if (token) localStorage.setItem('token', token);
    if (response?.data?.user) {
      localStorage.setItem('data', JSON.stringify(response.data.user));
    }

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
  reducers: {},
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
