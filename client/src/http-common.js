import axios from "axios";
export const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

export default axios.create({
  baseURL: BASE_URL + "/",
  headers: {
    "Content-type": "application/json",
  },
});
