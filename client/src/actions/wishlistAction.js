import axios from "axios";
const url = "http://localhost:4000";

axios.defaults.withCredentials = true;

export const addToWishlist = async (productId) => {
  try {
    const { data } = await axios.post(`${url}/api/wishlist`, {
      productId,
    });
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      //dispatch(fetchCartFailure(errorMessage));
    } else {
      console.error("Generic Error");
      //   dispatch(fetchCartFailure("Something went wrong"));
    }
  }
};
export const getWishlist = async () => {
  try {
    const { data } = await axios.get(`${url}/api/wishlist`);
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
    } else {
      console.error("Generic Error");
    }
  }
};
export const removeItemWishlist = async (productId) => {
  try {
    const { data } = await axios.put(`${url}/api/wishlist`, {
      productId,
    });
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
    } else {
      console.error("Generic Error");
    }
  }
};
