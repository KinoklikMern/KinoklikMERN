import React from "react";
import style from "./Trailer.module.css";
import trailer from "./movie2.jpeg";
import { useTranslation } from 'react-i18next';

function Trailer() {
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      <img src={trailer} alt="poster" className={style.img} />
      <p className={style.text}>{t("Text text text...")}</p>
    </div>
  );
}

export default Trailer;
