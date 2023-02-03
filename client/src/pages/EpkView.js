import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import http from "../../../http-common";
import { renderCloseIcon } from "antd/es/modal/PurePanel";
import Footer from"../components/Footer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faSave,
  faShareAlt,
  faPlusCircle,
  faStar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function EpkView() {

    // const { user } = useSelector((user) => ({ ...user }));
    // const id = 5;

    let { fepkTitle } = useParams();
    const [FepkData, setFepkData] = useState({});
  

    useEffect(() => {
        http.get(`/fepks/${fepkTitle}`).then((response) =>{
            setFepkData(response.data); 
            console.log(response.data.title);
        });
     
      }, []);

  
  }


  return (
    <>
    <Fragment className="container">

      {/* < EpkCover />
      {coverList && coverList.map((s) => <EpkCover coverFile={s} />)}
      {detailsList && detailsList.map((s) => <Details detailsFile={s} />)}
      {loglineList && loglineList.map((s) => <Logline loglineFile={s} />)}
      {synopsisList && synopsisList.map((s) => <Synopsis synopsFile={s} />)}
      {uniquenessList && uniquenessList.map((s) => <Uniqueness uniquenessFile={s} />)}
      {castList && castList.map((s) => <Cast castFile={s} />)}
      {directorList && directorList.map((s) => <Director directorFile={s} />)}
      {producerList && producerList.map((s) => <Producer producerFile={s} />)}
      {cinematographerList && cinematographerList.map((s) => <Cinematographer cinematographerFile={s} />)}
      {stillsList && stillsList.map((s) => <Stills stillsFile={s} />)}
      {resourcesList && resourcesList.map((s) => <Resources resFile={s} />)}
      <Trailer/>
      {reviewList && reviewList.map((s) => <Review reviewFile={s} />)}
      {trailerList && trailerList.map((s) => <Trailer trailerFile={s} />)}
      
      <Footer/> */}
    </Fragment>
    </>
    );
}

export default EpkView;