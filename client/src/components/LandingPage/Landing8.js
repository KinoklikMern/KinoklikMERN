import React from 'react';
import "./Landing8.css";
import vip from '../../images/vip.png'


import { Link, Navigate } from "react-router-dom";
import img from "../../images/landing.png";
import { useNavigate } from "react-router-dom";

import { newFilm } from "./landingCategory";
import { popularFilm } from "./landingCategory";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";

const Landing8 = () => {
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
        <div className= "landing4  bg-midnight  ">
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
      </div>
        </>
    )
}
export default Landing8;

{/*} <div className="landing4" >
<h1 className="mt-6 text-2xl font-bold text-center text-white-900   lg:text-3xl xl:text-4xl">Promote your film to industry professionals and your audience!</h1>
<div className="section-image"   >
    <img src={vip} className="img-fluid" />
    <br />
</div>
</div>

*/}