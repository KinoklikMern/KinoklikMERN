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

      const createdTime = fepkData.createdAt;
      const formatedDate = new Date(createdTime).toLocaleString(
        "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
      );

    
      

  return (
    
    
    <div className={style.wholeContainer} >
    <div className={style.hero} style={{backgroundImage: `url(https://kinomovie.s3.amazonaws.com/${fepkData.banner_url})`}}> 
   
 
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
        
        <div className={style.flexContainer}>
          <p className={style.pre} >Preproduction</p> 
          <p className={style.genre}>{fepkData.genre}</p>
          <p className={style.date} >Posted:&nbsp;{formatedDate }</p> 
  
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

       {/* details section */}

       <div className={style.detailContainer}> 
            <div className={style.el1}>
              <img 
                src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_details}`}  alt="poster"
                className={style.imgDetail}
                ></img>
            </div>
            <div className={style.el2}>
                {/* <p>
                  Directed by: {detailsFile.detailsFile.director}
                </p>
               
                <p>
                  Produced by: {detailsFile.detailsFile.producer}
                </p>
             
                <p >
                  Writer: {detailsFile.detailsFile.writer}
                </p>
                
                <p>
                  Cinematographer: {detailsFile.detailsFile.cinematographer}
                </p>
               
                <p >
                  Editor: {detailsFile.detailsFile.editor}
                </p>
           
                <p >
                  Sound: {detailsFile.detailsFile.sound}
                </p>
               */}
                <p >
                  Studio: {fepkData.productionCo}
                </p>
                
                <p >
                  Distributed by: {fepkData.distributionCo}
                </p>
            </div>

            <div className={style.el3}>
              <p>
                Starring:
              </p>
  
                {/* <p>
                  {detailsFile.detailsFile.leadActor1}
                </p>
                
                <p >
                  {detailsFile.detailsFile.leadActor2}
                </p>
                  
                <p>
                  {detailsFile.detailsFile.supportingActor1}
                </p>
                
                <p>
                  {detailsFile.detailsFile.supportingActor2}
                  <br/><br/>
                </p> */}
               
                <p className={style.bottom}>
                  Production Year: {fepkData.productionYear}
                </p>
                
                <p className={style.bottom}>
                  Duration: {fepkData.durationMin} Minutes
                </p>
            </div>
            </div>
            {/* logline section */}

            <div className={style.logline}>
                <div>
                <p >{fepkData.logLine_short}</p>
            </div>
            <div>
            <img 
            src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_logline}`}  alt="logline"
            className={style.imgLogline}>

            </img>

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
    </div>
    
    
    );
}

export default EpkView;