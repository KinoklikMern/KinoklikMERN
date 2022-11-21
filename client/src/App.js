import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getMovies } from './actions/movies';
import Movies from './components/Movies/Movies'
import Form from './components/Form/Form'
import jb from './images/jb.jpeg';
import useStyles from './styles';
import Home from './pages/Home'


const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch])

  return (
    < >
      <Grid>
        <Home />
      </Grid>
    </>

  );

}

export default App;
