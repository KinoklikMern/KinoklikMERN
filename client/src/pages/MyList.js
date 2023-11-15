import React from "react";
import {useTranslation} from 'react-i18next';

function MyList() {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {t("This is the My List")}
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default MyList;
