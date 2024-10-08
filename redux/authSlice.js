import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_DATA_API + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_DATA_API + "/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to handle logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_DATA_API + "/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token, // Changed to x-access-token
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      // Remove token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }

      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch user info
export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_DATA_API + "/user/user_info", // Changed endpoint
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token, // Changed to x-access-token
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
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
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        toast.success("Login successful!");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.body.classList.remove("login_opened");
        const fixedElements = document.querySelectorAll(".fixed-element");
        fixedElements.forEach((el) => {
          el.style.paddingRight = "";
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        toast.error(`Login failed: ${state.error}`);
      });

    // Registration handlers
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        toast.success("Registration successful!");

        document.body.classList.remove("register_opened");
        document.body.classList.add("success_opened");
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        toast.error(`Registration failed: ${state.error}`);

        document.body.classList.remove("register_opened");
      });

    // Logout handlers
    builder
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        toast.error(`Logout failed: ${state.error}`);
      });

    // Fetch user info handlers
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
        toast.error(`Failed to fetch user data: ${state.error}`);
      });
  },
});

// Action to initialize authentication from localStorage
export const initializeAuth = () => (dispatch) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUserInfo());
    }
  }
};

// Export actions and reducer
export const { setAuthenticated, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
