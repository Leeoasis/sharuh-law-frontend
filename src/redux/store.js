import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './auth/registerSlice';
import loginReducer from './auth/loginSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    data: authReducer,
    login: loginReducer,
    sign_up: registrationReducer,
  },
});

export default store;
