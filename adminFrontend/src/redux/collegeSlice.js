import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCollege, getColleges } from '../services/apiServices';

export const fetchColleges = createAsyncThunk('college/fetchColleges', async () => {
  const response = await getColleges();
  return response.data;
});

export const addNewCollege = createAsyncThunk('college/addNewCollege', async (collegeData) => {
  const response = await createCollege(collegeData);
  return response.data;
});

const collegeSlice = createSlice({
  name: 'college',
  initialState: {
    colleges: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColleges.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.colleges = action.payload;
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewCollege.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewCollege.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.colleges.push(action.payload);
      })
      .addCase(addNewCollege.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default collegeSlice.reducer;
