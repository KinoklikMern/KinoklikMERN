import React from "react";
import { Link, Navigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import img from "../../images/landing.png";
import { useNavigate } from "react-router-dom";
import "./landing1.css";
import { newFilm } from "./landingCategory";
import { popularFilm } from "./landingCategory";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Typography,
  Card,
  Container,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
} from "@material-ui/core";

const Landing1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const createEpk = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/epk", {
        user: user.id,
      });
      //dispatch({ type: "LOGIN", payload: data });

      console.log(data);
      navigate("/uploadEpk");
    } catch (error) {
      // console.log(error.response.message);
    }
  };
  return (
    <>
      <div className="landing1">
        <div className="landing1Button">
        
          {user && user.role === "FILM_MAKER" && (
            <button className="landing1FilmEPK" onClick={createEpk}>
              UPLOAD EPK
              {/*    <Link class="landing1FilmEPK" to="/uploadEpk">
              UPLOAD EPK
            </Link> */}
            </button>
          )}
        </div>
        <div className="leftColumn ">
          <h2 className="landing1Title">
            Promote your film to the world, for free!
          </h2>
          <Typography>
          <p className="introText">
            Whether you have just an idea for a movie, shot the trailer, or your
            film's in the can, use our free
            <b> Electronic Press Kit Software</b> to promote your film directly
            to industry professionals and your audience！
          </p>
        </Typography>
          {/* <FontAwesomeIcon className="uploadFilm" icon={faFolderPlus} /> */}
          
          <Grid container spacing={3} justify="center">
            <Grid item>
              <Button href="#" variant="contained" color="primary">
                Create Film Project
              </Button>
            </Grid>
            <Grid item>
              <Button href="#" variant="contained" color="primary">
                Browse Films
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className="rightColumn ">
          <img className="landing1Img" src={img} alt=""></img>
        </div>
      </div>

      <div className="landing12">
        <h2 className="landing1NewFilms"> NEW FILMS </h2>
        <div className="landing1FilmImg">
          {newFilm.map((item) => (
            <div className="c-col" key={item._id}>
              <img className="filmImg" src={item.image} alt={item.title} />
            </div>
          ))}
        </div>
        <h2 className="landing1MostPopular"> MOST POPULAR </h2>
        <div className="landing1FilmImg">
          {popularFilm.map((item) => (
            <div className="c-col" key={item._id}>
              <img className="filmImg" src={item.image} alt={item.title} />
            </div>
          ))}
        </div>
        <div>
          <button className="browseFilmProject">Browse Film Projects</button>
        </div>
      </div>
    </>
  );
};
export default Landing1;
