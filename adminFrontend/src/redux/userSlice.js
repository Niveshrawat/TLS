import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    setUser:  (state, action) => {
      state.user =  action.payload;
      state.role = action.payload.role
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.success ) {
          state.user =  action.payload.user;
          state.role = action.payload.user.role;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.error('Login failed:', action.error.message);
      });
  },
});
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
