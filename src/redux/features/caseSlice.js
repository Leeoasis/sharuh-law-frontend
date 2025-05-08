import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { notifySuccess, notifyError } from '../../utils/NotificationSystem';

// ✅ Create a case — fixed route with toast feedback
export const createCase = createAsyncThunk(
  'case/createCase',
  async ({ userId, caseData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/${userId}/cases`, {
        case: caseData,
      });
      notifySuccess("Case created successfully!");
      return response.data;
    } catch (err) {
      notifyError("Failed to create case.");
      return rejectWithValue(err.response?.data || err.message);
    }
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

// ✅ Fetch available cases
export const fetchAvailableCases = createAsyncThunk(
  'case/fetchAvailableCases',
  async (lawyerId) => {
    const response = await axiosInstance.get(`/api/lawyer/${lawyerId}/available_cases`);
    return response.data;
  }
);

// ✅ Accept case
export const acceptCase = createAsyncThunk(
  'case/acceptCase',
  async ({ caseId, lawyerId }) => {
    const response = await axiosInstance.post(`/cases/${caseId}/accept`, {
      lawyer_id: lawyerId,
    });
    notifySuccess("Case accepted successfully!");
    return { caseId, lawyerId, ...response.data };
  }
);

// ✅ Update case
export const updateCase = createAsyncThunk(
  'case/updateCase',
  async ({ userId, caseId, caseData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/cases/${caseId}?user_id=${userId}`, {
        case: caseData,
      });
      notifySuccess("Case updated successfully!");
      return response.data;
    } catch (err) {
      notifyError("Failed to update case.");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete case
export const deleteCase = createAsyncThunk(
  'case/deleteCase',
  async ({ userId, caseId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/cases/${caseId}?user_id=${userId}`);
      notifySuccess("Case deleted successfully!");
      return caseId;
    } catch (err) {
      notifyError("Failed to delete case.");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const caseSlice = createSlice({
  name: 'case',
  initialState: {
    cases: [],
    availableCases: [],
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

      .addCase(fetchAvailableCases.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableCases.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCases = action.payload;
      })
      .addCase(fetchAvailableCases.rejected, (state, action) => {
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
        state.error = action.payload || action.error.message;
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
        state.error = action.payload || action.error.message;
      })

      .addCase(acceptCase.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptCase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cases.findIndex(c => c.id === action.payload.caseId);
        if (index !== -1) {
          state.cases[index].status = 'claimed';
          state.cases[index].lawyer_id = action.payload.lawyerId;
        } else {
          const acceptedCase = state.availableCases.find(c => c.id === action.payload.caseId);
          if (acceptedCase) {
            acceptedCase.status = 'claimed';
            acceptedCase.lawyer_id = action.payload.lawyerId;
            state.cases.push(acceptedCase);
            state.availableCases = state.availableCases.filter(c => c.id !== action.payload.caseId);
          }
        }
      })
      .addCase(acceptCase.rejected, (state, action) => {
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
        state.error = action.payload || action.error.message;
      });
  },
});

export default caseSlice.reducer;
