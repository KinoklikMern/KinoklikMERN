import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

export default function SingleQuestion({ question, answer }) {
  const { t } = useTranslation();
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className='tw-mx-6 md:tw-mx-12'>
      <div 
        onClick={() => setShowAnswer(!showAnswer)}
        className='tw-my-2 tw-flex tw-items-center tw-justify-between tw-border-b-2 tw-border-white tw-p-3 tw-cursor-pointer'
      >
        <h2 className='tw-font-semibold tw-text-white tw-text-xl lg:tw-text-3xl tw-pr-4'>
          {t(question)}
        </h2>
        <div className="tw-shrink-0">
          {showAnswer ? (
            <button className='tw-bg-transparent tw-text-white'>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          ) : (
            <button className='tw-bg-transparent tw-text-white'>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
      </div>
      <div className='sm:tw-text-lg tw-py-4 tw-text-justify tw-text-white lg:tw-text-xl'>
        {showAnswer && <p>{t(answer)}</p>}
      </div>
    </div>
  );
}