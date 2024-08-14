// src/reducers/user.js
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    quantity: 0,
    totalAmount: 0,
  },
  reducers: {
    fetchCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action) => {
        console.log(state, action.payload);
      state.items = action.payload?.items;
      state.totalAmount = action.payload?.totalAmount
      state.loading = false;
      state.error = null;
    },

    fetchCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    
   
  },
});

export const {
  fetchCartFailure,
  fetchCartStart,
  fetchCartSuccess,
  
} = CartSlice.actions;
export default CartSlice.reducer;
