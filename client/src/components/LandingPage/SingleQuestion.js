import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <div className='tw-ml-20 tw-mr-20 '>
        <div className='tw-my-2 tw-flex tw-border-b-2 tw-border-white tw-p-3 tw-text-2xl tw-font-bold lg:tw-text-3xl'>
          <h2
            onClick={() => setShowAnswer(!showAnswer)}
            className='   tw-cursor-pointer  tw-font-semibold  tw-text-white sm:tw-text-xl lg:tw-text-3xl'
          >
            {question}
            &nbsp;&nbsp;&nbsp;
            {showAnswer ? (
              <button className='tw-bg-transparent'>
                <FontAwesomeIcon icon={faMinus} />
              </button>
            ) : (
              <button
                className='tw-bg-transparent'
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </h2>
        </div>
        <div className='sm:tw-text-l tw-py-4  tw-text-justify tw-text-white lg:tw-text-xl'>
          {showAnswer && <p>{answer}</p>}
        </div>
      </div>
    </>
  );
}
