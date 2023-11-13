import React from "react";
import {usetranslation} from 'react-i18next'

const Movie = () => {
  const { t } = usetranslation();
  return <h1>{t('Movie')}</h1>;
};

export default Movie;
