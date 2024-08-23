import axios from "axios";
import {
  addCategorySuccess,
  deleteCategoriesSuccess,
  fetchCategoryFailure,
  fetchCategoryStart,
  fetchCategorySuccess,
  updateCategory,
} from "../reducers/categoryReducers";
import {
  fetchProductFailure,
  fetchProductStart,
  fetchProductSuccess,
} from "../reducers/productReducers";

const url = "http://localhost:4000";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 403) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const addCategory = (name, description) => async (dispatch) => {
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  dispatch(fetchCategoryStart());
  try {
    const { data } = await axios.post(
      `${url}/api/admin/category`,
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log(data);
    dispatch(addCategorySuccess(data));
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(fetchCategoryFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(fetchCategoryFailure("Something went wrong"));
    }
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch(fetchCategoryStart());
  try {
    const { data } = await axios.get(`${url}/api/admin/category`);
    console.log(data);
    dispatch(fetchCategorySuccess(data));
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(fetchCategoryFailure(errorMessage));
    } else {
      console.error("Generic Error");
      dispatch(fetchCategoryFailure("Something went wrong"));
    }
  }
};

export const deleteCategories = (id) => async (dispatch) => {
  const data = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(data);
  dispatch(fetchCategoryStart());
  try {
    const { data } = await axios.delete(`${url}/api/admin/category/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(data);
    dispatch(deleteCategoriesSuccess(data?.category));
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
      dispatch(errorMessage);
    } else {
      console.error("Generic Error");
      dispatch(fetchCategoryFailure("Something went wrong"));
    }
  }
};
export const getProductByCategory = (id, sort) => async (dispatch) => {
  dispatch(fetchProductStart());

  try {
    const { data } = await axios.get(
      `${url}/api/admin/category/product?category=${id}`,
      {
        params: { sort },
      }
    );
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

export const applyOfferCategory =
  (categoryId, discount = 0) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${url}/api/admin/category/${categoryId}/offer`,
        {
          discount,
        }
      );
      dispatch(updateCategory(data));
      console.log(data);
      return data;
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
