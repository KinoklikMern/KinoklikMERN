import React from "react";
import { useTranslation } from 'react-i18next';

import style from "./cinematographer.module.css";

function Cinematographer(cinematographerFile) {
  console.log(cinematographerFile);
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <div className={style.graphercontainer}>
        <div className={style.el}>
          <img
            src={cinematographerFile.cinematographerFile.image}
            alt="photographyer"
            className={style.img}
          />

          <h1>{cinematographerFile.cinematographerFile.name}</h1>
        </div>
        <div className={style.el2}>
          <h1>{t('Cinematographer')}</h1>
          <p>{cinematographerFile.cinematographerFile.header}</p>

          <p>{cinematographerFile.cinematographerFile.biography}</p>
        </div>
      </div>
    </div>
  );
}
export default Cinematographer;
