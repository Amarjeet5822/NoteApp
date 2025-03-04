import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bc_url = "https://notesapp-bc.onrender.com"
// First, create the thunk ( Login User)
export const loginUser = createAsyncThunk(
  "authUser/loginUser",
  async ({ email, pass }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${bc_url}/users/login`,
        { email, pass },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed Login!")
    }
  
  }
);
// Register User
export const registerUser = createAsyncThunk(
  "authUser/registerUser",
  async ({email, pass, name},{ rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${bc_url}/users/register`,
        { name, email, pass },
        { withCredentials: true, }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed register!")
    }
  }
);
// Logout User
export const logoutUser = createAsyncThunk(
  "authUser/logoutUser",
  async ( _,{ rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${bc_url}/users/logout`,
        {},
        { withCredentials: true, }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed logout!")
    }
  }
);
// Delete User
export const deleteUser = createAsyncThunk(
  "authUser/deleteUser",
  async ( _,{ rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${bc_url}/users`,
        { withCredentials: true, }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to Delete!")
    }
  }
);

const initialState = {
  isLogged: JSON.parse(localStorage.getItem("isLogged")) || false,
  loading: false,
  error: null,
  data: null,
  success: false
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: { 
    resetState : (state) => {
      state.loading = false;
      state.error = null;
      state.data = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Login builder
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.data = null;
      state.error = null
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("isLogged", true);
      state.isLogged = true;
      state.loading = false;
      state.success = true;
      state.error = null
      state.data = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.data = null;
      state.error = action.payload || "failed login!";
    });
    // Register builder
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.success = false;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action ) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || "failed register!"
    });
    // Logout builder
    // builder.addCase(logoutUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.success = false;
    //   state.data = null
    // });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      localStorage.removeItem("isLogged");
      state.isLogged = false;
    
    });
    // builder.addCase(logoutUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload || "failed logout!";
    // })
    // Delete builder
    builder.addCase(deleteUser.fulfilled, (state) => {
      localStorage.removeItem("isLogged");
      state.isLogged = false;
    });


  },
});
export const {resetState } =  authUserSlice.actions;
export default authUserSlice.reducer;
