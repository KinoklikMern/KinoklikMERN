import React, { useState, useEffect } from "react";
import http from "../../http-common.js";
import "./form.css";

function FilmInfoForm() {
  const [movieId, setMovieId] = useState("");
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    language: "",
    releaseDate: "",
    genre: "",
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
    return <option value={X}> {X}</option>;
  };

  let minOffset = -3,
    maxOffset = 3;
  let thisYear = new Date().getFullYear();
  let allYears = [];
  for (let x = minOffset; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }
  const yearList = (y) => {
    return <option value={y}> {y}</option>;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData({ ...movieData, [name]: value });
  };

  useEffect(() => {
    console.log(movieId);
  }, [movieId]);

  const saveFilmInfo = () => {
    http
      .post("movies", movieData)
      .then((response) => {
        setMovieId(response.data.id);
        console.log("*************");
        console.log(response.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
    debugger;
    console.log(movieId);
    debugger;
  };

  return (
    <form className="form" onSubmit={saveFilmInfo}>
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
                    defaultValue={movieData.title}
                    placeholder="Enter Film Title"
                    onChange={handleInputChange}
                    name="title"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control form-control my-1">
                  <input
                    className="movie-input"
                    defaultValue={movieData.running_length}
                    placeholder="Enter Running Length"
                    onChange={handleInputChange}
                    name="running_length"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control form-control my-1">
                  <input
                    className="movie-input"
                    defaultValue={movieData.language}
                    placeholder="language"
                    onChange={handleInputChange}
                    name="language"
                  />
                </div>
                <div className="field">
                  <div className="control form-control my-1">
                    <input
                      className="movie-input"
                      defaultValue={movieData.productionCompany}
                      placeholder="Enter Production Company"
                      onChange={handleInputChange}
                      name="productionCompany"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control form-control my-1">
                    <input
                      className="{styleForm.movie-input}"
                      defaultValue={movieData.distributionCompany}
                      placeholder="Enter Distribution Company"
                      onChange={handleInputChange}
                      name="distributionCompany"
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control form-control my-1">
                    <input
                      className="movie-input"
                      defaultValue={movieData.description}
                      placeholder="Enter Synopsis/Description"
                      onChange={handleInputChange}
                      name="description"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control form-control my-1">
                    <input
                      className="movie-input"
                      defaultValue={movieData.dollarAmount}
                      placeholder="Enter Dollar Amount"
                      onChange={handleInputChange}
                      name="dollarAmount"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control form-control my-1">
                    <select
                      placeholder="Select Genre"
                      name="genre"
                      onChange={handleInputChange}
                    >
                      {movieGenre.map(makeGenreItem)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <div className="control form-control">
                    <select
                      name="releaseDate"
                      onChange={handleInputChange}
                      defaultValue={new Date().getFullYear()}
                    >
                      {allYears.map(yearList)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
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
    </form>
  );
}

export default FilmInfoForm;
