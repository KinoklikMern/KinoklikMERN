import React, { useState, useRef } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import http from "../../http-common.js";
import FileBase from "react-file-base64";

const Form = () => {
  const classes = useStyles();
  const [file, setFile] = useState();
  const inputFileRef = useRef(null);
  const [message, setMessage] = useState("");
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    genre: "",
    selectedFile: "",
  });

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    console.log("----------");
    console.log(file);
    formData.append("file", file);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      debugger;
      http
        .post("/movies/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.key);
          console.log("*************");
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Create a Movie</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={movieData.title}
          onChange={(e) =>
            setMovieData({ ...movieData, title: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={movieData.description}
          onChange={(e) =>
            setMovieData({ ...movieData, description: e.target.value })
          }
        />
        <TextField
          name="genre"
          variant="outlined"
          label="Genre"
          fullWidth
          value={movieData.genre}
          onChange={(e) =>
            setMovieData({ ...movieData, genre: e.target.value })
          }
        />
        {/* <div className={classes.fileInput}>
          <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) => setMovieData({ ...movieData, selectedFile: base64})} />
        </div> */}
        <div className="mt-3 d-flex justify-content-between">
          <input
            filename={file}
            onChange={fileSelected}
            ref={inputFileRef}
            type="file"
            id="file"
            // accept="images/*"
          ></input>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="container"
          color="primary"
          sizer="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
