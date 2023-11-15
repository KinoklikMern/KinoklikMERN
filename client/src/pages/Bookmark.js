import React from "react";
import {useTranslation} from 'react-i18next';

function Bookmark() {
  const { t } = useTranslation();
  
  return (
    <>
      <div>
        {this("This is the bookmark.")}
      </div>
    </>
  );
}

export default Bookmark;