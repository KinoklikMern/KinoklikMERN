import React, { useState, useEffect } from "react";

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
    console.log("hello ");
    console.log(file.type);
    if (
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg"
    ) {
      return http.post("api/cvs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      setMessage("File must be a image");
    }
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
