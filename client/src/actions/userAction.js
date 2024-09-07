import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../reducers/authReducers";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_SERVER_API;

export const getUsers = async () => {
  //dispatch(fetchCategoryStart());
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  try {
    const { data } = await axios.get(`${url}/api/admin/user`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
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
export const userStatusUpdate = async (id) => {
  //dispatch(fetchCategoryStart());
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  try {
    const { data } = await axios.get(`${url}/api/admin/user/${id}/status`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
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
export const profileUpdate = (id, profile) => async (dispatch) => {
  //dispatch(fetchCategoryStart());
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  console.log(id, profile);
  try {
    const { data } = await axios.put(
      `${url}/api/admin/user/${id}/profile`,
      {
        profile,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(loginSuccess(data));
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(loginFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(loginFailure("Something went wrong"));
    }
  }
};

export const addShippingAddress = (formData) => async (dispatch) => {
  dispatch(loginStart());
  const userData = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userData);

  console.log(userInfo.user);
  if (!userInfo.user) {
    return;
  }
  try {
    const { data } = await axios.post(
      `${url}/api/admin/user/${userInfo.user._id}/address`,
      formData
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(loginSuccess(data));
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      toast.error(errorMessage)
      dispatch(loginFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(loginFailure("Something went wrong"));
      toast.error("something went error")
    }
    return error.response.data.message;
  }
};

export const deleteShippingAddress =
  (userId, addressId) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const { data } = await axios.delete(
        `${url}/api/admin/user/${userId}/address/${addressId}`
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(loginSuccess(data));
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.error("Server Error Message:", errorMessage);
        dispatch(loginFailure(errorMessage));
      } else {
        console.error("Generic Error");
        dispatch(loginFailure("Something went wrong"));
      }
      return error.response.data.message;
    }
  };

export const EditShippingAddress =
  (userId, addressId, formData) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const { data } = await axios.put(
        `${url}/api/admin/user/${userId}/address/${addressId}`,
        { formData }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(loginSuccess(data));
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.error("Server Error Message:", errorMessage);
       
        dispatch(loginFailure(errorMessage));
      } else {
        console.error("Generic Error");
        dispatch(loginFailure("Something went wrong"));
      }
      return error.response.data.message;
    }
  };
