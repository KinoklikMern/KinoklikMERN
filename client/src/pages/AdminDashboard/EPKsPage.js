/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import moviePic from "../../images/movie11.jpg";
import http from "../../http-common";

export default function EPKsPage() {
  const user = useSelector((state) => state.user);
  const [epkInfo, setEpkInfo] = useState();
  const [filteredEPKs, setFilteredEPKs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    http.get("/fepks/")
      .then((res) => {
        setEpkInfo(res.data);
        setFilteredEPKs(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const coverSrc = (image_details) => {
    if (!image_details || image_details === "") return moviePic;
    return image_details.includes("https")
      ? image_details
      : `${process.env.REACT_APP_AWS_URL}/${image_details}`;
  };

  const handleEpkClick = (fepk) => {
    if (fepk.title) {
      navigate(`/epk/${fepk.title.replace(/ /g, "-").trim()}`);
    }
  };

  return (
    <div className="tw-flex tw-h-[calc(100vh-5rem)] tw-overflow-hidden tw-bg-[#1E0039]">
      <div className="tw-flex tw-flex-1 tw-overflow-hidden tw-pt-3 tw-pb-4 tw-px-3 tw-gap-3">
        <Sidebar role={user.role} />

        <div className="tw-flex tw-flex-1 tw-flex-col tw-min-w-0 tw-overflow-hidden">
          <TopToolBar selectedTab="EPKs" setFilteredData={setFilteredEPKs} dataInfo={epkInfo} />

          {/* Scrollable content */}
          <div className="tw-flex-1 tw-min-h-0 tw-overflow-y-auto">

            {/* Stat strip */}
            <div className="tw-flex tw-items-center tw-gap-3 tw-mb-5">
              <div className="tw-flex tw-items-center tw-gap-3 tw-bg-[#280D41] tw-rounded-xl tw-border tw-border-white/10 tw-px-5 tw-py-4">
                <div className="tw-h-10 tw-w-10 tw-rounded-lg tw-bg-[#712CB0]/30 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                  <img src={StartWhiteIcon} alt="" className="tw-h-5 tw-w-5 tw-brightness-0 tw-invert" />
                </div>
                <div>
                  <p className="tw-text-2xl tw-font-bold tw-text-white tw-leading-none">
                    {filteredEPKs?.length ?? 0}
                  </p>
                  <p className="tw-text-xs tw-text-white/50 tw-mt-0.5">
                    {filteredEPKs?.length === 1 ? "EPK" : "EPKs"}
                  </p>
                </div>
              </div>
            </div>

            {/* Grid */}
            {!filteredEPKs || filteredEPKs.length === 0 ? (
              <div className="tw-flex tw-items-center tw-justify-center tw-h-48 tw-bg-[#280D41] tw-rounded-xl tw-border tw-border-white/10">
                {!epkInfo ? (
                  <p className="tw-text-white/40 tw-text-sm">Loading...</p>
                ) : (
                  <div className="tw-text-center">
                    <img src={StartWhiteIcon} alt="" className="tw-h-8 tw-w-8 tw-mx-auto tw-mb-2 tw-opacity-20 tw-brightness-0 tw-invert" />
                    <p className="tw-text-white/30 tw-text-sm">No EPKs found</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="tw-grid tw-grid-cols-3 sm:tw-grid-cols-4 md:tw-grid-cols-5 lg:tw-grid-cols-6 xl:tw-grid-cols-8 tw-gap-3">
                {filteredEPKs.map((fepk, index) => (
                  <button
                    key={fepk._id || index}
                    onClick={() => handleEpkClick(fepk)}
                    className="tw-group tw-text-left tw-bg-[#280D41] tw-rounded-xl tw-border tw-border-white/10 tw-overflow-hidden hover:tw-border-white/30 hover:tw-scale-[1.03] tw-transition-all tw-duration-150"
                  >
                    <div className="tw-aspect-[2/3] tw-overflow-hidden tw-bg-white/5">
                      <img
                        src={coverSrc(fepk.image_details)}
                        alt={fepk.title || "EPK"}
                        className="tw-h-full tw-w-full tw-object-cover group-hover:tw-brightness-110 tw-transition-all"
                      />
                    </div>
                    <div className="tw-p-2">
                      <p className="tw-text-white tw-text-xs tw-font-medium tw-truncate tw-leading-tight">
                        {fepk.title || "Untitled"}
                      </p>
                      {fepk.status && (
                        <p className="tw-text-white/40 tw-text-[10px] tw-truncate tw-mt-0.5">
                          {fepk.status}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="tw-h-24 md:tw-h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
