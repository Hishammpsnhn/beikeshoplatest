// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers.js";
import categoryReducers from "./reducers/categoryReducers.js";
import productReducer from "./reducers/productReducers.js";
import cartReducers from "./reducers/cartReducers.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducers,
    products: productReducer,
    cart: cartReducers,
  },
});

export default store;
