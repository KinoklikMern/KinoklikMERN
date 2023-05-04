import React, { useState, useEffect } from "react";
import EpkHeader from "../components/EpkView/EpkHeader/EpkHeader";
import EpkCover from "../components/EpkView/EpkCover/EpkCover";
import EpkSocialAction from "../components/EpkView/EpkSocialAction/EpkSocialAction";
import EpkDetail from "../components/EpkView/EpkDetail/EpkDetail";
import EpkLogline from "../components/EpkView/EpkLogline/EpkLogline";
import EpkSynopsis from "../components/EpkView/EpkSynopsis/EpkSynopsis";
import EpkUniqueness from "../components/EpkView/EpkUniqueness/EpkUniqueness";
import EpkCast from "../components/EpkView/EpkCast/EpkCast";
import EpkWorker from "../components/EpkView/EpkWorker/EpkWorker";
import EpkStills from "../components/EpkView/EpkStills/EpkStills";
import EpkResources from "../components/EpkView/EpkResources/EpkResources";
import EpkTrailer from "../components/EpkView/EpkTrailer/EpkTrailer";
import EpkAward from "../components/EpkView/EpkAward/EpkAward";
import RequestModal from "../components/EpkView/miscellaneous/RequestModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFepksByTitle } from "../api/epks";
import { useSelector } from "react-redux";
import { FepkContext } from "../context/FepkContext";

function EpkViewPage() {
  const [fepkId, setFepkId, fepkMaker, setFepkMaker] =
    React.useContext(FepkContext);
  const { user } = useSelector((user) => ({ ...user }));
  const { title } = useParams();
  const [epkInfo, setEpkInfo] = useState();
  const [requestStatus, setRequestStatus] = useState();
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleRequest = () => {
    if (user) {
      return handleShow;
    }
    return navigate("/login", { state: pathname });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getFepksByTitle(title).then((res) => {
      setEpkInfo(res);
      if (user.id === res.film_maker._id) {
        setRequestStatus("approved");
      } else {
        res.requests.map((request) => {
          if (request.user == user?.id) {
            setRequestStatus(request.status);
          }
        });
      }
    });
  }, [title, refresh]);
  console.log("epk", epkInfo);
  return (
    epkInfo && (
      <div className="tw-flex tw-justify-center tw-bg-[#1E0039]">
        <div className="tw-w-11/12">
          <EpkHeader epkInfo={epkInfo} />
          <EpkCover epkInfo={epkInfo} />
          <EpkSocialAction epkInfo={epkInfo} />
          <EpkDetail epkInfo={epkInfo} />
          <EpkLogline epkInfo={epkInfo} />
          <EpkSynopsis
            epkInfo={epkInfo}
            requestStatus={requestStatus}
            user={user}
            setRefresh={setRefresh}
            handler={handleRequest}
          />
          <EpkUniqueness
            epkInfo={epkInfo}
            requestStatus={requestStatus}
            user={user}
            setRefresh={setRefresh}
            handler={handleRequest}
          />
          <EpkCast epkInfo={epkInfo} />
          <EpkWorker epkInfo={epkInfo} />
          <EpkStills epkInfo={epkInfo} />
          <EpkResources epkInfo={epkInfo} />
          <EpkTrailer epkInfo={epkInfo} />
          <EpkAward epkInfo={epkInfo} />
          {show && (
            <RequestModal
              close={handleClose}
              open={handleShow}
              epkId={epkInfo._id}
              filmmakerId={epkInfo.film_maker._id}
              user={user}
              setRefresh={setRefresh}
            />
          )}
        </div>
      </div>
    )
  );
}

export default EpkViewPage;
