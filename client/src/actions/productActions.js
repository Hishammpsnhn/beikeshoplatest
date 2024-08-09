import axios from "axios";
import {
  fetchProductStart,
  addProductSuccess,
  deleteProductSuccess,
  fetchProductFailure,
  fetchProductSuccess,
  stopLoading,
  oneProductSuccess,
} from "../reducers/productReducers";

const url = "http://localhost:4000";

export const getProductsList = () => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const { data } = await axios.get(`${url}/api/admin/product`);
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
    console.log(formdata);
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
    const { data } = await axios.put(`${url}/api/admin/product/${id}`, {
      formdata,
    },{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
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

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(fetchProductStart());
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  try {
    const { data } = await axios.delete(`${url}/api/admin/product/${id}`,{
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
    return data
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
