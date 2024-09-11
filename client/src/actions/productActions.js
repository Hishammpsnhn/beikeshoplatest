import axios from "axios";
import {
  fetchProductStart,
  deleteProductSuccess,
  fetchProductFailure,
  fetchProductSuccess,
  stopLoading,
  oneProductSuccess,
  updateProduct,
} from "../reducers/productReducers";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_SERVER_API;

export const getProductsList = (sort) => async (dispatch) => {
  console.log(sort);
  dispatch(fetchProductStart());
  try {
    const { data } = await axios.get(`${url}/api/admin/product`, {
      params: { sort },
    });
    console.log(data);
    dispatch(fetchProductSuccess(data));
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};
export const getProductsByName = (query) => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const { data } = await axios.get(`${url}/api/admin/product/search?query=${query}`);
    console.log(data);
    dispatch(fetchProductSuccess(data));
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};

export const addProduct = (formdata) => async (dispatch) => {
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  dispatch(fetchProductStart());
  try {
    const { data } = await axios.post(
      `${url}/api/admin/product`,
      {
        formdata,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log(data);

    dispatch(stopLoading());
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
export const editProduct = (formdata, id) => async (dispatch) => {
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  dispatch(fetchProductStart());
  try {
    console.log(formdata);
    const { data } = await axios.put(
      `${url}/api/admin/product/${id}`,
      {
        formdata,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log(data);
    dispatch(stopLoading());
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      toast.error("Error:", "Name Already Exists");
      //dispatch(fetchCategoryFailure(errorMessage));
    } else {
      console.error("Generic Error");
      //dispatch(fetchCategoryFailure("Something went wrong"));
      toast.error("Error:", "something went wrong")
    }
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(fetchProductStart());
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  try {
    const { data } = await axios.delete(`${url}/api/admin/product/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch(deleteProductSuccess(data.product));
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};

export const oneProduct = (id) => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const { data } = await axios.get(`${url}/api/admin/product/${id}`);
    console.log(data);
    dispatch(oneProductSuccess(data));
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};
export const addOrUpdateRating = async (productId, userId, rating) => {
  console.log(productId, userId, rating);
  try {
    const { data } = await axios.post(`${url}/api/admin/product/rating`, {
      productId,
      userId,
      rating,
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};
export const applyProductOffer =
  (productId, discount = 0) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${url}/api/admin/product/${productId}/offer`,
        {
          discount,
        }
      );
      dispatch(updateProduct(data));
      return data;
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.error("Server Error Message:", errorMessage);
        // dispatch(fetchProductFailure(errorMessage));
      } else {
        console.error("Generic Error");
        // dispatch(fetchProductFailure("Something went wrong"));
      }
    }
  };
export const uploadFile = async (formdata, files, setUploadProgress) => {
  //dispatch(fetchProductStart());
  try {
    console.log(files);
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }
    console.log(fd);
    const { data } = await axios.post(`${url}/api/upload`, fd, {
      onUploadProgress: (progressEvent) => {
        setUploadProgress(progressEvent.progress * 100);
      },
    });
    return data;
    // dispatch(deleteProductSuccess(data.product));
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      // dispatch(fetchProductFailure(errorMessage));
    } else {
      console.error("Generic Error");
      // dispatch(fetchProductFailure("Something went wrong"));
    }
  }
};
