import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// ✅ Create a case (fixes wrong route)
export const createCase = createAsyncThunk(
  'case/createCase',
  async ({ userId, caseData }) => {
    const response = await axiosInstance.post('/cases', {
      user_id: userId,
      case: caseData,
    });
    return response.data.case; // assume backend responds with { message, case }
  }
);

// ✅ Fetch cases
export const fetchCases = createAsyncThunk(
  'case/fetchCases',
  async (userId) => {
    const response = await axiosInstance.get(`/cases?user_id=${userId}`);
    return response.data;
  }
);

// ✅ Update case
export const updateCase = createAsyncThunk(
  'case/updateCase',
  async ({ userId, caseId, caseData }) => {
    const response = await axiosInstance.put(`/cases/${caseId}?user_id=${userId}`, {
      case: caseData,
    });
    return response.data;
  }
);

// ✅ Delete case
export const deleteCase = createAsyncThunk(
  'case/deleteCase',
  async ({ userId, caseId }) => {
    await axiosInstance.delete(`/cases/${caseId}?user_id=${userId}`);
    return caseId;
  }
);

const caseSlice = createSlice({
  name: 'case',
  initialState: {
    cases: [],
    loading: false,
    error: null,
  },
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
        const index = state.cases.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.cases[index] = action.payload;
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
        state.cases = state.cases.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default caseSlice.reducer;
