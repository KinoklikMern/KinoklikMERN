import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import http from "../http-common";
import { useParams, Link } from "react-router-dom";
import style from"./EpkView.module.css";
import kikSatr from "../images/Kickstarter-icon.png";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Footer from"../components/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faSave,
  faShareAlt,
  faPlusCircle,
  faStar,
  faSearch,
  faEnvelope
  
} from "@fortawesome/free-solid-svg-icons";
import Login from "../components/Auth/Registration/loginFromViewPage";
import Cookies from 'js-cookie';

function EpkView() {
    let { title } = useParams();
    let user;
    try{
      user = JSON.parse(Cookies.get('user'));
    }catch{
      user = null;
    }
    let userId;
    let userRole;
    let userPicture;
    if(!user){
      userId = "0"; 
      userPicture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      userRole = "noUser";
    }
    else{
      userId = user.id; 
      userPicture = user.picture;
      userRole = user.role;
    }
    const [fepkData, setFepkData] = useState({});
    const [crewList, setCrewList] = useState([]);
    const [usersWishesToBuy, setUsersWishesToBuy] = useState(0);
    const [usersFavourites, setUsersFavourites] = useState(0);
    const [usersLikes, setUsersLikes] = useState(0);
    const [mediumSynopsis, setMediumSynopsis] = useState([]);
    const [longSynopsis, setLongSynopsis] = useState([]);
    const [uniqueness, setUniqueness] = useState([]);
    const[stills,setStills]=useState([]);
    const[stillsImg,setStillsImg]=useState([]);
    const [resources, setResources] = useState([]);
    const [trailer, setTrailer] = useState([]);

    let mediumFakeText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"+ 
                          "sed do eiusmod tempor incididunt ut labore et dolore magna"+ 
                          "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"+ 
                          "laboris nisi ut aliquip ex ea commodo consequat."

    let longFakeText =   "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"+ 
                          "sed do eiusmod tempor incididunt ut labore et dolore magna"+ 
                          "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"+ 
                          "laboris nisi ut aliquip ex ea commodo consequat."+
                          "sed do eiusmod tempor incididunt ut labore et dolore magna"+ 
                          "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"+ 
                          "laboris nisi ut aliquip ex ea commodo consequat."
                          

    let count = 0;
  
    useEffect(() => {
        http.get(`/fepks/byTitle/${title}`).then((response) =>{
            setFepkData(response.data); 
            setCrewList(response.data.crew);
            setUsersWishesToBuy(response.data.wishes_to_buy.length);
            setUsersFavourites(response.data.favourites.length);
            setUsersLikes(response.data.likes.length);
            setMediumSynopsis(response.data.mediumSynopsis);
            setLongSynopsis(response.data.longSynopsis);
            setUniqueness(response.data.uniqueness);
            setStills(response.data.stillsApproval)
            setStillsImg(response.data.stills)
            setResources(response.data.resources)
            setTrailer(response.data.trailer)
        });
     
      }, []);

      // user is added to request list for medium Synopsis
      function addtoMediumSynopsis(){
        http.get(`fepks/mediumSynopsis/${fepkData._id}/${userId}`).then((response) =>{
          setMediumSynopsis(response.data.mediumSynopsis);
        });
      }

      // user is added to request list for long Synopsis
      function addtoLongSynopsis(){
        http.get(`fepks/longSynopsis/${fepkData._id}/${userId}`).then((response) =>{
          setLongSynopsis(response.data.longSynopsis);
        });
      }

      // user is added to request list for uniqueness
      function addtoUniqueness(){
        http.get(`fepks/uniqueness/${fepkData._id}/${userId}`).then((response) =>{
          setUniqueness(response.data.uniqueness);
        });
      }

      function addtoStills(){
        http.get(`fepks/stills/${fepkData._id}/${userId}`).then((response) =>{
          setStills(response.data.stillsApproval);
        });
      }

   
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

      // user is added to the list of sharings
      function addUserToSharings(){
        http.get(`fepks/sharing/${fepkData._id}/${userId}`);
        /*
          here will be the code for sharing 
        */
      }

      function openUrl(url){
        window.open(url);
      }

      function login() {
        document.getElementById('login').click();
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
      const [isClick1, setIsClick1] = useState(false);
      const clickState1 = () => {
        setIsClick1(true);
        
      }
      const [isClick2, setIsClick2] = useState(false);
      const clickState2 = () => {
        setIsClick2(true);
        
      }

      const [isClick3, setIsClick3] = useState(false);
      const clickState3 = () => {
        setIsClick3(true);
        
      } 
      const [isClick4, setIsClick4] = useState(false);
      const clickState4 = () => {
        setIsClick4(true);
        
      }

  return (

  <div className={style.wholeContainer} >
    <div className={style.hero} style={{backgroundImage: `url(https://kinomovie.s3.amazonaws.com/${fepkData.banner_url})`}}> 

      {/* Profile Picture */}
      {userRole === "FILM_MAKER" ?
      (<Link  to="/filmMakerDashboard"> <img src={userPicture} alt="user" 
                                                              style={{float: "right", 
                                                                      width:"50px", 
                                                                      height:"50px", 
                                                                      margin:"10px 20px 0 0", 
                                                                      borderRadius:"50%"}}/>
        </Link>
      ):
      (
        userRole === "noUser" ?
          (
            <img src= {userPicture}
                onClick={() => login()} 
                alt="user" 
                style={{float: "right",                                        
                width:"50px", 
                height:"50px", 
                margin:"10px 20px 0 0", 
                borderRadius:"50%"}}/>
          ):
          (
            <Link  to="/userDashboard"> <img src={userPicture} alt="user" 
                                                              style={{float: "right", 
                                                                      width:"50px", 
                                                                      height:"50px", 
                                                                      margin:"10px 20px 0 0", 
                                                                      borderRadius:"50%"}}/>
            </Link>
          )
      )
      } 
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
            {userId === "0" ?
            (<FontAwesomeIcon icon={faDollarSign} size ="lg" onClick={() => login()}/>):
            (<FontAwesomeIcon icon={faDollarSign} size ="lg" onClick={() => addUserToWishesToBuy()}/>)
            }
            </a>
            <span style={{fontSize:"15px"}}>{usersWishesToBuy}</span>
          </div>
          <div >
            <a  href="#">
            {userId === "0" ?
            (<FontAwesomeIcon icon={faPlusCircle} size ="lg" onClick={() => login()}/>):
            (<FontAwesomeIcon icon={faPlusCircle} size ="lg" onClick={() => addUserToFavourites()}/>)
            }
              {/* <img className="icon" src={plusIcon} alt="save" /> */}
            </a>
            <span style={{fontSize:"15px"}}>{usersFavourites}</span>
          </div>
          <div >
            <a  href="#">
            {userId === "0" ?
            (<FontAwesomeIcon icon={faStar} size ="lg" onClick={() => login()}/>):
            (<FontAwesomeIcon icon={faStar} size ="lg" onClick={() => addUserToLikes()}/>)
            }
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
              <img className={style.icon} src={kikSatr} alt="save" onClick={() => openUrl(fepkData.kickstarter_url)}/>
            </a>
          </div>
          <div >
            <a  href="#">
            <FontAwesomeIcon icon={faShareAlt} size ="lg" onClick={() => addUserToSharings()}/>
             
            </a>
          </div>

       
      </div>

      <Login />

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

            {/* synopsis section */}

            <div className={style.synopsis}>
           <div >
           <h2  className={style.type}>Short Synopsis</h2>  
           </div>

           <div className={style.content}>
           <img
          src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
          alt="hey"
          className={style.imgSynopsis}
        />
          <h3 className={style.text}>{fepkData.text_short}</h3>

      </div>
      </div>

      {/* MEDIUM SYNOPSIS */}

      {/* the case when user not logged in and if logged in not requested yet*/}
      {userId === "0" ?
      (
        <div className={style.synopsis}>
          <div >
            <h2  className={style.type}>Medium Synopsis</h2>  
          </div>
          <div className={style.position}> 
            <button onClick={()=>{login();clickState1()}} className={isClick1===true ? style.none :style.btnSy }
          > Request Access </button>
          </div>
          <div className={style.content1}>
            <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`} alt="hey" className={style.imgSynopsis}/>
            <h3 className={style.text}>{mediumFakeText}</h3>
          </div>
        </div>
      ):
      (
        (mediumSynopsis.length === 0 || mediumSynopsis.filter(e => e.user._id === userId).length === 0) && 
        <div className={style.synopsis}>
            <div >
              <h2  className={style.type}>Medium Synopsis</h2>  
            </div>
            <div className={style.position}> 
              <button onClick={()=>{addtoMediumSynopsis();clickState1()}} className={isClick1===true ? style.none :style.btnSy }
              > Request Access </button>
            </div>
          
            <div className={style.content1}>
              <img
                  src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                  alt="hey"
                  className={style.imgSynopsis}
              />
              <h3 className={style.text}>{mediumFakeText}</h3>
            </div>
        </div>
      ) 
      }

      {/* the case when user logged in and requested the approval */}
      {mediumSynopsis.map((medium) => {
          return ( 
            <>
              {medium.user._id === userId && medium.status === "pending" &&
                <div className={style.synopsis}>
                    <div >
                        <h2  className={style.type}>Medium Synopsis</h2>  
                    </div>
                    <div className={style.position}> 
                        <button> Awaiting approval </button>
                    </div>
                    <div className={style.content1}>
                      <img
                          src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                          alt="hey"
                          className={style.imgSynopsis}
                      />
                      <h3 className={style.text}>{mediumFakeText}</h3>
                    </div>
                </div>
              } 
            </>
          )
      })}

      {/* the case when user logged in and got the approval */}
      {mediumSynopsis.map((medium) => {
          return ( 
            <>
              {medium.user._id === userId && medium.status === "approved" &&
                <div className={style.synopsis}>
                    <div >
                        <h2  className={style.type}>Medium Synopsis</h2>  
                    </div>
                    <div>
                      <img
                          src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                          alt="hey"
                          className={style.imgSynopsis}
                      />
                      <h3 className={style.text}>{fepkData.text_medium}</h3>
                    </div>
                </div>
              } 
            </>
          )
      })}

      {/* the case when user logged in and got refused */}
      {mediumSynopsis.map((medium) => {
          return ( 
            <>
              {medium.user._id === userId && medium.status === "refused" &&
                <div className={style.synopsis}>
                  <div >
                    <h2  className={style.type}>Medium Synopsis</h2>  
                  </div>
                  <div className={style.position}> 
                    <button> Refused </button>
                  </div>
                  <div className={style.content1}>
                    <img
                        src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                        alt="hey"
                        className={style.imgSynopsis}
                    />
                    <h3 className={style.text}>{mediumFakeText}</h3>
                  </div>
                </div>
              } 
            </>
          )
      })}


      {/* LONG SYNOPSIS */}

      {/* the case when user not logged in and if logged in not requested yet*/}
      {userId === "0" ?
      (
        <div className={style.synopsis}>
          <div >
            <h2  className={style.type}>Long Synopsis</h2>  
          </div>
          <div className={style.position}> 
            <button onClick={()=>{login();clickState2()}} className={isClick2===true ? style.none :style.btnSy }
          > Request Access </button>
          </div>
          <div className={style.content1}>
            <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`} alt="hey" className={style.imgSynopsis}/>
            <h3 className={style.text}>{longFakeText}</h3>
          </div>
        </div>
      ):
      (
        (longSynopsis.length === 0 || longSynopsis.filter(e => e.user._id === userId).length === 0) && 
        <div className={style.synopsis}>
            <div >
              <h2  className={style.type}>Long Synopsis</h2>  
            </div>
            <div className={style.position}> 
              <button onClick={()=>{addtoLongSynopsis();clickState2()}} className={isClick2===true ? style.none :style.btnSy }
              > Request Access </button>
            </div>
          
            <div className={style.content1}>
              <img
                  src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                  alt="hey"
                  className={style.imgSynopsis}
              />
              <h3 className={style.text}>{longFakeText}</h3>
            </div>
        </div>
      ) 
      }

      {/* the case when user logged in and requested the approval */}
      {longSynopsis.map((long) => {
          return ( 
            <>
              {long.user._id === userId && long.status === "pending" &&
                <div className={style.synopsis}>
                    <div >
                        <h2  className={style.type}>Long Synopsis</h2>  
                    </div>
                    <div className={style.position}> 
                        <button> Awaiting approval </button>
                    </div>
                    <div className={style.content1}>
                      <img
                          src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                          alt="hey"
                          className={style.imgSynopsis}
                      />
                      <h3 className={style.text}>{longFakeText}</h3>
                    </div>
                </div>
              } 
            </>
          )
      })}

      {/* the case when user logged in and got the approval */}
      {longSynopsis.map((long) => {
          return ( 
            <>
              {long.user._id === userId && long.status === "approved" &&
                <div className={style.synopsis}>
                    <div >
                        <h2  className={style.type}>Long Synopsis</h2>  
                    </div>
                    <div>
                      <img
                          src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                          alt="hey"
                          className={style.imgSynopsis}
                      />
                      <h3 className={style.text}>{fepkData.text_long}</h3>
                    </div>
                </div>
              } 
            </>
          )
      })}

      {/* the case when user logged in and got refused */}
      {longSynopsis.map((long) => {
          return ( 
            <>
              {long.user._id === userId && long.status === "refused" &&
                <div className={style.synopsis}>
                  <div >
                    <h2  className={style.type}>Long Synopsis</h2>  
                  </div>
                  <div className={style.position}> 
                    <button> Refused </button>
                  </div>
                  <div className={style.content1}>
                    <img
                        src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                        alt="hey"
                        className={style.imgSynopsis}
                    />
                    <h3 className={style.text}>{longFakeText}</h3>
                  </div>
                </div>
              } 
            </>
          )
      })}


    {/* UNIQUENESS section */}

      {/* the case when user not logged in and if logged in not requested yet*/}
      {userId === "0" ?
      (
        <div>
          <div className={style.unique}>
            <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
          </div>
          <div className={style.uniqueContainer}>
              <div className={style.position1}> 
                <button onClick={()=>{login(); clickState3()}} className={isClick3===true ? style.none :style.btnSy }> Request Access </button>
              </div>
              <div className={style.content1}>
                <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
              </div>
              <div className={style.content1}>
                <p className={style.textUnique}>{mediumFakeText}</p>
              </div>
          </div>
        </div>
      ):
      (
        (uniqueness.length === 0 || uniqueness.filter(u => u.user === userId).length === 0) && 
        <div>
          <div className={style.unique}>
            <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
          </div>
          <div className={style.uniqueContainer}>
              <div className={style.position1}> 
                <button onClick={()=>{addtoUniqueness(); clickState3()}} className={isClick3===true ? style.none :style.btnSy }> Request Access </button>
              </div>
              <div className={style.content1}>
                <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
              </div>
              <div className={style.content1}>
                <p className={style.textUnique}>{mediumFakeText}</p>
              </div>
          </div>
        </div>
      ) 
      }

      {/* the case when user logged in and requested the approval */}
      {uniqueness.map((unique) => {
          return ( 
            <>
              {unique.user === userId && unique.status === "pending" &&
                <div>
                  <div className={style.unique}>
                    <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
                  </div>
                  <div className={style.uniqueContainer}>
                      <div className={style.position1}> 
                        <button> Awaiting approval </button>
                      </div>
                      <div className={style.content1}>
                        <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
                      </div>
                      <div className={style.content1}>
                        <p className={style.textUnique}>{mediumFakeText}</p>
                      </div>
                  </div>
                </div>
              } 
            </>
          )
      })}

      {/* the case when user logged in and got the approval */}
      {uniqueness.map((unique) => {
          return ( 
            <>
              {unique.user === userId && unique.status === "approved" &&
                <div>
                  <div className={style.unique}>
                    <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
                  </div>
                  <div className={style.uniqueContainer}>
                      <div>
                        <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
                      </div>
                      <div>
                        <p className={style.textUnique}>{fepkData.description_uniqueness}</p>
                      </div>
                  </div>
                </div>
              } 
            </>
          )
      })}

      {/* the case when user logged in and got refused */}
      {uniqueness.map((unique) => {
          return ( 
            <>
              {unique.user === userId && unique.status === "refused" &&
                <div>
                  <div className={style.unique}>
                    <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
                  </div>
                  <div className={style.uniqueContainer}>
                      <div className={style.position1}> 
                        <button> Refused </button>
                      </div>
                      <div className={style.content1}>
                        <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
                      </div>
                      <div className={style.content1}>
                        <p className={style.textUnique}>{mediumFakeText}</p>
                      </div>
                  </div>
                </div>
              } 
            </>
          )
      })}



    
      {/* Starring / Cast section */}
      <div className={style.starring}>
        <p className={style.starTitle}>Starring</p>
              {crewList.map((crewObj) => {
                  return ( 
                    <>
                        {((crewObj.epkRole === "lead_actor" || crewObj.epkRole === "supporting_actor") && (++count)%2 !== 0) &&
                        <div className={style.starcontainer}>
                          <div className={style.imgleft}>
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}  alt="starring"
                            className={style.starimg}/>
                            
                            <h1>{crewObj.crewId.name}</h1>
                            <p className={style.mediaIcon}><InstagramIcon style={{color:"red"}} onClick={() => openUrl(crewObj.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue"}} onClick={() => openUrl(crewObj.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue"}} onClick={() => openUrl(crewObj.twitter_url)} />
                            </p>
                          </div>
                          <div className={style.contentRight}>
                            <p className={style.biography}>{crewObj.biography}</p>
                          </div>
                        </div>
                        } 

                        {((crewObj.epkRole === "lead_actor" || crewObj.epkRole === "supporting_actor") && count%2 === 0) &&
                        <div className={style.starcontainer}>
                          <div className={style.contentRight}>
                            <p className={style.biography}>{crewObj.biography}</p>
                          </div>
                          <div className={style.imgleft}>
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}  alt="starring"
                            className={style.starimg}/>
                            
                            <h1>{crewObj.crewId.name}</h1>
                            <p className={style.mediaIcon}><InstagramIcon style={{color:"red"}} onClick={() => openUrl(crewObj.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue"}} onClick={() => openUrl(crewObj.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue"}} onClick={() => openUrl(crewObj.twitter_url)} />
                            </p>
                          </div>
                        </div>
                        } 
                    </>
                  );
                })}
      </div>     



      {/* Directors Section */}
      <div >
        
              {crewList.map((crewObj) => {
                  return ( 
                    <>
                        {(crewObj.epkRole === "director" && (++count)%2 !== 0) &&
                        <div className={style.directorcontainer}>
                          <div className={style.left}>
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}  
                            alt="director"
                            className={style.producerimg}>
                            </img>
                            <h1>{crewObj.crewId.name}</h1>
                            <p><InstagramIcon style={{color:"red"}} onClick={() => openUrl(crewObj.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue"}} onClick={() => openUrl(crewObj.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue"}} onClick={() => openUrl(crewObj.twitter_url)} />
                            </p>
                          </div>
                          <div className={style.right}>
                            <h3>Director</h3>
                            <br/>
                            <p >{crewObj.biography}</p>
                          </div>
                        </div>
                        } 

                        {(crewObj.epkRole === "director" && count%2 === 0) &&
                        <div className={style.directorcontainer}>
                          <div className={style.right}>
                          <h3>Director</h3>
                            <br/>
                            <p>{crewObj.biography}</p>
                          </div>
                          <div className={style.left}>
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}  
                            alt="starring"
                            className={style.producerimg}>
                            </img>
                            <h1>{crewObj.crewId.name}</h1>
                            <p><InstagramIcon style={{color:"red"}} onClick={() => openUrl(crewObj.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue"}} onClick={() => openUrl(crewObj.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue"}} onClick={() => openUrl(crewObj.twitter_url)} />
                            </p>
                          </div>
                        </div>
                        } 
                    </>
                  );
                })}
      </div>      

      {/* Producer Section */}
      <div >
         
              {crewList.map((crewObj) => {
                  return ( 
                    <>
                        {(crewObj.epkRole === "producer" && (++count)%2 !== 0) &&
                        <div className={style.directorcontainer}>
                          <div className={style.left}>
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`} 
                             alt="director"
                             className={style.producerimg}>
                            </img>
                            <h1>{crewObj.crewId.name}</h1>
                            <p><InstagramIcon style={{color:"red"}} onClick={() => openUrl(crewObj.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue"}} onClick={() => openUrl(crewObj.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue"}} onClick={() => openUrl(crewObj.twitter_url)} />
                                                         
                            </p>
                          </div>
                          <div className={style.right}>
                            <h3>Producer</h3>
                            <br/>
                            <p>{crewObj.biography}</p>
                          </div>
                        </div>
                        } 

                        {(crewObj.epkRole === "producer" && count%2 === 0) &&
                        <div className={style.directorcontainer}>
                          <div className={style.right}>
                          <h3>Producer</h3>
                            <br/>
                            <p>{crewObj.biography}</p>
                          </div>
                          <div className={style.left}>
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}  
                            alt="starring"
                            className={style.producerimg}>
                            </img>
                            <h1>{crewObj.crewId.name}</h1>
                            <p ><InstagramIcon style={{color:"red"}} onClick={() => openUrl(crewObj.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue"}} onClick={() => openUrl(crewObj.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue"}} onClick={() => openUrl(crewObj.twitter_url)} />
                            </p>
                          </div>
                        </div>
                        } 
                    </>
                  );
                })}
      </div> 

      {/* Cinematographer Section */}
      <div>
         
              {crewList.map((crewObj) => {
                  return ( 
                    <>
                        {(crewObj.epkRole === "cinematographer" && (++count)%2 !== 0) &&
                        <div className={style.directorcontainer}>
                          <div className={style.left}>
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}  
                            alt="cinematographer"
                            className={style.producerimg}
                            >
                            </img>
                            <h1>{crewObj.crewId.name}</h1>
                            <p><InstagramIcon style={{color:"red"}} onClick={() => openUrl(crewObj.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue"}} onClick={() => openUrl(crewObj.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue"}} onClick={() => openUrl(crewObj.twitter_url)} />
                            </p>
                          </div>
                          <div className={style.right}>
                          <h3>Cinematographer</h3>
                          <br/>
                            <p>{crewObj.biography}</p>
                          </div>
                        </div>
                        } 

                        {(crewObj.epkRole === "cinematographer" && count%2 === 0) &&
                        <div className={style.directorcontainer}>
                          <div className={style.right}>
                          <h3>Cinematographer</h3>
                          <br/>
                            <p >{crewObj.biography}</p>
                          </div>
                          <div className={style.left}>
                            <img src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`} 
                             alt="starring"
                             className={style.producerimg}>
                            </img>
                            <h1>{crewObj.crewId.name}</h1>
                            <p><InstagramIcon style={{color:"red"}} onClick={() => openUrl(crewObj.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue"}} onClick={() => openUrl(crewObj.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue"}} onClick={() => openUrl(crewObj.twitter_url)} />
                            </p>
                          </div>
                        </div>
                        } 
                    </>
                  );
                })}
      </div> 

      

    {/* sitlls section */}

      {/* the case when user not logged in and if logged in not requested yet*/}
      {/* {userId === "0" ?
      (
        stillsImg.map((still) => {
          return(

          )
        }
      ):
      (
        (stills.length === 0 || stills.filter(u => u.user === userId).length === 0) && 
        <div>
          <div className={style.unique}>
            <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
          </div>
          <div className={style.uniqueContainer}>
              <div className={style.position1}> 
                <button onClick={()=>{addtoUniqueness(); clickState3()}} className={isClick3===true ? style.none :style.btnSy }> Request Access </button>
              </div>
              <div className={style.content1}>
                <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
              </div>
              <div className={style.content1}>
                <p className={style.textUnique}>{mediumFakeText}</p>
              </div>
          </div>
        </div>
      ) 
      } */}

      {/* the case when user logged in and requested the approval */}
      {/* {uniqueness.map((unique) => {
          return ( 
            <>
              {unique.user === userId && unique.status === "pending" &&
                <div>
                  <div className={style.unique}>
                    <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
                  </div>
                  <div className={style.uniqueContainer}>
                      <div className={style.position1}> 
                        <button> Awaiting approval </button>
                      </div>
                      <div className={style.content1}>
                        <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
                      </div>
                      <div className={style.content1}>
                        <p className={style.textUnique}>{mediumFakeText}</p>
                      </div>
                  </div>
                </div>
              } 
            </>
          )
      })} */}

      {/* the case when user logged in and got the approval */}
      {/* {uniqueness.map((unique) => {
          return ( 
            <>
              {unique.user === userId && unique.status === "approved" &&
                <div>
                  <div className={style.unique}>
                    <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
                  </div>
                  <div className={style.uniqueContainer}>
                      <div>
                        <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
                      </div>
                      <div>
                        <p className={style.textUnique}>{fepkData.description_uniqueness}</p>
                      </div>
                  </div>
                </div>
              } 
            </>
          )
      })} */}

      {/* the case when user logged in and got refused */}
      {/* {uniqueness.map((unique) => {
          return ( 
            <>
              {unique.user === userId && unique.status === "refused" &&
                <div>
                  <div className={style.unique}>
                    <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
                  </div>
                  <div className={style.uniqueContainer}>
                      <div className={style.position1}> 
                        <button> Refused </button>
                      </div>
                      <div className={style.content1}>
                        <img src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`} alt="uniqueness" className={style.imgUnique}/>
                      </div>
                      <div className={style.content1}>
                        <p className={style.textUnique}>{mediumFakeText}</p>
                      </div>
                  </div>
                </div>
              } 
            </>
          )
      })} */}


      {/* resources section */}

      <div className={style.starring}> 
      
      {resources.map((resource) => {
        return(
      <div className={style.resourcesCard}>
        <div >
          <img
            src={`https://kinomovie.s3.amazonaws.com/${resource.image}`}
            alt="resource pics"
          
            className={style.imgResource}
          />
          </div>

          <div className={style.textResource}>
              <h1 >{resource.title}</h1>
              <br/>
              <h2 >{resource.time}</h2>
              <br/>
              <h3 > {resource.description} </h3>
               <br/>
              <h4 ><InstagramIcon sx={{color:"red", fontSize:40}} onClick={() => openUrl(resource.instagram_url)} />
                                                         <FacebookIcon style={{color:"blue",fontSize:40}} onClick={() => openUrl(resource.facebook_url)} />
                                                         <TwitterIcon style={{color:"lightblue",fontSize:40}} onClick={() => openUrl(resource.twitter_url)} />
                                                         <FontAwesomeIcon icon={faEnvelope} size ="lg" color="white"/>
                                                         
                            </h4>
            </div>
          </div>
        );
      })}
        
      </div>   

      {/* trailer section */}
       
       <div className={style.directorcontainer}>
       <video src={`https://kinomovie.s3.amazonaws.com/${fepkData.trailer}`}  controls>
                        </video>

       </div>

       {/* Praise/Awards */}


      
 
      <Footer/> 
    </div>
    
    
    );
}

export default EpkView;