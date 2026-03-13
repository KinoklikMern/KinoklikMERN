import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FilterWrapper = ({ label, children, selectedValue, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      onOptionSelect: (label, value) => {
        child.props.onOptionSelect(label, value);
        setIsOpen(false); 
      }
    })
  );

 useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={`filter-button-container ${className || ""}`} ref={containerRef}>
        <button
            className={`tw-px-4 tw-h-7 tw-rounded-lg tw-text-xs tw-transition-colors ${
                selectedValue && selectedValue !== "All"
                ? "tw-bg-[#6627a7] tw-text-white"
                : "tw-bg-white tw-text-midnight"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            >
            {selectedValue && selectedValue !== "All" ? selectedValue : label} ▾
            </button>
        {isOpen && childrenWithProps}
    </div>
    );
};

export default FilterWrapper;