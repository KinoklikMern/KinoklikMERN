import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <div className="ml-20 mr-20">
        <div
          className="flex border-b border-gray-500 p-3 my-2 rounded-md text-2xl font-bold lg:text-3xl"
          style={{ color: "white" }}
        >
          <h2
            onClick={() => setShowAnswer(!showAnswer)}
            className=" flex  text-white  sm:text-xl  lg:text-3xl font-semibold cursor-pointer"
          >
            {question}
            &nbsp;&nbsp;&nbsp;
            {showAnswer ? (
              <div className="flex justify-end ">
                <button>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            ) : (
              <div className="flex justify-end ">
                <button
                  className=" "
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            )}
          </h2>
        </div>
        <div
          className="px-6 text-justify  mr-20 sm:text-l lg:text-xl"
          style={{ color: "white" }}
        >
          {showAnswer && <p>{answer}</p>}
        </div>
      </div>
    </>
  );
}
