import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './redux/userSlice';
import collegeSlice from './redux/collegeSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    colleges: collegeSlice
  },
});

export default store;
