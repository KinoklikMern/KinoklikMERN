import React from "react";
import { useEffect, useState } from "react";
import {useTranslation} from 'react-i18next';

const imageMimeType = /image\/(png|jpg|jpeg)/i;
const { t } = useTranslation();

function Upload1() {
  
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const handleSubmit = () => {
    console.log(fileDataURL);
  };

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <>
      <form>
        <p>
          <label htmlFor="image"> {t('Browse images')} </label>
          <input
            type="file"
            id="image"
            accept=".png, .jpg, .jpeg"
            onChange={changeHandler}
          />
        </p>
        <p>
          <input type="Bottun" label="Upload" onClick={handleSubmit} />
        </p>
      </form>
      {fileDataURL ? (
        <p className="img-preview-wrapper">
          {<img src={fileDataURL} alt="preview" />}
        </p>
      ) : null}
    </>
  );
}
export default Upload1;
