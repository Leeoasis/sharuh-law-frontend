import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Async thunk for fetching lawyers
export const fetchLawyers = createAsyncThunk(
  'user/fetchLawyers',
  async (criteria) => {
    const response = await axiosInstance.get('/api/lawyers', { params: criteria });
    return response.data;
  }
);

// Async thunk for updating user profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData) => {
    const response = await axiosInstance.put('/api/user', profileData);
    localStorage.setItem('data', JSON.stringify(response.data));
    return response.data;
  }
);

const initialState = {
  lawyers: [],
  profile: JSON.parse(localStorage.getItem('data')) || {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLawyers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLawyers.fulfilled, (state, action) => {
        state.loading = false;
        state.lawyers = action.payload;
      })
      .addCase(fetchLawyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;