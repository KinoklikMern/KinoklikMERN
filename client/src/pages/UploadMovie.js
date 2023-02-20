import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import { getMovies } from "../actions/movies";
import Movies from "../components/Movies/Movies";
import MovieForm from "../components/Forms/MovieForm";
import jb from "../images/jb.jpeg";
import useStyles from "../styles";

const UploadMovie = () => {
  return <MovieForm />;
};

export default UploadMovie;
