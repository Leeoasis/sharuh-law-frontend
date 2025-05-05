import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// ✅ Create a case
export const createCase = createAsyncThunk(
  'case/createCase',
  async ({ userId, caseData }) => {
    const response = await axiosInstance.post('/cases', {
      user_id: userId,
      case: caseData,
    });
    return response.data.case;
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

// ✅ Update case (for general updates – not claiming)
export const updateCase = createAsyncThunk(
  'case/updateCase',
  async ({ userId, caseId, caseData }) => {
    const response = await axiosInstance.put(`/cases/${caseId}?user_id=${userId}`, {
      case: caseData,
    });
    return response.data;
  }
);

// ✅ Accept case using custom POST /cases/:id/accept
export const acceptCase = createAsyncThunk(
  'case/acceptCase',
  async ({ caseId, lawyerId }) => {
    const response = await axiosInstance.post(`/cases/${caseId}/accept`, {
      lawyer_id: lawyerId,
    });
    return { caseId, lawyerId, ...response.data };
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
      // Fetch cases
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

      // Create case
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

      // Update case
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

      // Accept case (custom route)
      .addCase(acceptCase.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptCase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cases.findIndex(c => c.id === action.payload.caseId);
        if (index !== -1) {
          state.cases[index].status = 'claimed';
          state.cases[index].lawyer_id = action.payload.lawyerId;
        }
      })
      .addCase(acceptCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete case
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
