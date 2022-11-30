import React, { useState, useEffect } from "react";
//import http from "../http-common";

const UploadFile = () => {
  const [file, setFile] = useState(undefined);
  const [message, setMessage] = useState("");

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  async function uploadService(file) {
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    /* if (
      file.type === "video/mp4" ||
      file.type === "video/x-ms-wmv" ||
      file.type === "video/mpeg" ||
      file.type === "video/3gpp" ||
      file.type === "video/quicktime" ||
      file.type === "video/ogg" ||
      file.type === "video/x-msvideo"
    ) {
      http
        .post("movies/uploadMedia", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.key);
          console.log("*************");
        })
        .catch((err) => {
          console.log();
          console.log(err);
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    } */
  }

  const upload = async (event) => {
    event.preventDefault();
    uploadService(file)
      .then((response) => {
        setMessage(response.data.message);
        return file;
      })
      .catch(() => {
        setMessage("Could not upload the file!. File must be an image");
        setFile(undefined);
      });
  };

  return (
    <div>
      <form onSubmit={upload}>
        <label className="btn btn-default">
          <input type="file" onChange={fileSelected} name="file" />
        </label>
        <button type="submit" className="btn btn-success" disabled={!file}>
          Upload
        </button>
        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </form>
    </div>
  );
};
export default UploadFile;
