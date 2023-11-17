import React from "react";
import { useTranslation } from 'react-i18next';

import style from "./details.module.css";

function Details(detailsFile) {
  // console.log(detailsFile);
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <div className={style.detailContainer}>
        <div className={style.el1}>
          <img
            src={detailsFile.detailsFile.image}
            alt="poster"
            className={style.img}
          ></img>
        </div>
        <div className={style.el2}>
          <p>{t('Directed by:')} {detailsFile.detailsFile.director}</p>

          <p>{t('Produced by:')} {detailsFile.detailsFile.producer}</p>

          <p>{t('Writer:')} {detailsFile.detailsFile.writer}</p>

          <p>{t('Cinematographer:')} {detailsFile.detailsFile.cinematographer}</p>

          <p>{t('Editor:')} {detailsFile.detailsFile.editor}</p>

          <p>{t('Sound:')} {detailsFile.detailsFile.sound}</p>

          <p>{t('Studio:')} {detailsFile.detailsFile.productionCo}</p>

          <p>{t('Distributed by:')} {detailsFile.detailsFile.distributionCo}</p>
        </div>

        <div className={style.el3}>
          <p>{t('Starring:')}</p>

          <p>{detailsFile.detailsFile.leadActor1}</p>

          <p>{detailsFile.detailsFile.leadActor2}</p>

          <p>{detailsFile.detailsFile.supportingActor1}</p>

          <p>
            {detailsFile.detailsFile.supportingActor2}
            <br />
            <br />
          </p>

          <p className={style.bottom}>
            {t('Production Year:')} {detailsFile.detailsFile.productionYear}
          </p>

          <p className={style.bottom}>
            {t('Duration:')} {detailsFile.detailsFile.durationMin} Minutes
          </p>
        </div>
      </div>
    </div>
  );
}
export default Details;
