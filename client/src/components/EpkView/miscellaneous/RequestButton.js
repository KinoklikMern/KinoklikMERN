import React from "react";
import Button from "react-bootstrap/Button";

export default function RequestButton({ status, handler }) {
  let ButtonTxt;
  let IsDisabled = false;
  switch (status) {
    case null:
      ButtonTxt = "Request Access";
      IsDisabled = false;
      break;

    case "pending":
      ButtonTxt = "Awaiting approval";
      IsDisabled = true;
      break;

    case "refused":
      ButtonTxt = "Request refused";
      IsDisabled = true;
      break;

    default:
      ButtonTxt = "Request Access";
      IsDisabled = false;
      break;
  }

  return (
    <>
      <div className="tw-flex tw-justify-center ">
        <Button
          variant="light"
          disabled={IsDisabled}
          className="tw-shadow-[3px_3px_3px_#712CB0]"
          onClick={() => handler("request")}
        >
          {ButtonTxt}
        </Button>
      </div>
    </>
  );
}
