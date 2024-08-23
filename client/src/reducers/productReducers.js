// src/reducers/user.js
import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    product: null,
    selectedCategory: null,
  },
  reducers: {
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      console.log(state, action.payload);
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      console.log(state, action.payload);
      state.products = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      state.loading = false;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
      state.error = null;
    },
    oneProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      state.products = state.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    },
  },
});

export const {
  fetchProductFailure,
  fetchProductStart,
  fetchProductSuccess,
  addProductSuccess,
  deleteProductSuccess,
  oneProductSuccess,
  stopLoading,
  setSelectedCategory,
  updateProduct
} = ProductSlice.actions;
export default ProductSlice.reducer;
