import React from "react";
import { useSelector } from "react-redux";
import Movie from "./Movie/Movie";

const Movies = () => {
  const movies = useSelector((state) => state.movies);
  console.log(movies);
  return (
    <>
      <h1>Movies</h1>
      <Movie />
      <Movie />
      <Movie />
      <Movie />
    </>
  );
};

export default Movies;
