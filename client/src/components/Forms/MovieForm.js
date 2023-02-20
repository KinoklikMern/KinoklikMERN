import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { Stack } from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditIcon from "@mui/icons-material/Edit";
import http from "../../http-common.js";
import useStyles from "./styles";
import FilmInfoForm from "./FilmInfoForm.js";
import FilmUploadForm from "./FilmUploadForm.js";

const MovieForm = () => {
  const classes = useStyles();
  const [file, setFile] = useState();
  const inputFileRef = useRef(null);
  const [message, setMessage] = useState("");
  const [movieData, setMovieData] = useState({
    moviefile: "",
    poster: "",
    traile: "",
    thumbnail: "",
  });

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = () => {
    let formData = new FormData();

    console.log(file);
    formData.append("file", file);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      http
        .post("/movies/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.key);
          console.log("*************");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };

  return (
    <Container>
      <Stack direction="row" spacing={3}>
        <Button
          //   className={classes.btnPurple}
          color="primary"
          variant="contained"
          title="Film Info"
          data-bs-toggle="modal"
          data-bs-target="#filmInfoModal"
          startIcon={<EditIcon />}
        >
          Film Info
        </Button>

        <Button
          variant="contained"
          title="Upload Film"
          data-bs-toggle="modal"
          data-bs-target="#uploadModal"
        >
          <UploadFileIcon />
          Upload Film
        </Button>

        <Button
          variant="contained"
          title="Upload Images"
          data-bs-toggle="modal"
          data-bs-target="#uploadImageModal"
          startIcon={<UploadFileIcon />}
        >
          Upload Images
        </Button>

        <Button
          variant="contained"
          title="Affiliate Links"
          data-bs-toggle="modal"
          data-bs-target="#affiliatesModal"
        >
          Affiliate Links
        </Button>
      </Stack>
      <div className="btn-container">
        {/* <%= f.hidden_field :user_id, value: current_user.id %> */}
        <div className="field">
          <Button
            className=" {styles.btn-purple} "
            type="submit"
            variant="contained"
          >
            Submit Movie{" "}
          </Button>
        </div>
      </div>
      <div>
        <FilmInfoForm />
        <FilmUploadForm />
      </div>

      <div
        class="modal fade"
        id="uploadImageModal"
        tabindex="-1"
        aria-labelledby="uploadImageModal"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content modal-form">
            <div class="modal-header">
              <h5 class="modal-title" id="uploadImageModal">
                Upload Images
              </h5>
              <button
                type="button"
                class="btn btn-close btn-purple"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="field">
                <div class="control">
                  <div class="file">
                    <label class="file-label card-file-upload m-2 p-3">
                      <span class="file-cta">
                        <div class="file-icon">
                          <i class="fas fa-video"></i> Choose a Poster...
                        </div>
                      </span>
                    </label>
                    <input
                      className="file-input"
                      filename={file}
                      onChange={fileSelected}
                      ref={inputFileRef}
                      type="file"
                      id="file"
                      accept="images/*"
                    ></input>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <div class="file">
                    <label class="file-label card-file-upload m-2 p-3">
                      {/* <%= f.input :trailer, label: false, as: :file, input_html: { class: "file-input", type: "file" } %> */}
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-video"></i>
                        </span>
                        <span class="file-label"> Choose a Banner...</span>
                      </span>
                    </label>
                    <input
                      className="file-input"
                      filename={file}
                      onChange={fileSelected}
                      ref={inputFileRef}
                      type="file"
                      id="file"
                      accept="images/*"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="{styles.btn-purple }"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>

    //   <div className="mt-3 d-flex justify-content-between">
    //
    //     <Button
    //       className={classes.buttonSubmit}
    //       variant="container"
    //       color="primary"
    //       sizer="large"
    //       type="submit"
    //       fullWidth
    //     >
    //       Submit
    //     </Button>
  );
};

export default MovieForm;
