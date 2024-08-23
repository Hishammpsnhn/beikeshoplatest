// src/reducers/user.js
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategorySuccess: (state, action) => {
      console.log(state, action.payload);
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCategorySuccess: (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteCategoriesSuccess: (state, action) => {
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload._id
      );
      state.loading = false;
      state.error = null;
    },
    updateCategory: (state, action) => {
      const updateCategory = action.payload;
      state.categories = state.categories.map((category) =>
        category._id === updateCategory._id ? updateCategory : category
      );
    },
  },
});

export const {
  fetchCategoryFailure,
  fetchCategoryStart,
  fetchCategorySuccess,
  addCategorySuccess,
  deleteCategoriesSuccess,
  updateCategory
} = categorySlice.actions;
export default categorySlice.reducer;
