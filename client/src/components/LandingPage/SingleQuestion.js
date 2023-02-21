import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <div className=" tw-ml-20 tw-mr-20 ">
        <div
          className=" tw-flex  tw-justify-between tw-border-b tw-border-gray-500 tw-p-3 tw-my-2 tw-rounded-md tw-text-2xl tw-font-bold lg:tw-text-3xl"
          style={{ color: "white" }}
        >
          <h2
            onClick={() => setShowAnswer(!showAnswer)}
            className="   tw-text-white  sm:tw-text-xl  lg:tw-text-3xl tw-font-semibold tw-cursor-pointer"
          >
            {question}
            &nbsp;&nbsp;&nbsp;
            {showAnswer ? (
              <button className="tw-bg-midnight">
                <FontAwesomeIcon icon={faMinus} />
              </button>
            ) : (
              <button
                className="tw-bg-midnight tw-justify-end"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </h2>
        </div>
        <div
          className="tw-px-6 tw-text-justify  sm:tw-text-l lg:tw-text-xl"
          style={{ color: "white" }}
        >
          {showAnswer && <p>{answer}</p>}
        </div>
      </div>
    </>
  );
}
