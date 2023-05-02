import React from "react";
import Button from "react-bootstrap/Button";

export default function RequestButton({ status }) {
  status = null
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
      <div className="d-flex justify-content-center">
        <Button variant="light" disabled={IsDisabled}>
          {ButtonTxt}
        </Button>
      </div>
    </>
  );
}
