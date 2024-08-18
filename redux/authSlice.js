import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Initial state for auth
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

// Async thunk to handle login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch('https://black.dev.itfabers.com/api/v2/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'system_key': 'wdfghj',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    // Store the token in localStorage
    localStorage.setItem('access_token', data.access_token);

    // Return data to be handled in the fulfilled case
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to handle registration
export const register = createAsyncThunk('auth/register', async (userInfo, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch('https://black.dev.itfabers.com/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'system_key': 'wdfghj',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    // Return data to be handled in the fulfilled case
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to handle logout
export const logout = createAsyncThunk('auth/logout', async (_, { getState, rejectWithValue }) => {
  const { token } = getState().auth;

  try {
    const response = await fetch('https://black.dev.itfabers.com/api/v2/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'system_key': 'wdfghj',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    // Return empty object on success
    return {};
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to fetch user info
export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async (_, { getState, rejectWithValue }) => {
  const { token } = getState().auth;

  try {
    const response = await fetch('https://black.dev.itfabers.com/api/v2/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'system_key': 'wdfghj',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login handlers
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;

        // Store token in localStorage
        localStorage.setItem('access_token', action.payload.access_token);

        // Fetch user info after login
        state.isAuthenticated = true;
        toast.success('Login successful!');
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        toast.error(`Login failed: ${state.error}`);
      });

    // Registration handlers
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;

        // Store token in localStorage
        localStorage.setItem('access_token', action.payload.access_token);

        document.body.classList.remove("register_opened");
        document.body.style.overflowY = "scroll";
        document.body.style.overflow = "hidden";
        document.body.classList.add("success_opened");

        toast.success('Registration successful!');
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        toast.error(`Registration failed: ${state.error}`);
      });

    // Logout handlers
    builder
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;

        // Remove token from localStorage
        localStorage.removeItem('access_token');

        toast.info('Logged out successfully!');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        toast.error(`Logout failed: ${state.error}`);
      });

    // Fetch user info handlers
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;

        // Set authentication status
        state.isAuthenticated = true;
        toast.success('User data fetched successfully!');
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        toast.error(`Failed to fetch user data: ${state.error}`)
        state.isAuthenticated = false;
      });
  },
});

// Export actions and reducer
export const { setAuthenticated, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
