import axios from "axios";
const url = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const dashboardLineGraph = async (period) => {
  console.log(period);
  
  try {
    const { data } = await axios.get(`${url}/api/dashboard/${period}`);
    console.log(data);
    return data.data;
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
export const getTopProduct = async () => {
  try {
    const { data } = await axios.get(`${url}/api/dashboard/getTopProducts`);
    console.log(data);
    return data.data;
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
export const getTopCategories = async (period) => {
  console.log(period);
  
  try {
    const { data } = await axios.get(`${url}/api/dashboard/getTopCategory`);
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
