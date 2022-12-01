import axios from "axios";
export const BASE_URL = "http://localhost:8000";

export default axios.create({
  baseURL: BASE_URL + "/",
  headers: {
    "Content-type": "application/json",
  },
});