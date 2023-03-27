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

export { getFepksByFilmmakerId };
