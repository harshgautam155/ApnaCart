import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  updateUser,
  delelteUser,
} from "../../api/authApi";

export const register = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI ) => {
    try {
      const res = await registerUser(formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, thunkAPI) => {
    try {
      const res = await verifyOtp(otpData);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification Failed",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await loginUser(credentials);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutUser();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout Failed");
    }
  },
);

export const fetchMe = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetchCurrentUser();
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Not authenticated",
      );
    }
  },
);

export const resendOtpThunk = createAsyncThunk(
    "auth/resent-otp",
    async(otpData, thunkAPI) => {
        try {
            const res = await resendOtp(otpData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "otp not resend"
            )
        }
    }
);

export const update = createAsyncThunk(
    "auth/updateUser",
    async(updatedData, thunkAPI) => {
        try {
            const res = await updateUser(updatedData);
            return res.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to Update User"
            )
        }
    }
)

export const deleteThunk = createAsyncThunk(
    "auth/delteuser",
    async(_, thunkAPI) => {
        try {
            const res = await delelteUser();
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete User"
            )
        }
    }
)

// SLICE

const initialState = {
    user: null,
    isAuthenticated: false,
    status: "idle",
    checked: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        //register
        .addCase(register.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(register.fulfilled, (state) => {
            state.status = "succeeded";
        })
        .addCase(register.rejected,(state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        //verify Otp
        .addCase(verifyOtpThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(verifyOtpThunk.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
            state.isAuthenticated = true;
            state.checked = true;
        })
        .addCase(verifyOtpThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        //resend otp
        .addCase(resendOtpThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(resendOtpThunk.fulfilled, (state) => {
            state.status = "succeeded";
        })
        .addCase(resendOtpThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        //login
        .addCase(login.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.isAuthenticated = true;
          state.checked = true;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          state.isAuthenticated = false;
        })

        //logout
        .addCase(logout.fulfilled, (state) => {
          state.status = "idle";
          state.isAuthenticated = false;
          state.user = null;
          state.checked = true;
        })

        //fetch user
        .addCase(fetchMe.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchMe.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.isAuthenticated = true;
          state.checked = true;
        })
        .addCase(fetchMe.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          state.user = null;
          state.isAuthenticated = false;
          state.checked = true;
        })

        //update 
        .addCase(update.fulfilled, (state, action) => {
          state.user = action.payload;
        })

        //delete account
        .addCase(deleteThunk.fulfilled, (state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.status = "idle";
        })
    }
})

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;