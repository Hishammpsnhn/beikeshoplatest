import axios from "axios";
import {
  fetchAddCartStart,
  fetchAddCartSuccess,
  fetchCartFailure,
  fetchCartStart,
  fetchCartSuccess,
} from "../reducers/cartReducers";

const url = "http://localhost:4000";

export const addCart = (userId, productId, size) => async (dispatch) => {
  dispatch(fetchAddCartStart());
  try {
    const { data } = await axios.post(`${url}/api/cart/create`, {
      userId,
      productId,
      size,
    });
    console.log(data);
    dispatch(fetchAddCartSuccess(data));
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(fetchCartFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(fetchCartFailure("Something went wrong"));
    }
  }
};

export const getCart = (userId) => async (dispatch) => {
  dispatch(fetchCartStart());
  try {
    const { data } = await axios.get(`${url}/api/cart/${userId}`);
    console.log(data);
    dispatch(fetchCartSuccess(data));
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(fetchCartFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(fetchCartFailure("Something went wrong"));
    }
  }
};
export const updateCart =
  (userId, productId, action, size,qty) => async (dispatch) => {
    // dispatch(fetchCartStart());
    try {
      const { data } = await axios.put(`${url}/api/cart/${userId}`, {
        action,
        productId,
        size,
        qty
      });
      console.log(data);
      if (data) {
        dispatch(fetchCartSuccess(data));
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.error("Server Error Message:", errorMessage);
        dispatch(fetchCartFailure(errorMessage));
      } else {
        console.error("Generic Error");
        dispatch(fetchCartFailure("Something went wrong"));
      }
    }
  };
