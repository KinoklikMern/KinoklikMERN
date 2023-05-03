import React, { useState } from "react";
import RequestButton from "../miscellaneous/RequestButton";
import RequestModal from "../miscellaneous/RequestModal";

export default function SynopsisContent({
  name,
  image,
  text,
  status,
  handleShow,
  // epkId,
  // user,
  // filmmakerId,
  // setRefresh

}) {
  const isBlur =
    (name != "short" && status == null) ||
    status == "pending" ||
    status == "refused"
      ? true
      : false;
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <div className="tw-relative">
      <div className="tw-absolute tw-top-0 tw-left-[45%] tw-z-20 tw-my-3">
        {name != "short" && status != "approved" && (
          <RequestButton status={status} handler={handleShow} />
        )}
      </div>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "600px",
        }}
        className={`tw-m-6 tw-flex tw-flex-col tw-justify-end tw-rounded-3xl tw-p-4 ${
          isBlur && "tw-blur"
        }`}
      >
        <span className="tw-mb-10 tw-text-[1.5rem]">{text}</span>
      </div>
      {/* {show && <RequestModal close={handleClose} open={handleShow} epkId={epkId} filmmakerId={filmmakerId} user={user} setRefresh={setRefresh}/>} */}
    </div>
  );
}
