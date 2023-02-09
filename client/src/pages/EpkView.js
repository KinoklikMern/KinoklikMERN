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
    let userId = "63c979256535716c94b963bd";
    console.log(title);
    const [fepkData, setFepkData] = useState({});
    const [crewList, setCrewList] = useState([]);
    const [usersWishesToBuy, setUsersWishesToBuy] = useState(0);
    const [usersFavourites, setUsersFavourites] = useState(0);
    const [usersLikes, setUsersLikes] = useState(0);
    const [counter, setCounter] = useState(0);

    let count = 0;
  
    useEffect(() => {
        http.get("/fepks/byTitle/Avatar").then((response) =>{
            setFepkData(response.data); 
            setCrewList(response.data.crew);
            setUsersWishesToBuy(response.data.wishes_to_buy.length);
            setUsersFavourites(response.data.favourites.length);
            setUsersLikes(response.data.likes.length);
            console.log(response.data.title);
            
        });
     
      }, []);
      
      // user is added to the list of $
      function addUserToWishesToBuy(){
        http.get(`fepks/wishestobuy/${fepkData._id}/${userId}`).then((response) =>{
          setUsersWishesToBuy(response.data.wishes_to_buy.length);
        });
      }

      // user is added to the list of +
      function addUserToFavourites(){
        http.get(`fepks/favourite/${fepkData._id}/${userId}`).then((response) =>{
          setUsersFavourites(response.data.favourites.length);
        });
      }

      // user is added to the list of star(likes)
      function addUserToLikes(){
        http.get(`fepks/like/${fepkData._id}/${userId}`).then((response) =>{
          setUsersLikes(response.data.likes.length);
        });
      }

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
          <p className={style.pre} >{fepkData.status}</p> 
          <p className={style.genre}>{fepkData.genre}</p>
          <p className={style.date} >Posted:&nbsp;{formatedDate }</p> 
  
        </div>
       
      </div>

      {/* icon-bar section */}

      <div className={style.iconContainer} >
        
          <div>
            <a  href="#">
              <FontAwesomeIcon icon={faDollarSign} size ="lg" onClick={() => addUserToWishesToBuy()}/>
            </a>
            <span style={{fontSize:"15px"}}>{usersWishesToBuy}</span>
          </div>
          <div >
            <a  href="#">
            <FontAwesomeIcon icon={faPlusCircle} size ="lg" onClick={() => addUserToFavourites()}/>
              {/* <img className="icon" src={plusIcon} alt="save" /> */}
            </a>
            <span style={{fontSize:"15px"}}>{usersFavourites}</span>
          </div>
          <div >
            <a  href="#">
              <FontAwesomeIcon icon={faStar} size ="lg" onClick={() => addUserToLikes()}/>
            </a>
            <span style={{fontSize:"15px"}}>{usersLikes}</span>
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
                {crewList.map((crewObj) => {
                  return ( 
                    <>
                        {crewObj.epkRole === "director" &&
                          <p>Directed by: {crewObj.crewId.name}</p>
                        } 
                        {crewObj.epkRole === "producer" &&
                          <p>Produced by: {crewObj.crewId.name}</p>
                        } 
                        {crewObj.epkRole === "writer" &&
                          <p>Writer: {crewObj.crewId.name}</p>
                        } 
                        {crewObj.epkRole === "cinematographer" &&
                          <p>Cinematographer: {crewObj.crewId.name}</p>
                        } 
                        {crewObj.epkRole === "editor" &&
                          <p>Editor: {crewObj.crewId.name}</p>
                        } 
                    </>
                  );
                })}
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
              {crewList.map((crewObj) => {
                  return ( 
                    <>
                        {crewObj.epkRole === "lead_actor" &&
                          <p>{crewObj.crewId.name}</p>
                        } 
                        {crewObj.epkRole === "supporting_actor" &&
                          <p>{crewObj.crewId.name}</p>
                        } 
                    </>
                  );
                })}
               
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
                <p >{fepkData.logLine_long}</p>
              </div>
              <div>
                <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_logline}`}  alt="logline"
                  className={style.imgLogline}>
                </img>
              </div>
            </div>

            {/* Starring / Cast section */}
            <div className={style.starring}>
              {crewList.map((crewObj) => {
                  return ( 
                    <>
                        {((crewObj.epkRole === "lead_actor" || crewObj.epkRole === "supporting_actor") && (++count)%2 !== 0) &&
                        <div className="row">
                          <div className="col-6">
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}  alt="starring">
                            </img>
                            <p style={{fontSize:"15px", color:"black"}}>{crewObj.crewId.name}</p>
                            <p style={{fontSize:"15px", color:"black"}}>{crewObj.instagram_url} / {crewObj.facebook_url} / {crewObj.twitter_url}</p>
                          </div>
                          <div className="col-6">
                            <p style={{fontSize:"20px", color:"black"}}>{crewObj.biography}</p>
                          </div>
                        </div>
                        } 

                        {((crewObj.epkRole === "lead_actor" || crewObj.epkRole === "supporting_actor") && count%2 === 0) &&
                        <div className="row">
                          <div className="col-6">
                            <p style={{fontSize:"20px", color:"black"}}>{crewObj.biography}</p>
                          </div>
                          <div className="col-6">
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}  alt="starring">
                            </img>
                            <p style={{fontSize:"15px", color:"black"}}>{crewObj.crewId.name}</p>
                            <p style={{fontSize:"15px", color:"black"}}>{crewObj.instagram_url} / {crewObj.facebook_url} / {crewObj.twitter_url}</p>
                          </div>
                        </div>
                        } 
                    </>
                  );
                })}
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