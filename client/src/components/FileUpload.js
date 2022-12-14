import React, { useState, useEffect } from "react";
import http from "../http-common";

const UploadFile = (props) => {
  const [file, setFile] = useState(undefined);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  async function uploadService(file) {
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    debugger;
    await http
      .post("movies/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data.key);
        console.log(response);
        console.log(response.data);
        setImage(response.data.key);
        props.setImage(
          "https://kinomovie.s3.amazonaws.com/" + response.data.key
        );

        console.log("*************");
      })
      .catch((err) => {
        console.log();
        console.log(err);
      });
  }

  const upload = async (event) => {
    event.preventDefault();
    await uploadService(file)
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
          {/*   {message} */}
        </div>
        {/*       {image && (
          <img
            src={"https://kinomovie.s3.amazonaws.com/" + image}
            alt="hey"
            style={{ height: "350px", width: "300px" }}
          />
        )} */}
      </form>
    </div>
  );
};
export default UploadFile;
