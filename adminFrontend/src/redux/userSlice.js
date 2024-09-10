import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://api.thelearnskills.com/api/v1/auth/admin/login', { email, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});


export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://api.thelearnskills.com/api/v1/auth/admin/register', userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.user.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log('User registered successfully:', action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
