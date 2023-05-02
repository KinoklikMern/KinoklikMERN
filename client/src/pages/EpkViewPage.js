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
import { useParams } from "react-router-dom";
import { getFepksByTitle } from "../api/epks";

function EpkViewPage() {
  const { title } = useParams();
  const [epkInfo, setEpkInfo] = useState();
  useEffect(() => {
    getFepksByTitle(title).then((res) => setEpkInfo(res));
  }, [title]);
  return (
    epkInfo && (
      <div className="tw-flex tw-justify-center tw-bg-[#1E0039]">
        <div className="tw-w-11/12">
          <EpkHeader epkInfo={epkInfo} />
          <EpkCover epkInfo={epkInfo} />
          <EpkSocialAction epkInfo={epkInfo}/>
          <EpkDetail epkInfo={epkInfo}/>
          <EpkLogline epkInfo={epkInfo}/>
          <EpkSynopsis epkInfo={epkInfo}/>
          <EpkUniqueness  epkInfo={epkInfo}/>
          <EpkCast epkInfo={epkInfo} />
          <EpkWorker epkInfo={epkInfo}/>
          <EpkStills epkInfo={epkInfo} />
          <EpkResources epkInfo={epkInfo}/>
          <EpkTrailer epkInfo={epkInfo}/>
          <EpkAward epkInfo={epkInfo}/>
        </div>
      </div>
    )
  );
}

export default EpkViewPage;
