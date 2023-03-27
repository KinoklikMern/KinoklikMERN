const getFepksByFilmmakerId = (filmmakerId) => {
  try {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/fepks/byfilmmaker/${filmmakerId}`,
      { method: "GET" }
    )
      .then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
};


const getUserbyId = (userId) =>{
  try {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/filmmaker/getuserbyid/${userId}`,
      { method: "GET" }
    )
      .then((res) => res.json());
  } catch (error) {
    console.log(error.message);
  }
}

export { getFepksByFilmmakerId, getUserbyId };
