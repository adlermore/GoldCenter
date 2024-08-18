// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import authMiddleware from './authMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});
