// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import authMiddleware from './authMiddleware';
import { cartReducer } from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});
