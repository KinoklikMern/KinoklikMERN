import React from "react";
import { Link, Navigate } from "react-router-dom";
import img from "../../images/landing.png";
import { useNavigate } from "react-router-dom";
import { newFilm } from "./landingCategory";
import { popularFilm } from "./landingCategory";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";

import moviesPhoto from "../../images/landing.png";



const Landing1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const createEpk = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/epk`,
        {
          user: user.id,
        }
      );
      //dispatch({ type: "LOGIN", payload: data });

      console.log(data);
      navigate("/uploadEpk");
    } catch (error) {
      // console.log(error.response.message);
    }
  };
  return (
    <>
    <div className=" landing1  bg-midnight pb-20">
    <div className="bg-midnight grid lg:grid-cols-2 2xl:grid-cols-5">
      <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-2 2xl:col-span-2">
        <div className=" xl:max-w-xl">
        <div className="bg-TvImage bg-no-repeat">
        <img
            className=" h-64 mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64   object-center lg:hidden"
            src={moviesPhoto}
            alt="Movies"
          />
        </div>
          
          <h1 className="mt-6 text-2xl font-bold text-white-900 sm:mt-8 sm:text-3xl lg:text-4xl xl:text-5xl">
          What if you could promote your film to the world, for free?
          </h1>
          <h4 className="mt-2  text-white text-justify sm:mt-4 sm:text-xl">
            Whether you have just an idea for a movie, shot the trailer, or
            your film's in the can, use our free
            <b> Electronic Press Kit Software</b> to promote your film
            directly to industry professionals and your audience！
          </h4>
          <div className="mt-4 sm:mt-6 grid-cols-2">
            <a
              className="inline-block px-4 py-2 rounded-lg bg-white hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none  tracking-wider font-bold text-xl text-midnight shadow-lg sm:text-base mr-4"
              href="/"
            >
              Create EPK
            </a>
            <a
              className="inline-block px-4 py-2 rounded-lg bg-violet-800 hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none tracking-wider font-bold text-xl text-white shadow-lg sm:text-base"
              href="/"
            >
              Browse EPKs
            </a>
          </div>
        </div>
      </div>
      <div className="bg-TvImage bg-no-repeat bg-cover hidden relative  ml-20 p-10  lg:block 2xl:col-span-3 ">
        <img
          className="  lg:p-20 m-x-14 h-full object-cover object-center  p-x-8 pt-0 "
          src={moviesPhoto}
          alt="Movies"
        />
      </div>
    </div>
   {/* <div className="bg-white"> <Landing2N/></div> */}
   
  </div>
  
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

    {/*  <div className="bg-midnight  ">
        <h1 className=" mb-20 pt-0 text-2xl font-bold text-center text-white sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
          Are you a Distributor, a Film Festival, Sales Agent <br/>or Investor
          searching for new upcoming film projects?
        </h1> 
        <h2 className="text-white text-3xl font-bold  ml-10 ">NEW FILMS</h2>
        <div className="slide-right-left grid ml-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 px-2 py-4 sm:px-1 ">
          {newFilm.map((item) => (
            <div
              className="shadow-md shadow-gray-600 rounded-lg"
              key={item._id}
            >
              <img
                className="rounded-md w-full h-64 duration-200 hover:scale-105 "
                src={item.image}
                alt={item.title}
              />
            </div>
          ))}
        </div>

        <h2 className="text-white text-3xl font-bold mb-10 ml-10 ">
          MOST POPULAR
        </h2>
        <div className="slide-left-right grid ml-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 px-2 sm:px-0">
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
        <div className="flex justify-center  p-6 items-center">
          <a
            className="inline-block px-4 py-2 rounded-lg bg-white hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none  tracking-wider font-bold text-xl text-midnight  shadow-lg sm:text-base mr-4"
            href="/"
          >
            Browse Film Projects
          </a>
        </div>
          </div> */}
    </>
  );
};
export default Landing1;
