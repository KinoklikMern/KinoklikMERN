import React, { useState, useRef } from "react";
import http from "../../http-common.js";
import axios from "axios";

function FilmUploadForm() {
  const [fileFilm, setFileFilm] = useState();
  const [fileTrailer, setFileTrailer] = useState();
  const inputFileRef = useRef(null);
  const inputFileRef2 = useRef(null);
  const [message, setMessage] = useState("");
  const [movieData, setMovieData] = useState({
    moviefile: "",
    poster: "",
    traile: "",
    thumbnail: "",
  });

  const filmSelected = (event) => {
    const file = event.target.files[0];
    setFileFilm(file);
  };

  const trailerSelected = (event) => {
    const file = event.target.files[0];
    setFileTrailer(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(fileFilm);
    console.log(fileTrailer);

    formData.append("fileFilm", fileFilm);
    formData.append("fileTrailer", fileTrailer);
    console.log(formData);
    debugger;
    if (
      fileFilm.type === "image/jpeg" ||
      fileFilm.type === "image/jpg" ||
      fileFilm.type === "image/png"
    ) {
   http.post("movie", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.key);
          console.log("*************");
        })
        .catch((err) => {
            console.log()
          console.log(err);
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };
  return (
    <form>
      <div
        class="modal fade"
        id="uploadModal"
        tabindex="-1"
        aria-labelledby="filmUploadModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content modal-form">
            <div class="modal-header">
              <h5 class="modal-title" id="filmUploadModalLabel">
                Upload
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
                      {/* <%= f.input :trailer, label: false, as: :file, input_html: { class: "file-input", type: "file" } %> */}
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-video"></i>
                        </span>
                        <span class="file-label">Choose a Movie</span>
                      </span>
                    </label>
                    <input
                      className="file-input"
                      filename={fileFilm}
                      onChange={filmSelected}
                      ref={inputFileRef}
                      type="file"
                      id="fileFilm"
                      name="files"
                      accept="video/*"
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
                        <span class="file-label">Choose a trailer</span>
                      </span>
                    </label>
                    <input
                      className="file-input"
                      filename={fileTrailer}
                      onChange={trailerSelected}
                      ref={inputFileRef2}
                      type="file"
                      id="fileTrailer"
                      name="files"
                      accept="video/*"
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
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FilmUploadForm;
