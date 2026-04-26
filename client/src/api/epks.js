import axios from "axios";


export const getAllFepks = () => {
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/fepks`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};

export const getFepksByFilmmakerId = (filmmakerId) => {
  try {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/fepks/byfilmmaker/${filmmakerId}`,
      { method: "GET" }
    ).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};

export const getFepksById = (id) => {
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/fepks/${id}`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};

export const getFepksByTitle = (title) => {
  try {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/fepks/byTitle/${title}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};

export const getFepkFollowersNumber = (id) => {
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/fepks/followers/${id}`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
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

export const getUserById = (userId) => {
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/getuser/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};
// api for user is added to request list
export function addToRequests(message, epkId, userId) {
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/fepks/postRequests`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fepkId: epkId,
        user: userId,
        comment: message,
      }),
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
}

// api for add request message to chat
export const addToChat = async (message, user, filmmakerId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/chat`,
      {
        userId: filmmakerId,
        chatName: `${user.firstName} ${user.lastName}`,
      },
      config
    );
    // save request message to chat message
    if (data) {
      try {
        // const result =
        return await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/message`,
          {
            chatId: data._id,
            content: message,
          },
          config
        );
        // socket.emit("new message", result.data);
      } catch (error) {
        console.log(`message: ${error.message}`);
      }
    }
  } catch (error) {
    console.log(`message: ${error.message}`);
  }
};

// api for approve access request
export const approveRequest = (request) => {
  // const {fepkId, comment, user} = request;
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/fepks/approveRequest`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};

// api for refuse access request
export const refuseRequest = (request) => {
  // const {fepkId, comment, user} = request;
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/fepks/refuseRequest`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};

export const getMoviesByActors = async (actorId) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/fepks/getmoviesbyactor/${actorId}`;

    const response = await axios.get(url);

    const movies = response.data;

    return movies;
  } catch (error) {
    console.error("Error fetching movies by actor:", error);
    throw error;
  }
};

export const getDeletedFepksByFilmmakerId = (id) =>
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/fepks/deleted/${id}`)
    .then((r) => r.data);
// Set thumbnail banner for trailer
export const setBannerThumbnail = async (epkId, bannerId) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/fepks/${epkId}/banners/${bannerId}/set-thumbnail`;
    const response = await axios.put(url);
    return response.data;
  } catch (error) {
    console.error("Error setting thumbnail:", error);
    return { error: error.message };
  }
};

export const getMyCollaborations = (token) =>
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/fepks/collaborations/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.data);

export const listCollaborators = (epkId, token) =>
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/fepks/${epkId}/collaborators`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.data);

export const addCollaborator = (epkId, email, token) =>
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/fepks/${epkId}/collaborators`, { email }, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.data);

export const removeCollaborator = (epkId, userId, token) =>
  axios.delete(`${process.env.REACT_APP_BACKEND_URL}/fepks/${epkId}/collaborators/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.data);

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

// Push the final updated draft to the server
export const updateFepk = async (epkId, updatePayload, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/fepks/update/${epkId}`, 
      updatePayload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating EPK:", error);
    throw error;
  }
};
// Batch delete files from S3 when saving edits
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