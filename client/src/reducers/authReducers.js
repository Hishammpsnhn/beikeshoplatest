// src/reducers/user.js
import { createSlice } from '@reduxjs/toolkit';

const storageUser = localStorage.getItem('userInfo');
const userInfoFromStorage = storageUser ? JSON.parse(storageUser) : null;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userInfoFromStorage?.user,
        isAuthenticated: userInfoFromStorage === null ? false : true,
        loading: false, 
        error:null,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        },
        initial: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout ,initial} = userSlice.actions;
export default userSlice.reducer;