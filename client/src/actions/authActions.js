import axios from "axios";
import {
  initial,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../reducers/authReducers";

const url = "http://localhost:4000";
axios.defaults.withCredentials = true;
export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { data } = await axios.post(`${url}/api/auth/login`, {
      email,
      password,
    });
    console.log(data);
    dispatch(loginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
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

export const signUp =
  ({ confirmPassword, dob, email, password, phoneNumber, userName }) =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      const { data } = await axios.post(`${url}/api/auth/signUp`, {
        email,
        password,
        confirmPassword,
        dob,
        phoneNumber,
        userName,
      });
      console.log(data);
      dispatch(initial());
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
export const verifyOtp = (otp, formData) => async (dispatch) => {
  dispatch(loginStart());
  console.log(otp, formData);
  try {
    const { data } = await axios.post(`${url}/api/auth/verify-otp`, {
      otp,
      formData,
    });

    dispatch(loginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
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

export const googleAuth =
  ({ email, name }) =>
  async (dispatch) => {
    // dispatch(loginStart());
    try {
      const { data } = await axios.post(`${url}/api/auth/google_verfiy`, {
        email,
        name,
      });
      console.log(data);
      dispatch(loginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
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

export const forgotPasswordAction = (email) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const { data } = await axios.post(`${url}/api/auth/forgot_password`, {
      email,
    });
    console.log(data);
    // dispatch(loginSuccess(data));
    dispatch(initial())
    // localStorage.setItem("userInfo", JSON.stringify(data));
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

export const forgot_password_verifyOtp = (otp, email) => async (dispatch) => {
  dispatch(loginStart());
  console.log(otp, email);
  try {
    const { data } = await axios.post(
      `${url}/api/auth/forgot_password_verifyOtp`,
      {
        otp,
        email,
      }
    );
    dispatch(initial());
    console.log(data)
    return data;
    // localStorage.setItem("userInfo", JSON.stringify(data));
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


export const change_password = ( id,password) => async (dispatch) => {
  dispatch(loginStart());
  console.log(password)
  try {
    const { data } = await axios.post(
      `${url}/api/auth/${id}/change_password`,
      {
       password
      }
    );
    dispatch(loginSuccess(data));
    console.log(data)
    localStorage.setItem("userInfo", JSON.stringify(data));
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
