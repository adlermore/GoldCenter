import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Initial state for auth
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,  // Set token initially to null
  status: 'idle',
  error: null,
};

// Async thunk to handle login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch('https://goldcenter.new.itfabers.com/api/v2/auth/login', {
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', data.access_token);
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to handle registration
export const register = createAsyncThunk('auth/register', async (userInfo, { rejectWithValue }) => {
  try {
    const response = await fetch('https://goldcenter.new.itfabers.com/api/v2/auth/signup', {
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', data.access_token);
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to handle logout
export const logout = createAsyncThunk('auth/logout', async (_, { getState, rejectWithValue }) => {
  const { token } = getState().auth;

  try {
    const response = await fetch('https://goldcenter.new.itfabers.com/api/v2/auth/logout', {
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

    // Remove token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }

    return {};
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to fetch user info
export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async (_, { getState, rejectWithValue }) => {
  const { token } = getState().auth;

  try {
    const response = await fetch('https://goldcenter.new.itfabers.com/api/v2/auth/user', {
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
      state.isAuthenticated = !!action.payload;
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
        state.isAuthenticated = true;
        toast.success('Login successful!');
        document.body.classList.remove("login_opened");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        // toast.error(`Login failed: ${state.error}`);
        // document.body.classList.remove("login_opened");
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
        toast.success('Registration successful!');

        document.body.classList.remove("register_opened");
        document.body.classList.add("success_opened");
        // document.body.style.overflow = "hidden"; 

      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        toast.error(`Registration failed: ${state.error}`);

        document.body.classList.remove("register_opened");
        // document.body.style.overflow = "hidden"; 

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
        state.isAuthenticated = true;
        toast.success('User data fetched successfully!');
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
        toast.error(`Failed to fetch user data: ${state.error}`);
      });
  },
});

// Action to initialize authentication from localStorage
export const initializeAuth = () => (dispatch) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUserInfo()); // Fetch user info if token exists
    }
  }
};

// Export actions and reducer
export const { setAuthenticated, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
