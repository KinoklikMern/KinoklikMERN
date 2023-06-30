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

export const getActorById = (id) => {
  try {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/getactor/${id}`,
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
export const getActorFollowersNumber = (id) => {
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/getfollower/${id}`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};
export const getUserbyId = (userId) => {
  try {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/getuser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
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
