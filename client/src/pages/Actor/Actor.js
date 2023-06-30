import React, {useState, useEffect, useRef} from 'react'
import './Actor.css'
import List from "./ListActor";
import worldIcon from "../../images/icons/noun-world-icon.svg";
import EpkHeader from "../../components/EpkView/EpkHeader/EpkHeader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { getActorById } from "../../api/epks";
import { useSelector } from "react-redux";
import starIcon from "../../images/icons/Star FULL.svg"
import refralIcon from "../../images/icons/referral sign.svg";
import http from "../../http-common";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';

export default function Actor(props) {
  const [epkInfo, setEpkInfo] = useState({});
  const { id } = useParams();
  const [follower, setFollower] = useState([]);
  const [range, setRange] = useState(2);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [pics, setpics] = useState([]);
  const [indexPic, setPicIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [recommend, setRecommend] = useState([]);
  let images = [];

  const listRef = useRef();

  const age_range = [
   [20, 24],
   [25, 29],
   [30, 34],
   [35, 39],
   [40, 44],
   [45, 49]
  ]

  function setAge(age){
     switch (age) {
      case age>= 20 || age<=24:
        setRange(0);
        break;
      case age>= 25 || age<=29:
        setRange(1);
        break;
      case age>= 30 || age<=34:
        setRange(2);
        break;
      case age>= 35 || age<=39:
        setRange(3);
        break;
      case age>= 40 || age<=44:
        setRange(4);
        break;
      case age>= 45 || age<=49:
        setRange(5);
        break;
     
      default:
        setRange(2);
        break;
     }
  }
  
  useEffect(() => {
    console.log("id:"+id);
    http.get(`/users/getactor/${id}`).then((res) => {
      setEpkInfo(res.data);
      console.log(res.data);
      images.push(res.data.picture);
      images.push(...res.data.profiles);
      console.log(res.data.profiles);
      console.log(images);
      setpics(images)
      

      setAge(res.data.age);
      setLikes(res.data.likes);
      setFollower(res.data.followers);
      setRecommend(res.data.comunicate);
    })
    
    
  }, [id]);

  const handleClick = (direction) => {
    console.log(pics);
    if (direction === "left" && indexPic > 0) {
      setPicIndex(indexPic - 1)
    }
    else if(direction === "right" && indexPic < pics.length-1){
      setPicIndex(indexPic + 1)
    }
  };


  return (
    <div className="tw-bg-[#1E0039]">
      <div>
        <Navbar className={props.className} title={props.title} />
      </div>
      <div className='actor-navbar'>
        <EpkHeader epkInfo={epkInfo} role="actor" id={id}/>
      </div>
    <div className='actor-container'>
        <div className="actor-image-container">
        
        
        
            <div className='actor-profile' style={{
              backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${pics[indexPic]})`
            }}>  
            <ArrowBackIosOutlined
          className="arrow-actor-profile arrow-actor-profile1"
          onClick={() => handleClick("left")}
          style={{
            color: "#1E0039",
            fontSize: "4rem",
            display: "inline"
          }}
        />  
        <ArrowForwardIosOutlined
          className="arrow-actor-profile arrow-actor-profile2"
          onClick={() => handleClick("right")}
          style={{
            color: "#1E0039",
            fontSize: "4rem",
            display: "inline"
          }}
        />
            </div>
        
        
            
        </div>
        <div className="actor-middle-container">
          <p className="actor-name actor-detail-item">{epkInfo.firstName} {epkInfo.lastName}</p>
          <p className="actor-name actor-detail-item" style={{
            gridColumn: "3/4"
          }}>{(epkInfo.sex && epkInfo.sex === "Male")? "M" : "F"}</p>
          <p className='actor-detail-item Actor-Role'>
            Actor
          </p>
          <button className="btn-follow actor-detail-item">Follow +</button>
          <p className="follower-number actor-detail-item" style={{fontSize: "24px"}}>{ follower.length || "0"}</p>
          <button className="btn-star actor-detail-item"><span style={{display: "inline"}}>Star</span> <StarIcon className='actor-page-star' style={{
            color:"white",
            marginLeft: "10px"
          }}/> {/*<img src={starIcon} className='actor-page-star' style={{fill: "white", color: "white"}}/>*/}</button>
          <p className="follower-number actor-detail-item" style={{fontSize: "24px"}}>{likes.length || "22"}</p>
          <button className="btn-Recommend actor-detail-item"><span style={{display: "inline"}}>Recommend</span> <img src={refralIcon} className='actor-page-star' style={{fill: "white", color: "white"}}/></button>
          <p className="follower-number-Recommend actor-detail-item" style={{fontSize: "24px"}}>{recommend.length || "0"}</p>
          <div className='actor-detail-item actor-icon-movie-container'>
            <img src="../Vector.png" alt="" style={{width: "37px", height: "25px"}}/>
            <p className="movie-number" style={{fontSize: "24px"}}>4</p>
          </div>
        </div>
        <div className='actor-city-container'>
          <div className='actor-city-detail'>
            <img src={worldIcon} style={{width: "55px", height: "45px", display: "inline"}}/>
            <p style={{display: "inline", marginLeft: "10px", 
            color: "#1E0039",
            fontSize: "24px",
            fontWeight: "700"
            }}>{epkInfo.city || "Montreal"} </p>
          </div>
          <div className='actor-city-ethnicity'>
            <p className='actor-age-show' style={{display: "block", marginLeft: "30px", 
            color: "#1E0039",
            fontSize: "16px",
            }}><span style={{
              fontWeight: "700",
              marginRight: "30px"
            }}>Age-Range</span><span>{age_range[range][0]} - {age_range[range][1]}</span></p>
            <p style={{display: "block", marginLeft: "30px", 
            color: "#1E0039",
            fontSize: "16px",
            }}><span style={{
              fontWeight: "700",
              marginRight: "30px"
            }}>Ethnicity  </span>  <span>{epkInfo.ethnicity || "Caucasian"}</span></p>
          </div>
          <div className='actor-biography'>
            <p>
            {epkInfo.aboutMe}
            </p>
          </div>
        </div>
        <div className="bottom-container">
          <p className='bottom-actor-container-title'>current films by actor {epkInfo.firstName} {epkInfo.lastName}</p>
          <div className='movie-actor-play-container'>
            <div>
              <List/>
            </div>
          </div>
        </div>
    </div>
    <Footer />
    </div>
  )
}
