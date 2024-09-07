import axios from 'axios'

const url = process.env.REACT_APP_SERVER_API;
axios.defaults.withCredentials = true;
export const getWallerInfo = async () => {
    try {
        const {data} = await axios.get(`${url}/api/wallet`)
        return data;
    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          console.error("Server Error Message:", errorMessage);
          //dispatch(fetchCartFailure(errorMessage));
        } else {
          console.error("Generic Error");
          //   dispatch(fetchCartFailure("Something went wrong"));
        }
    }
}