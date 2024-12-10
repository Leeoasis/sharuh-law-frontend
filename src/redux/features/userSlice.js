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

// Async thunk for fetching clients
export const fetchClients = createAsyncThunk(
  'user/fetchClients',
  async (criteria) => {
    const response = await axiosInstance.get('/api/clients', { params: criteria });
    return response.data;
  }
);

// Async thunk for updating user profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ id, profileData }) => {
    const response = await axiosInstance.put(`/api/user/${id}`, profileData);
    localStorage.setItem('data', JSON.stringify(response.data));
    return response.data;
  }
);

// Async thunk for fetching user profile by role and ID
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async ({ role, id }) => {
    const response = await axiosInstance.get(`/api/user/profile/${role}/${id}`);
    return response.data;
  }
);

const initialState = {
  lawyers: [],
  clients: [],
  profile: JSON.parse(localStorage.getItem('data')) || {},
  loading: false,
  error: null,
  successMessage: '', // Add successMessage to the initial state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = '';
    },
  },
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
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = 'Profile updated successfully'; // Set success message
        localStorage.setItem('data', JSON.stringify(action.payload)); // Update local storage
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSuccessMessage } = userSlice.actions;

export default userSlice.reducer;