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
      <div className="landing11  tw-bg-midnight tw-pb-20">
        <div className="tw-grid tw-bg-midnight lg:tw-grid-cols-2 2xl:tw-grid-cols-5">
          <div className="tw-mx-auto tw-max-w-md tw-px-8 tw-py-12 sm:tw-max-w-xl lg:tw-max-w-full lg:tw-px-12 lg:tw-py-24 xl:tw-mr-2 2xl:tw-col-span-2">
            <div className=" xl:tw-max-w-xl xl:tw-max-h-xl">
              <div className=" tw-h-[110%] tw-bg-TvImage tw-bg-cover tw-bg-center sm:tw-pt-4 tw-h-76 tw-bg-no-repeat lg:tw-hidden">
                <img
                  className=" tw-mt-6  tw-rounded-lg tw-object-center tw-shadow-xl sm:tw-mt-4 sm:tw-h-72 sm:tw-pb-8 sm:tw-w-full sm:tw-px-16 lg:tw-hidden"
                  src={moviesPhoto}
                  alt="Movies"
                />
              </div>

              <h1 className="tw-mt-6 tw-text-2xl tw-font-bold tw-text-white sm:tw-mt-8 sm:tw-text-3xl lg:tw-text-4xl xl:tw-text-5xl">
                What if you could promote your film to the world, for free?
              </h1>
              <h4 className="tw-mt-2  tw-text-justify tw-text-white sm:tw-mt-4 sm:tw-text-xl">
                Whether you have just an idea for a movie, shot the trailer, or
                your film's in the can, use our free
                <b> Electronic Press Kit Software</b> to promote your film
                directly to industry professionals and your audience!
              </h4>
              <div className="tw-mt-4 tw-grid-cols-2 sm:tw-mt-6">
                <a
                  className="tw-mr-4 tw-inline-block tw-rounded-lg tw-bg-white tw-px-4 tw-py-2 tw-text-xl tw-font-bold  tw-tracking-wider tw-text-midnight tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base"
                  href="/"
                >
                  Create EPK
                </a>
                <a
                  className="tw-inline-block tw-rounded-lg tw-bg-violet-800 tw-px-4 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-white tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base"
                  href="/"
                >
                  Browse EPKs
                </a>
              </div>
            </div>
          </div>
          <div className="tw-h-[107%] tw-ml-20 tw-hidden tw-bg-TvImage tw-bg-cover   tw-bg-no-repeat tw-pl-10 tw-pr-10   lg:tw-block  2xl:tw-col-span-3 ">
            <img
              className="  tw-mx-1 tw-h-[100%] tw-object-cover tw-object-center tw-px-8   lg:tw-pr-24 lg:tw-pl-20 lg:tw-pb-6 lg:tw-pt-4"
              src={moviesPhoto}
              alt="Movies"
            />
          </div>
        </div>
        {/* <div className="tw-bg-white"> <Landing2N/></div> */}
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
