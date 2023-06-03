import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: 'auth-slice',
  initialState: {
    isAuthenticated: false,
    error: null,
    pending: false,
    user: null,
    message: null,
  },
  reducers: {
    register: (state, action) => {
      state.error = null;
      state.isAuthenticated = true;
      state.pending = false;
      state.user = action.payload.user
      state.message = action.payload.message
      state.token = action.payload.token
    },
    registerPending: (state, action) => {
      state.pending = true;
      state.error = null;
      state.token = null
    },
    registerFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload.error
      state.token = null
    },
    login: (state, action) => {
      state.error = null;
      state.isAuthenticated = true;
      state.pending = false;
      state.user = action.payload.user
      state.message = action.payload.message
      state.token = action.payload.token
    },
    loginPending: (state, action) => {
      state.pending = true;
      state.error = null;
      state.token = null
    },
    loginFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload.error
      state.token = null
    },
    logout: (state, action) => {
      state.error = null;
      state.isAuthenticated = false;
      state.pending = false;
      state.user = null
      state.message = action.payload.message
      state.token = null
    },
    logoutPending: (state, action) => {
      state.pending = true;
      state.error = null;
      state.message = null
    },
    logoutFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload.error
      state.message = null
    },
    clearError: (state, action) => {
      state.error = null
    }
  }
})

export const actions = AuthSlice.actions