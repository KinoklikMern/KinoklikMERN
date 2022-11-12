import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Movies from './components/Movies/Movies'
import Form from './components/Forms/Form'
import jb from './images/jb.jpeg';


const App = () => {
  return (
    <Container maxidth='lg'>
      <AppBar postion="static" color="inherit">
        <Typography variant="h2" align="center">Justin Bieber</Typography>
        <img src={jb} alt="jb" height="60" />
      </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3} >
              <Grid item xs={12} sm={7} >
                <Movies />
              </Grid>
              <Grid item xs={12} sm={4} >
                <Form />
              </Grid>
            </Grid>
          </Container>

      </Grow>
    </Container>
  );

}

export default App;
