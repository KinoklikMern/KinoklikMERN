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
// testing
import Landing1N from "../LandingNewPage/Landing1N";

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
      <Landing1N />
      {/*<div className="landing1">
        <div className="landing1Button">
          {user && user.role === "FILM_MAKER" && (
            <button className="landing1FilmEPK" onClick={createEpk}>
              UPLOAD EPK
            
            </button>
          )}
        </div>

        <Grid item  >
          <div className="leftColumn ">
            <h2 className="landing1Title">
              Promote your film to the world, for free!
            </h2>
            <Box paddingX={10}>
              <Typography
                variant="h6"
                component="h3"
                style={{ color: "#FFFFFF" }}
              >
                
                Whether you have just an idea for a movie, shot the trailer, or
                your film's in the can, use our free
                <b> Electronic Press Kit Software</b> to promote your film
                directly to industry professionals and your audience！
             
              </Typography>
            </Box>
     
            <Box paddingY={5}>
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
            </Box>
          </div>
        </Grid>
        <Grid item >
        <div className="rightColumn"> 
            <img className="landing1Img" src={img} alt=""></img>
          </div> 
        </Grid>
          </div> */}

      <div className="bg-midnight ">
        <h2 className="text-white text-3xl font-bold  ml-10 ">
          NEW FILMS
        </h2>
        <div className="grid ml-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-2 py-4 sm:px-1">
          {newFilm.map((item) => (
            <div
              className="shadow-md shadow-gray-600 rounded-lg"
              key={item._id}
            >
              <img
                className="rounded-md w-full h-64 duration-200 hover:scale-105"
                src={item.image}
                alt={item.title}
              />
            </div>
          ))}
        </div>

        <h2 className="text-white text-3xl font-bold mb-10 ml-10 ">
          MOST POPULAR
        </h2>
        <div className="grid ml-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-2 sm:px-0">
          {popularFilm.map((item) => (
            <div
              className="shadow-md shadow-gray-600 rounded-lg"
              key={item._id}
            >
              <img
                className="rounded-md w-full h-64 duration-200 hover:scale-105"
                src={item.image}
                alt={item.title}
              />
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
