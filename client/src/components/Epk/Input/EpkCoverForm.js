import React, { useState, useEffect } from "react";
import http from "../../../http-common";
import UploadFile from "../../FileUpload";

function EpkCoverForm() {
  const [movieId, setMovieId] = useState("");
  const [epkCoverData, setEpkCoverData] = useState({
    title: "",
    logLine: "",
    genre: "",
    minutes: "",
    banner: "",
    trailer: "",
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

  return (
    <div>
      <div class="card">
        <div class="card-header">
          <div class="row align-items-start">
            <div class="col align-items-start">EPK Page Upload</div>
            <div class="col align-items-end">link to view</div>
          </div>
        </div>

        <div class="card-body">
          <h5 class="card-title">EPK Cover Section</h5>
          <form className="row g-3">
            <div className="col-md-5 ms-">
              <div className="col-md-3 my-1">
                <input
                  className="form-control m-10"
                  defaultValue={epkCoverData.title}
                  placeholder="Title"
                  onChange={handleInputChange}
                  name="title"
                />
              </div>
              <div className="col-md-3 my-1">
                <input
                  className="form-control mt-10"
                  defaultValue={epkCoverData.LogLine}
                  placeholder="Log Line"
                  onChange={handleInputChange}
                  name="logLine"
                />
              </div>
              <div className="row">
                <div className="col-md-2 my-2">
                  <select
                    className="form-select form-select-sm "
                    name="genre"
                    onChange={handleInputChange}
                  >
                    {movieGenre.map(makeGenreItem)}
                  </select>
                </div>
                <div className="col-md-2 my-1">
                  <input
                    className="form-control"
                    defaultValue={epkCoverData.minutes}
                    placeholder="Minutes"
                    onChange={handleInputChange}
                    name="minutes"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 border border-2">
              <UploadFile />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EpkCoverForm;
