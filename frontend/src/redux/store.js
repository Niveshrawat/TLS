import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slice/userSlice';
import formReducer from './slice/formSlice'
import shortReducer from './slice/shortSlice'
import internshipReducer from './slice/internshipSlice';
import universityReducer from './slice/universitySlice';
import longReducer from './slice/longSlice';

const store = configureStore({
  reducer: {
    
    user: userSlice,
    form: formReducer, 
    short: shortReducer,
    long: longReducer,
    internship: internshipReducer,   
    university: universityReducer,
  },
});

export default store;