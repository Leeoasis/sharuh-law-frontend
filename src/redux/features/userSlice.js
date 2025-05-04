import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Fetch lawyers based on criteria
export const fetchLawyers = createAsyncThunk(
  'user/fetchLawyers',
  async (criteria) => {
    const response = await axiosInstance.get('/api/lawyers', { params: criteria });
    return response.data;
  }
);

// Fetch clients — either all or only assigned to a specific lawyer
export const fetchClients = createAsyncThunk(
  'user/fetchClients',
  async (criteria = {}) => {
    const { lawyer_id } = criteria;
    const url = lawyer_id ? `/api/lawyer/${lawyer_id}/clients` : '/api/clients';
    const response = await axiosInstance.get(url);
    return response.data;
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ id, profileData }) => {
    const response = await axiosInstance.put(`/api/user/${id}`, profileData);
    localStorage.setItem('data', JSON.stringify(response.data));
    return response.data;
  }
);

// Fetch user profile
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async ({ role, id }) => {
    const response = await axiosInstance.get(`/api/user/profile/${role}/${id}`);
    return response.data;
  }
);

// Fetch notifications for a user
export const fetchNotifications = createAsyncThunk(
  'user/fetchNotifications',
  async (userId) => {
    const response = await axiosInstance.get(`/api/notifications/${userId}`);
    return response.data;
  }
);

// Rehydrate user from localStorage
export const rehydrateUser = createAsyncThunk(
  'user/rehydrateUser',
  async () => {
    return JSON.parse(localStorage.getItem('data'));
  }
);

const initialState = {
  lawyers: [],
  clients: [],
  profile: JSON.parse(localStorage.getItem('data')) || {},
  notifications: [],
  loading: false,
  error: null,
  successMessage: '',
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
      .addCase(fetchLawyers.fulfilled, (state, action) => {
        state.lawyers = action.payload;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.successMessage = 'Profile updated successfully';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(rehydrateUser.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { clearSuccessMessage } = userSlice.actions;
export default userSlice.reducer;
