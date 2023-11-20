import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const FilterButton = ({ name, isActive, clickHandler }) => {
  if (!name) {
    // Handle the case where 'name' is undefined
    return null;
  }

  return (
    <button
      className={`tw-text-small tw-mb-1 tw-mr-5 tw-w-48 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase md:tw-w-auto ${
        !isActive
          ? 'tw-bg-[#1E0039] tw-text-[#AAAAAA]'
          : 'tw-bg-white tw-text-[#1E0039]'
      }`}
      type="button"
      onClick={() => clickHandler(name, isActive)}
    >
      {name}
      {!isActive ? (
        <FontAwesomeIcon
          className="tw-pl-5"
          icon={faPlus}
          style={{ color: '#aaaaaa' }}
        />
      ) : (
        <FontAwesomeIcon className="tw-pl-5" icon={faCheck} />
      )}
    </button>
  );
};

export default FilterButton;