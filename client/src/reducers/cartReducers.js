// src/reducers/user.js
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
    loading: false,
    addCartLoading: false,
    error: null,
    quantity: 0,
    totalAmount: 0,
    CartId: null,
  },
  reducers: {
    fetchCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAddCartStart: (state) => {
      state.addCartLoading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action) => {
      state.items = action.payload?.items;
      state.totalAmount = action.payload?.totalAmount;
      state.loading = false;
      state.CartId = action.payload?._id;
      state.error = null;
    },
    fetchAddCartSuccess: (state, action) => {
      state.items = action.payload?.items;
      state.totalAmount = action.payload?.totalAmount;
      state.addCartLoading = false;
      state.CartId = action.payload?._id;
      state.error = null;
    },
    fetchCartFailure: (state, action) => {
      state.loading = false;
      state.addCartLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCartFailure,
  fetchCartStart,
  fetchCartSuccess,
  fetchAddCartStart,
  fetchAddCartSuccess
} = CartSlice.actions;
export default CartSlice.reducer;
