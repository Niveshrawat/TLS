import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import collegeSlice from './redux/collegeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    colleges: collegeSlice,
  },
});

export default store;
