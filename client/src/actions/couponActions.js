import axios from "axios";

const url = process.env.REACT_APP_SERVER_API;

axios.defaults.withCredentials = true;

export const createCoupon = async ({code, discount, expDate}) => {
  try {
    const { data } = await axios.post(`${url}/api/coupon_code`, {
      code,
      discount,
      expDate,
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(fetchCategoryFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchCategoryFailure("Something went wrong"));
    }
  }
};

export const getAllCoupons = async () => {
  try {
    const  {data}  = await axios.get(`${url}/api/coupon_code`);

    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(fetchCategoryFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchCategoryFailure("Something went wrong"));
    }
  }
};
export const getActiveCoupons = async () => {
  try {
    const  {data}  = await axios.get(`${url}/api/coupon_code/active_coupon`);

    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(fetchCategoryFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchCategoryFailure("Something went wrong"));
    }
  }
};

export const getCouponsByCode = async (code) => {
  try {
    const { data } = await axios.get(`${url}/api/coupon_code/coupon?code=${code}`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(fetchCategoryFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchCategoryFailure("Something went wrong"));
    }
  }
};

export const deleteCoupon = async (id) => {
  try {
    const { data } =await axios.delete(`${url}/api/coupon_code/${id}`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(fetchCategoryFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchCategoryFailure("Something went wrong"));
    }
  }
};
