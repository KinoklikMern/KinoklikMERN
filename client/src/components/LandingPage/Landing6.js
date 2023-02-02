import React from 'react';
import { useState } from "react";

import SingleQuestion from "./SingleQuestion";
import { data } from "./data";
import "./Landing6.css";

const Landing6 = () => {
    const [questions, setQuestions] = useState(data);
    return (
        <>
            <div className="bg-midnight" >
                <div className="  text-2xl font-bold text-center text-white-900   lg:text-3xl xl:text-4xl">
                    <h1>FREQUENTLY ASKED QUESTIONS:</h1>
                </div>
                <div className="p-2">
                    {questions.map((question) => (
                        <SingleQuestion {...question} />
                    ))}
                </div>
            </div>
        </>
    )
}
export default Landing6;