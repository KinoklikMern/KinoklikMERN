/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { data } from "./data";
//import "./Landing6.css";

const Landing10 = () => {
  const [questions, setQuestions] = useState(data);
  return (
    <>
      <div className='landing10 tw-bg-midnight'>
        <div className='tw-text-white-900 tw-pt-10 tw-text-center tw-text-2xl tw-font-bold lg:tw-text-2xl xl:tw-text-2xl'>
          <h1 className='tw-text-white'>Frequently Asked Questions:</h1>
        </div>
        <div className='tw-p-2'>
          {questions.map((question) => (
            <SingleQuestion {...question} key={question._id} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Landing10;
