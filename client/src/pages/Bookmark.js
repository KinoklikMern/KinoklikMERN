import React from "react";
import {userTranslation} from 'react-i18next';

function Bookmark() {
  const { t } = userTranslation();
  
  return (
    <>
      <div>
        {this("This is the bookmark.")}
      </div>
    </>
  );
}

export default Bookmark;