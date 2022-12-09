import React, { useRef, useState, useEffect } from "react";
//import styles from "../styles/Home.module.css";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(HTMLInputElement);
  const handleSubmit = () => {
    console.log(image);
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <div className="container">
      <form>
        {preview ? (
          <img
            src={preview}
            alt={"preview"}
            onClick={() => {
              setImage(null);
            }}
          />
        ) : (
          <button
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
          >
            Add Image
          </button>
        )}

        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
        <input type="textbox" />
        <input type="button" onClick={handleSubmit} />
      </form>
    </div>
  );
}
