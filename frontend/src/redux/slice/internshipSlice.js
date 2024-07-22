import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitInternshipForm } from '../../services/internshipservices';

export const submitForm = createAsyncThunk(
  'internship/submitForm',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await submitInternshipForm(formData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const internshipSlice = createSlice({
  name: 'internship',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default internshipSlice.reducer;
