import axios from "axios";
import http from "./../http-common";

export const login = async (email, password) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        email: email,
        password: password,
      }
    );
  } catch (error) {
    return error.response.data.message;
  }
};

export const getAllUsers = () => {
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/getactors`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/verify-email`,
      userInfo
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const resendEmailVerificationToken = async (userId) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/resend-email-verification-token`,
      { userId }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getUserById = async (userId, config = {}) => {
  try {
    const { data } = await http.get(`/users/getuser/${userId}`, config);
    return data;
  } catch (error) {
    console.error("Error in getUserById:", error.response?.data || error.message);
    throw error;
  }
};