import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (formData, { rejectWithValue, getState }) => {
    try {
      // Fetch the token from state or some other way
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.put(
        'https://api.thelearnskills.com/api/v1/auth/job/change-password',
        formData,
        config
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
  }
);

const employerSlice = createSlice({
  name: 'employer',
  initialState: {
    employer: null,
    loading: false,
    error: null,
  },
  reducers: {
    setEmployer: (state, action) => {
      state.employer = action.payload;
    },
    clearEmployer: (state) => {
      state.employer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmployer, clearEmployer } = employerSlice.actions;
export default employerSlice.reducer;
