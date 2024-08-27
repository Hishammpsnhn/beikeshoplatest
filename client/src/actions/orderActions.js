import axios from "axios";
import { toast } from 'react-toastify';

const url = "http://localhost:4000";

export const createOrder = async (
  userId,
  addressId,
  totalAmount,
  items,
  paymentMethod,
  CartId,
  discount,
  finalPrice,
  paymentStatus
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
      discount,
      finalPrice,
      paymentStatus
    });
    console.log(data);
    //dispatch(fetchProductSuccess(data));
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      //dispatch(fetchProductFailure(errorMessage));
      toast.error(errorMessage);
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
    console.log(data);
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
    console.log(data);
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

export const onlinePaymentOrder = async (totalAmount) => {
  try {
    const { data } = await axios.post(`${url}/api/order/online_payment_order`, {
      totalAmount,
    });
    console.log(data);
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
export const onlinePaymentOrderVerify = async (body) => {
  try {
    const { data } = await axios.post(
      `${url}/api/order/online_payment_order/validate`,
      {
        body,
      }
    );
    console.log(data);
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
export const updateOrdersReturn = async (id, obj) => {
  try {
    const { data } = await axios.put(`${url}/api/order/${id}/return`, {
      obj,
    });
    console.log(data);
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

export const salesReport = async (startDate,endDate,sort) => {
  const query = new URLSearchParams({
    startDate,
    endDate,
    sort
  }).toString();
  try {
    const { data } = await axios.get(`${url}/api/admin/salesReport?${query}`);
    console.log(data);
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
