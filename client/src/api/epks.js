const getFepksByFilmmakerId = (filmmakerId) => {
  try {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/fepks/byfilmmaker/${filmmakerId}`,
      { method: "GET" }
    ).then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};

const getUserbyId = (userId) => {
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

// api for approve access request
const approveRequest = (request) => {
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
const refuseRequest = (request) => {
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

export { getFepksByFilmmakerId, getUserbyId, approveRequest, refuseRequest };
