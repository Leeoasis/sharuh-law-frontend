import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { notifySuccess, notifyError } from '../../utils/NotificationSystem';

export const fetchLawyers = createAsyncThunk(
  'user/fetchLawyers',
  async (criteria) => {
    console.log("➡️ Calling /api/lawyers with criteria:", criteria);
    const response = await axiosInstance.get('/api/lawyers', { params: criteria });
    return response.data;
  }
);

export const fetchClients = createAsyncThunk(
  'user/fetchClients',
  async (criteria = {}) => {
    const { lawyer_id } = criteria;
    const url = lawyer_id ? `/api/lawyer/${lawyer_id}/clients` : '/api/clients';
    const response = await axiosInstance.get(url);
    console.log('Fetched clients:', response.data); // Debug log
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/user/${id}`, profileData);
      localStorage.setItem('data', JSON.stringify(response.data));
      notifySuccess('Profile updated successfully');
      return response.data;
    } catch (err) {
      notifyError('Failed to update profile');
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async ({ role, id }) => {
    const response = await axiosInstance.get(`/api/user/profile/${role}/${id}`);
    return response.data;
  }
);

export const fetchNotifications = createAsyncThunk(
  'user/fetchNotifications',
  async (userId) => {
    const response = await axiosInstance.get(`/api/notifications/${userId}`);
    return response.data;
  }
);

export const rehydrateUser = createAsyncThunk(
  'user/rehydrateUser',
  async () => {
    const user = JSON.parse(localStorage.getItem('data'));
    const token = localStorage.getItem('token');
    return { ...user, token };
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
    reset: (state) => {
      return {
        ...state,
        profile: {},
        notifications: [],
        lawyers: [],
        clients: [],
        successMessage: '',
        loading: false,
        error: null,
      };
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

export const { clearSuccessMessage, reset } = userSlice.actions;
export default userSlice.reducer;
