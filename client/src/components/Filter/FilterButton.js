import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const FilterButton = ({ name, isActive, clickHandler }) => {
    if (!name) {
        return null;
    }

    return (
        <button
            className={`tw-flex tw-items-center tw-justify-center tw-text-small tw-mb-1 tw-mr-5 tw-w-56 sm:tw-w-48 tw-rounded-full tw-border-2 tw-px-3 tw-py-2 tw-font-bold tw-uppercase tw-whitespace-nowrap ${
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
                    className="tw-pl-2" // Reduced padding for icon
                    icon={faPlus}
                    style={{ color: '#aaaaaa' }}
                />
            ) : (
                <FontAwesomeIcon className="tw-pl-2" icon={faCheck} />
            )}
        </button>
    );
};

export default FilterButton;
