import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import http from "../../../http-common";

function EpkCoverForm() {
  //const [movieId, setMovieId] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const inputFile1Ref = useRef(null);
  const inputFile2Ref = useRef(null);
  const [message, setMessage] = useState("");

  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
  };

  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const [epkCoverData, setEpkCoverData] = useState({
    title: "",
    logLine: "",
    genre: "",
    minutes: "",
    banner_url: "",
    trailer_url: "",
    kickstarter_url: "",
  });
  const movieGenre = [
    "Genre...",
    "action",
    "comedy",
    "documentary",
    "romance",
    "action",
    "horror",
    "mystery",
    "drama",
    "western",
    "science fiction",
    "thriller",
    "crime",
    "animation",
    "musical",
    "war",
    "romantic comedy",
    "noir",
    "disaster",
    "dark comedy",
    "historical film",
    "slasher",
    "adventure",
    "gangster",
    "spy",
    "fantasy",
    "biographical",
    "found footage",
    "legal drama",
    "melodrama",
    "superhero",
    "slapstick",
    "monster",
    "historical fiction",
    "teen",
    "apocalyptic",
    "post-apocalyptic",
    "psychological thriller",
    "stop motion",
    "sports",
    "space opera",
    "mockumentary",
  ];
  const makeGenreItem = (X) => {
    return <option value={X}> {X}</option>;
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEpkCoverData({ ...epkCoverData, [name]: value });
  };

  const checkFileMimeType = (file) => {
    if (file !== "") {
      if (
        file.type === "video/mp4" ||
        file.type === "video/mpeg" ||
        file.type === "video/quicktime" ||
        file.type === "video/x-ms-wmv" ||
        file.type === "video/ogg" ||
        file.type === "video/3gpp" ||
        file.type === "	video/x-msvideo" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        return true;
      else return false;
    } else return true;
  };

  const saveEpkCover = (e) => {
    debugger;
    e.preventDefault();
    let formData = new FormData();
    console.log(file1);
    console.log(file2);

    formData.append("file1", file1);

    formData.append("file2", file2);
    console.log(formData);
    debugger;
    if (checkFileMimeType(file1) && checkFileMimeType(file2)) {
      http
        .post("epks/uploadFiles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.file1 !== undefined) {
            epkCoverData.banner_url = response.data.file1;
          }
          if (response.data.file2 !== undefined) {
            epkCoverData.trailer_url = response.data.file2;
          }
          http
            .post("epks/epkcover", epkCoverData)
            .then((res) => {
              console.log("saved");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log();
          console.log(err);
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };

  return (
    <div className="container">
      <form>
        <div className="card">
          <div className="row card-header">
            <h2 className="col align-items-start text-dark">EPK Upload Page</h2>
            <Link className="col align-items-end" to="/Epk">
              Show EPK
            </Link>
          </div>

          <div className="card-body">
            <h5 className="card-title text-dark">EPK Cover Section</h5>
            <form className="row g-3">
              <div className="col ms-">
                <div className="col my-1">
                  <input
                    className="form-control m-10"
                    defaultValue={epkCoverData.title}
                    placeholder="Title"
                    onChange={handleInputChange}
                    name="title"
                  />
                </div>
                <div className="col my-1">
                  <input
                    className="form-control mt-10"
                    defaultValue={epkCoverData.LogLine}
                    placeholder="Log Line"
                    onChange={handleInputChange}
                    name="logLine"
                  />
                </div>
                <div className="row mt-2">
                  <div className="col my-2">
                    <select
                      className="form-select form-select-sm "
                      name="genre"
                      onChange={handleInputChange}
                    >
                      {movieGenre.map(makeGenreItem)}
                    </select>
                  </div>
                  <div className="col my-1">
                    <input
                      className="form-control"
                      defaultValue={epkCoverData.minutes}
                      placeholder="Minutes"
                      onChange={handleInputChange}
                      name="minutes"
                    />
                  </div>
                </div>
                <div>
                  <input
                    className="form-control"
                    defaultValue={epkCoverData.kickstarter_url}
                    placeholder="KickStarter URL"
                    onChange={handleInputChange}
                    name="kickstarter_url"
                  />
                </div>
              </div>
              <div className="col border border-2">
                <div className="row gx-5">
                  <div className="col mt-5">
                    <label for="fileBanner" class="form-label text-dark">
                      {" "}
                      Upload Banner
                    </label>
                    <input
                      className="form-control form-control-sm"
                      filename={file1}
                      onChange={file1Selected}
                      ref={inputFile1Ref}
                      type="file"
                      id="fileBanner"
                      name="files"
                      accept="image/*"
                    ></input>
                  </div>
                  <div className="col mt-5">
                    <label for="fileTrailer" class="form-label text-dark">
                      {" "}
                      Upload Trailer
                    </label>
                    <input
                      className="form-control form-control-sm"
                      filename={file2}
                      ref={inputFile2Ref}
                      onChange={file2Selected}
                      type="file"
                      id="fileTrailer"
                      name="files"
                      accept="video/*"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={saveEpkCover}
                >
                  {" "}
                  Save{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EpkCoverForm;
