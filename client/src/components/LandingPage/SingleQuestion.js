import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <div className=" ml-20 mr-20 ">
        <div
          className=" flex items-center justify-between border-b border-gray-500 p-3 my-2 rounded-md text-2xl font-bold lg:text-3xl"
          style={{ color: "white" }}
        >
          <h2
            onClick={() => setShowAnswer(!showAnswer)}
            className="   text-white  sm:text-xl  lg:text-3xl font-semibold cursor-pointer"
          >
            {question}
            &nbsp;&nbsp;&nbsp;
            {showAnswer ? (
              <button className="!important justify-end">
                <FontAwesomeIcon icon={faMinus} />
              </button>
            ) : (
              <button
                className="!important justify-end"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </h2>
        </div>
        <div
          className="px-6 text-justify  sm:text-l lg:text-xl"
          style={{ color: "white" }}
        >
          {showAnswer && <p>{answer}</p>}
        </div>
      </div>
    </>
  );
}
