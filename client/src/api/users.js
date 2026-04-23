import axios from "axios";
import http from "../http-common";

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

export const getActorFollowersNumber = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/getfollower/${id}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteS3MediaBatch = async (epkId, keys, token) => { 
  if (!keys || keys.length === 0) return { message: "No keys to delete" };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/fepks/delete-media-batch`, 
      { epkId, keys }, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error batch deleting media from S3:", error);
    throw error;
  }
};

export const uploadSingleFile = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file); 
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/fepks/uploadFile`, 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data.key; 
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updatePayload, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${userId}`, 
      updatePayload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating User:", error);
    throw error;
  }
};