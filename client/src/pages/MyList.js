import React from "react";
import {userTranslation} from 'react-i18next';

function MyList() {
  const { t } = userTranslation();
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
