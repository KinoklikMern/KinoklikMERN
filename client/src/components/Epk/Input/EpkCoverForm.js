import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import http from "../../../http-common";
import { useTranslation } from 'react-i18next';

function EpkCoverForm() {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const inputFile1Ref = useRef(null);
  const inputFile2Ref = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
 const { t } = useTranslation();

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
    DonatePayPal_url: "",
    DonateStripe_url: "",
  });
  const movieGenre = [
    (t("Genre...")),
    (t("action")),
    (t("comedy")),
    (t("documentary")),
    (t("romance")),
    (t("horror")),
    (t("mystery")),
    (t("drama")),
    (t("western")),
    (t("science fiction")),
    (t("thriller")),
    (t("crime")),
    (t("animation")),
    (t("musical")),
    (t("war")),
    (t("romantic comedy")),
    (t("noir")),
    (t("disaster")),
    (t("dark comedy")),
    (t("historical film")),
    (t("slasher")),
    (t("adventure")),
    (t("gangster")),
    (t("spy")),
    (t("fantasy")),
    (t("biographical")),
    (t("found footage")),
    (t("legal drama")),
    (t("melodrama")),
    (t("superhero")),
    (t("slapstick")),
    (t("monster")),
    (t("historical fiction")),
    (t("teen")),
    (t("apocalyptic")),
    (t("post-apocalyptic")),
    (t("psychological thriller")),
    (t("stop motion")),
    (t("sports")),
    (t("space opera")),
    (t("mockumentary")),
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
              console.log(t("saved"));
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
      setMessage(t(("Oops! Please use JPEG, JPG, or PNG images.")));
    }
  };

  return (
    <div className="container">
      <form>
        <div className="card">
          <div className="row card-header">
            <h2 className="col align-items-start text-dark">{t("EPK Upload Page")}</h2>
            <Link className="col align-items-end" to="/Epk">
              {t('Show EPK')}
            </Link>
          </div>

          <div className="card-body">
            <h5 className="card-title text-dark">{t('EPK Cover Section')}</h5>
            <form className="row g-3">
              <div className="col ms-">
                <div className="col my-1">
                  <input
                    className="form-control m-10"
                    defaultValue={epkCoverData.title}
                    placeholder={t("Title")}
                    onChange={handleInputChange}
                    name="title"
                  />
                </div>
                <div className="col my-1">
                  <input
                    className="form-control mt-10"
                    defaultValue={epkCoverData.LogLine}
                    placeholder={t("Log Line")}
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
                      placeholder={t("Minutes")}
                      onChange={handleInputChange}
                      name="minutes"
                    />
                  </div>
                </div>
                <div>
                  <input
                    className="form-control"
                    defaultValue={epkCoverData.DonatePayPal_url}
                    placeholder="URL: www.paypal.com/mymovie"
                    onChange={handleInputChange}
                    name="DonatePayPal_url"
                  />
                </div>
                <div>
                  <input
                    className="form-control"
                    defaultValue={epkCoverData.DonateStripe_url}
                    placeholder="URL: www.stripe.com/mymovie"
                    onChange={handleInputChange}
                    name="DonateStripe_url"
                  />
                </div>
              </div>
              <div className="col border border-2">
                <div className="row gx-5">
                  <div className="col mt-5">
                    <label htmlFor="fileBanner" className="form-label text-dark">
                      {" "}
                      {t('Upload Banner')}
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
                    <label htmlFor="fileTrailer" className="form-label text-dark">
                      {" "}
                      {t('Upload Trailer')}
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
                </div>ㄋㄩ
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={saveEpkCover}
                >
                  {" "}
                  {t('Save')}{" "}
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
