import axios from "axios";

const url = "http://localhost:4000";

export const createOrder = async (
  userId,
  addressId,
  totalAmount,
  items,
  paymentMethod,
  CartId
) => {
  //dispatch(fetchProductStart());

  try {
    const { data } = await axios.post(`${url}/api/order`, {
      userId,
      addressId,
      totalAmount,
      items,
      paymentMethod,
      CartId,
    });
    console.log(data);
    //dispatch(fetchProductSuccess(data));
    return data
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      //dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};

export const getOrders = async (id) => {
  try {
    const { data } = await axios.get(`${url}/api/order/${id}`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      //dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await axios.get(`${url}/api/order/`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      //dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};
export const updateOrders = async (id, obj) => {
  try {
    const { data } = await axios.put(`${url}/api/order/${id}`, {
      obj,
    });
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      //dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};
export const getProductDetails = async (id) => {
  try {
    const { data } = await axios.get(`${url}/api/order/${id}/order_details`);
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      //dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};
