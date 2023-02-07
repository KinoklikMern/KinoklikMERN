import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import http from "../http-common";
import { useParams } from "react-router-dom";
import style from"./EpkView.module.css";
import kikSatr from "../images/Kickstarter-icon.png";

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

    let { title } = useParams();
    console.log(title);
    const [fepkData, setFepkData] = useState({});
  

    useEffect(() => {
        http.get("/fepks/byTitle/Avatar").then((response) =>{
            setFepkData(response.data); 
            console.log(response.data.title);
            
        });
     
      }, []);

      console.log(fepkData);
      console.log(fepkData.image_details);

  return (
    
    <Fragment className={style.container}>
    <div className={style.hero} style={{backgroundImage: `url(${fepkData.banner_url})`}}>  
 
      <div className={style.posterContainer}> 

      <div >
      <img 
                 src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_details}`} 
                
                alt="poster"  
                className={style.img}      
                ></img>
      </div>
      <div className={style.description}>
          <p className={style.centered}>{fepkData.title}</p>
          <p className={style.logline}>{fepkData.logLine_short}</p>
        </div>
        </div>

        {/* corner section */}
        <div className={style.bottomeLine}>
        <div className={style.flexContainer}>
          <p className={style.el1} >Preproduction</p> 
          <p className={style.el2}>{fepkData.genre}</p>
          <p className={style.el3} >Posted:{fepkData.createdAt}</p> 
  
        </div>
        <div class={style.dropdownContainer} >
          <div class={style.threedots}></div>
          <div class={style.dropdown}>
            <a className={style.dotAnkor} href="#"><div>report</div></a>
    
        </div>
          </div>
        </div>

      </div>

      {/* icon-bar section */}

      <div className={style.iconContainer} >
        
          <div>
            <a  href="#">
              <FontAwesomeIcon icon={faDollarSign} size ="lg"/>
            </a>
          </div>
          <div >
            <a  href="#">
            <FontAwesomeIcon icon={faPlusCircle} size ="lg" />
              {/* <img className="icon" src={plusIcon} alt="save" /> */}
            </a>
          </div>
          <div >
            <a  href="#">
              <FontAwesomeIcon icon={faStar} size ="lg"/>
            </a>
          </div>
          <div >
            <a  href="#">
            <FontAwesomeIcon icon={faSave} size ="lg" />
              {/* <img className={style.icon} src={saveIcon} alt="save" /> */}
            </a>
          </div>
          
          <div >
            <a  href="#">
              <img className={style.icon} src={kikSatr} alt="save" />
            </a>
          </div>
          <div >
            <a  href="#">
            <FontAwesomeIcon icon={faShareAlt} size ="lg" />
             
            </a>
          </div>

        
      </div>
    

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
  {trailerList && trailerList.map((s) => <Trailer trailerFile={s} />)}*/}
      
      <Footer/> 
    </Fragment>
    
    );
}

export default EpkView;