import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitForm as submitFormApi } from '../../services/formService';

export const submitForm = createAsyncThunk('form/submitForm', async (formData, { rejectWithValue }) => {
  try {
    const response = await submitFormApi(formData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const formSlice = createSlice({
  name: 'form',
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

export default formSlice.reducer;
