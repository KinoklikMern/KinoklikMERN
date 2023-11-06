import React from "react";
import { Button } from "antd";

const SectionButton = (props) => {
  const isCurrentSection =
    props.value.toLowerCase() === props.sectionChosen.toLowerCase();

  return (
    <Button
      //className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
      className={`hover:tw-scale-110 ${
        isCurrentSection
          ? "tw-bg-[#712CB0] tw-text-white"
          : "hover:tw-bg-[#712CB0] hover:tw-text-white"
      }`}
      style={{
        boxShadow: "1px 2px 9px #311465",
        fontWeight: "bold",
        margin: "20px",
        fontSize: "1vw",
        height: "3vw",
        alignItems: "center",
        justifyContent: "center",
      }}
      type="outline-primary"
      //block
      onClick={props.onClick} //
      disabled={props.disabled}
    >
      {props.text}
    </Button>
  );
};

export default SectionButton;
