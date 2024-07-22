import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitForm as submitFormApi } from '../../services/longServices';

export const submitForm = createAsyncThunk('long/submit-long-term-certificate', async (formData, { rejectWithValue }) => {
  try {
    const response = await submitFormApi(formData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const longSlice = createSlice({
  name: 'long',
  initialState: {
    formData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default longSlice.reducer;
