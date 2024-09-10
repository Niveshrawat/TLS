// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import formReducer from './slice/formSlice';
import shortReducer from './slice/shortSlice';
import internshipReducer from './slice/internshipSlice';
import universityReducer from './slice/universitySlice';
import longReducer from './slice/longSlice';
import employerReducer from './slice/employerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    form: formReducer,
    short: shortReducer,
    long: longReducer,
    internship: internshipReducer,
    university: universityReducer,
    employer: employerReducer,
  },
});

export default store;
