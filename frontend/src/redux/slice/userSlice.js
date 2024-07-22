import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi } from '../../services/apiServices';

export const registerUser = createAsyncThunk('user/registerUser', async (formData, thunkAPI) => {
  try {
    const data = await registerUserApi(formData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (credentials, thunkAPI) => {
  try {
    const data = await loginUserApi(credentials);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: getUserFromLocalStorage(),
    status: 'idle',
    error: null,
    isRegistered: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
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
        state.error = action.payload.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
