import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material'
import useStyles from './styles';
import FileBase from 'react-file-base64'

const Form = () => {

  const [movieData, setMovieData] = useState({title:'', description:'', genre:'', selectedFile: ''})
  const classes = useStyles();
  const handleSubmit = () => {

  }

  return (
    <Paper className={classes.paper} >
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Create a Movie</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={movieData.title}
          onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={movieData.description}
          onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
        />
        <TextField
          name="genre"
          variant="outlined"
          label="Genre"
          fullWidth
          value={movieData.genre}
          onChange={(e) => setMovieData({ ...movieData, genre: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) => setMovieData({ ...movieData, selectedFile: base64})} />
        </div>
        <Button className={classes.buttonSubmit} variant="container" color="primary" sizer="large" type="submit" fullWidth >Submit</Button>
      </form>
    </Paper>
  );
}

export default Form;
