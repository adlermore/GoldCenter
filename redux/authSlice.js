// redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return await response.json();
});

export const register = createAsyncThunk('auth/register', async (userInfo) => {
  
  const response = await fetch('https://black.dev.itfabers.com/api/v2/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'system_key': 'wdfghj'
    },
    body: JSON.stringify(userInfo),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return await response.json();
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return {};
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        document.body.classList.remove("register_opened");
        document.body.style.overflowY = "scroll";
        document.body.style.overflow = "hidden";
        document.body.classList.add("success_opened");
        toast.success('Action was successful!');
      })

      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error('An error occurred!');

      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
