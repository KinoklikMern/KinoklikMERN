import React, { useState, useRef } from "react";
import http from "../../http-common.js";

function FilmInfoForm() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    language: "",
    genre: "",
    releaseDate: "",
    running_length: "",
    productionCompany: "",
    distributionCompany: "",
    dollarAmount: 0,
  });
  const movieGenre = [
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
    return <option>{X}</option>;
  };

  let minOffset = -3,
    maxOffset = 3;
  let thisYear = new Date().getFullYear();
  let allYears = [];
  for (let x = minOffset; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }
  const yearList = allYears.map((y) => {
    return <option key={y}> {y}</option>;
  });

  const saveFilmInfo = () => {
    http
      .post("/movies")
      .then((response) => {
        console.log(response.data);
        console.log("*************");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="filmInfoModal"
        tabindex="-1"
        aria-labelledby="filmInfoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-form">
            <div className="modal-header">
              <h5 className="modal-title" id="filmInfoModalLabel">
                Enter Film Info
              </h5>
              <button
                type="button"
                className="btn btn-close btn-purple"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="field">
                <div className="control form-control my-1">
                  <input
                    className="movie-input"
                    value={movieData.title}
                    placeholder="Enter Film Title"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control form-control my-1">
                  <input
                    className="movie-input"
                    value={movieData.running_length}
                    placeholder="Enter Running Length"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control form-control my-1">
                  <input
                    className="movie-input"
                    value={movieData.language}
                    placeholder="language"
                  />
                </div>
                <div className="field">
                  <div className="control form-control my-1">
                    <input
                      className="movie-input"
                      value={movieData.productionCompany}
                      placeholder="Enter Production Company"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control form-control my-1">
                    <input
                      className="{styleForm.movie-input}"
                      value={movieData.distributionCompany}
                      placeholder="Enter Distribution Company"
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control form-control my-1">
                    <input
                      className="movie-input"
                      value={movieData.description}
                      placeholder="Enter Synopsis/Description"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control form-control my-1">
                    <select placeholder="Select Genre">
                      {movieGenre.map(makeGenreItem)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <div className="control form-control">
                    <select>{yearList}</select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={saveFilmInfo}
                  className="{styles.btn-purple}"
                  data-bs-dismiss="modal"
                >
                  Save Film Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmInfoForm;
