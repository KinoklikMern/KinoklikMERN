import React, { useState, useEffect } from "react";
import "./Landing8.css";
import { useNavigate } from "react-router-dom";
import http from "../../http-common";
import axios from "axios";
import { useSelector } from "react-redux";

const Landing8 = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  // save newest file data that get from api
  const [fepksNew, setFepks] = useState([]);
  const [fepksPopular, setPopularFepks] = useState([]);

  useEffect(() => {
    http.get(`fepks/newest/1`).then((response) => {
      setFepks(response.data);
    });

    http.get(`fepks/popular/1`).then((response) => {
      setPopularFepks(response.data);
    });
  }, []);

  // eslint-disable-next-line no-unused-vars
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
      <div className="landing4 tw-bg-midnight">
        <h1 className="tw-mb-20 tw-pt-0 tw-text-center tw-text-2xl tw-font-bold tw-text-white sm:tw-mt-8 sm:tw-text-4xl lg:tw-text-3xl xl:tw-text-4xl">
          Are you a Distributor, a Film Festival, Sales Agent <br />
          or Investor searching for new upcoming film projects?
        </h1>
        <h2 className="tw-ml-10 tw-text-3xl tw-font-bold  tw-text-white ">
          NEW FILMS
        </h2>
        <div className="slide-right-left tw-ml-10 tw-grid tw-gap-5 tw-px-2 tw-py-4 sm:tw-grid-cols-2 sm:tw-px-1 md:tw-grid-cols-3 lg:tw-grid-cols-6 ">
          {fepksNew.map((item) => (
            <div
              className="tw-rounded-lg tw-shadow-md tw-shadow-gray-600"
              key={item._id}
            >
              <a href={`epk/${item.title}`}>
                <img
                  className="tw-h-64 tw-w-full tw-rounded-md tw-duration-200 hover:tw-scale-105 "
                  src={`${process.env.REACT_APP_AWS_URL}/${item.image_details}`}
                  alt={item.title}
                />
              </a>
            </div>
          ))}
        </div>

        <h2 className="tw-mb-10 tw-ml-10 tw-text-3xl tw-font-bold tw-text-white ">
          MOST POPULAR
        </h2>
        <div className="slide-left-right tw-ml-10 tw-grid tw-gap-5 tw-px-2 sm:tw-grid-cols-2 sm:tw-px-0 md:tw-grid-cols-3 lg:tw-grid-cols-6">
          {fepksPopular.map((item) => (
            <div
              className="tw-rounded-lg tw-shadow-md tw-shadow-gray-600"
              key={item._id}
            >
              <a href={`epk/${item.title}`}>
                <img
                  className="tw-h-64 tw-w-full tw-rounded-md tw-duration-200 hover:tw-scale-105"
                  src={`${process.env.REACT_APP_AWS_URL}/${item.image_details}`}
                  alt={item.title}
                />
              </a>
            </div>
          ))}
        </div>
        <div className="tw-flex tw-items-center tw-justify-center tw-p-6">
          <a
            className="tw-mr-4 tw-inline-block tw-rounded-lg tw-bg-white tw-px-4 tw-py-2 tw-text-xl tw-font-bold  tw-tracking-wider tw-text-midnight tw-shadow-lg hover:tw--translate-y-0.5  hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base"
            href="/"
          >
            Browse Film Projects
          </a>
        </div>
      </div>
    </>
  );
};
export default Landing8;

/*} <div className="landing4" >
<h1 className="mt-6 text-2xl font-bold text-center text-white-900   lg:text-3xl xl:text-4xl">Promote your film to industry professionals and your audience!</h1>
<div className="section-image"   >
    <img src={vip} className="img-fluid" />
    <br />
</div>
</div>

*/
