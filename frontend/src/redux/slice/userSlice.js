import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi, requestPasswordResetApi, resetPasswordApi } from '../../services/apiServices';

// Async thunk for registering a user
// userSlice.js

export const registerUser = createAsyncThunk('user/registerUser', async (formData, thunkAPI) => {
  try {
    const data = await registerUserApi(formData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Pass error message to payload
  }
});


// Async thunk for logging in a user
export const loginUser = createAsyncThunk('user/loginUser', async (credentials, thunkAPI) => {
  try {
    const data = await loginUserApi(credentials);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || error);
  }
});

// Async thunk for requesting a password reset
export const requestPasswordReset = createAsyncThunk('user/requestPasswordReset', async ({ email, answer, newPassword }, thunkAPI) => {
  try {
    const response = await requestPasswordResetApi(email);
    return response; // Assuming API returns a success message
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || error);
  }
});

export const resetPassword = createAsyncThunk('user/resetPassword', async ({ token, newPassword }, thunkAPI) => {
  try {
    const response = await resetPasswordApi(token, newPassword);
    return response; // Assuming API returns a success message
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || error);
  }
});

// Helper function to get user from local storage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user);
    } catch (e) {
      console.error('Error parsing user data from localStorage', e);
      return null;
    }
  }
  return null;
};

// Initial state for user slice
const initialState = {
  user: getUserFromLocalStorage(),
  status: 'idle',
  error: null,
  isRegistered: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.isRegistered = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
