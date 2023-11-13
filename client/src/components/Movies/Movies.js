import React from "react";
import { useSelector } from "react-redux";
import Movie from "./Movie/Movie";
import {usetranslation} from 'react-i18next'

const Movies = () => {
  const { t } = usetranslation();
  const movies = useSelector((state) => state.movies);
  console.log(movies);
  return (
    <>
      <h1>{t('Movies')}</h1>
      <Movie />
      <Movie />
      <Movie />
      <Movie />
    </>
  );
};

export default Movies;
