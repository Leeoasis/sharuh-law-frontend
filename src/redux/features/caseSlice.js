import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Async thunk for fetching cases
export const fetchCases = createAsyncThunk(
  'case/fetchCases',
  async (userId) => {
    const response = await axiosInstance.get(`/cases?user_id=${userId}`);
    return response.data;
  }
);

// Async thunk for creating a case
export const createCase = createAsyncThunk(
  'case/createCase',
  async ({ userId, caseData }) => {
    const response = await axiosInstance.post(`/users/${userId}/cases`, caseData);
    return response.data;
  }
);

// Async thunk for updating a case
export const updateCase = createAsyncThunk(
  'case/updateCase',
  async ({ userId, caseId, caseData }) => {
    const response = await axiosInstance.put(`/cases/${caseId}?user_id=${userId}`, caseData);
    return response.data;
  }
);

// Async thunk for deleting a case
export const deleteCase = createAsyncThunk(
  'case/deleteCase',
  async ({ userId, caseId }) => {
    await axiosInstance.delete(`/cases/${caseId}?user_id=${userId}`);
    return caseId;
  }
);

const initialState = {
  cases: [],
  loading: false,
  error: null,
};

const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = action.payload;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCase.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.loading = false;
        state.cases.push(action.payload);
      })
      .addCase(createCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCase.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cases.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.cases[index] = action.payload;
        }
      })
      .addCase(updateCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCase.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = state.cases.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default caseSlice.reducer;
