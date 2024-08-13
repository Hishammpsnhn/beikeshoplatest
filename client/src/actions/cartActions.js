import axios from "axios";


const url = "http://localhost:4000";

export const addCart = async(userId,productId,size) => {
    try {
      const { data } = await axios.post(`${url}/api/cart/create`,{
        userId,
        productId,
        size,
      });
      console.log(data);
      return data;
      //dispatch(fetchCategorySuccess(data));
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.error("Server Error Message:", errorMessage);
        //dispatch(fetchCategoryFailure(errorMessage));
      } else {
        console.error("Generic Error");
        //dispatch(fetchCategoryFailure("Something went wrong"));
      }
    }
};


export const getCart = async(userId) => {
    try {
      const { data } = await axios.get(`${url}/api/cart/${userId}`);
      console.log(data);
      return data;
      //dispatch(fetchCategorySuccess(data));
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.error("Server Error Message:", errorMessage);
        //dispatch(fetchCategoryFailure(errorMessage));
      } else {
        console.error("Generic Error");
        //dispatch(fetchCategoryFailure("Something went wrong"));
      }
    }
};
