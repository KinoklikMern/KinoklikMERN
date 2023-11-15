import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import http from "../../http-common.js";

const Landing1 = () => {
  // const dispatch = useDispatch();
  const [fepks, setFepks] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));

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

  useEffect(() => {
    http.get(`fepks/`).then((res) => {
      setFepks(res.data);
    });
  }, []);

  const lastElement = fepks.length - 1;
  const firstElement = Math.max(0, lastElement - 4);
  const filteredFepks = fepks.slice(firstElement, lastElement);

  return (
    <>
      <div className='tw-bg-midnight md:tw-h-[100vh]'>
        <div className='md:tw-p-24'>
          <div className='tw-flex tw-w-full tw-items-center'>
            <div className='tw-p-7 lg:tw-w-2/4'>
              <h1 className='tw-mt-6 tw-text-start tw-text-6xl tw-font-bold tw-text-white md:tw-text-7xl'>
                Film marketing.
                <br />
                Refined.
              </h1>
              <p className='tw-my-12 tw-text-xl tw-font-semibold tw-text-white md:tw-text-2xl'>
                Promote your film to industry professionals with KinoKlik's free
                <br />
                <span className='tw-text-[#FF00F5]'>
                  Electronic Press Kit
                </span>{" "}
                software!
              </p>
              <div className='tw-mt-4 tw-grid-cols-2 sm:tw-mt-6'>
                <a
                  className='tw-mr-4 tw-inline-block tw-rounded-lg tw-bg-[#FF00F5] tw-px-3 tw-py-1 tw-text-xl tw-font-bold tw-tracking-wider tw-text-midnight  tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base md:tw-px-4 md:tw-py-2'
                  href='/uploadFepk'
                >
                  Create EPK
                </a>
                <a
                  className='tw-inline-block tw-rounded-lg tw-bg-white tw-px-3 tw-py-1 tw-text-xl tw-font-bold tw-tracking-wider tw-text-[#1E0039] tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base md:tw-px-4 md:tw-py-2'
                  href='/catalog'
                >
                  Browse EPKs
                </a>
              </div>
            </div>

            <div className='tw-invisible tw-grid tw-w-0 md:tw-grid-cols-2 lg:tw-visible lg:tw-w-2/4'>
              {filteredFepks.map((fepk, index) => (
                <img
                  key={index}
                  className={`${
                    index === 0 ? "tw-row-span-1" : "tw-row-span-2"
                  } tw-m-3 tw-scale-150 tw-rounded-lg tw-object-cover`}
                  src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                  alt=''
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing1;
