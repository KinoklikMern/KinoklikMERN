import React from 'react';
import { useState } from "react";

import SingleQuestion from "./SingleQuestion";
import { data } from "./data";
import "./Landing6.css";

const Landing6 = () => {
    const [questions, setQuestions] = useState(data);
    return (
        <>
            <div className="landing6" >
                <div className="sectionTitle">
                    <h1>FREQUENTLY ASKED QUESTION</h1>
                </div>
                <div className="p-5">
                    {questions.map((question) => (
                        <SingleQuestion {...question} key={question._id} />
                    ))}
                </div>
            </div>
        </>
    )
}
export default Landing6;