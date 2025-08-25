import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Direct backend API URL (no env vars to avoid Netlify build issues)
const API_URL = 'https://sharuh-law-backend.onrender.com';

export const fetchreg = createAsyncThunk(
  'sign_up/fetchregistration',
  async (formData, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/signup`;

      // Do NOT set Content-Type manually → Axios adds correct boundary
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
    } catch (err) {
      if (err.response) {
        // Return server error payload so component can display messages
        return rejectWithValue({
          status: err.response.status,
          data: err.response.data,
        });
      }
      return rejectWithValue({ status: 0, message: err.message });
    }
  }
);

const initialState = {
  sign_up: {},
  error: undefined,
  isLoading: false,
  serverErrors: null, // Capture full server error payload (422 messages, etc.)
};

const registrationSlice = createSlice({
  name: 'sign_up',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchreg.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.serverErrors = null;
      })
      .addCase(fetchreg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sign_up = action.payload;
      })
      .addCase(fetchreg.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.serverErrors = action.payload || null;
      });
  },
});

export default registrationSlice.reducer;
