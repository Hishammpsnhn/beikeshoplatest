import axios from "axios";

const url = "http://localhost:4000";

export const createOrder = async (
  userId,
  addressId,
  totalAmount,
  items,
  paymentMethod,
) => {
  //dispatch(fetchProductStart());

  try {
    const { data } = await axios.post(`${url}/api/order`, {
      userId,
      addressId,
      totalAmount,
      items,
      paymentMethod,
    });
    console.log(data);
    //dispatch(fetchProductSuccess(data));
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
