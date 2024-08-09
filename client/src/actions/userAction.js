import axios from "axios";

const url = "http://localhost:4000";

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
