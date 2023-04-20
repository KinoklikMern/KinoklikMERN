import React from "react";
import style from "./EpkView.module.css";

function EpkViewPage() {
//   let { title } = useParams();
const title = "Avatar" //for development, delete this line after


  return <div  className={
    fepkData.status_pause === false
      ? style.wholeContainer
      : style.content1
  }>EpkViewPage</div>;
}

export default EpkViewPage;
