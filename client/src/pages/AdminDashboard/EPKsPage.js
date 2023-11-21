/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import moviePic from "../../images/movie11.jpg";
import http from "../../http-common";
import { useNavigate } from "react-router-dom";
export default function EPKsPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [epkInfo, setEpkInfo] = useState();
  const [filteredEPKs, setFilteredEPKs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([http.get(`/fepks/`)])
      .then(([fepkResponse]) => {
        const fepksData = fepkResponse.data;

        setEpkInfo(fepksData);
        setFilteredEPKs(fepksData);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data.", error);
      });
  }, []);

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-white">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
        {/* <p className="tw-text-4xl">Admin Dashboard</p> */}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-[70vh]">
          <LeftSidebar selectedTab="EPKs" role={user.role} />
        </div>
        <div className="tw-ml-16 tw-mt-8 tw-h-5/6 tw-w-5/6  tw-rounded-lg tw-bg-white tw-p-4">
          {/* line */}
          <div className="tw-h-0.5 tw-w-full tw-bg-[#1E0039]"></div>
          {/* box */}
          <TopToolBar
            selectedTab="EPKs"
            setFilteredData={setFilteredEPKs}
            dataInfo={epkInfo}
          />

          <div className="tw-mt-10  tw-min-h-min tw-min-w-min tw-rounded-lg tw-border-2 tw-border-[#cac4cf] tw-bg-white tw-p-4 tw-shadow-[20px_20px_30px_-15px_rgba(30,0,57,0.3)]">
            <div className=" tw-flex  tw-w-full tw-flex-col tw-items-center tw-justify-center">
              <p className="tw-text-center tw-font-bold">EPKs</p>
              <div className="tw-mb-8 tw-mt-4 tw-flex tw-h-32 tw-w-32 tw-flex-col  tw-place-items-center tw-justify-center tw-rounded-lg  tw-bg-[#1E0039] tw-p-0.5">
                <p className="tw-sm:text-base tw-mt-8 tw-text-3xl tw-font-light tw-text-white">
                  {filteredEPKs === undefined || filteredEPKs.length === 0
                    ? 0
                    : filteredEPKs.length}
                </p>

                <img
                  className="tw-mb-5 tw-h-[24px]"
                  src={StartWhiteIcon}
                  alt="Start Icon"
                />
              </div>
              {filteredEPKs === undefined || filteredEPKs.length === 0 ? (
                ""
              ) : (
                <div className=" tw-w-full tw-justify-center tw-overflow-y-auto tw-rounded-lg tw-bg-gray-300 tw-px-2 tw-py-4">
                  <div className="tw-h-[30vh] tw-w-full tw-justify-center tw-overflow-y-auto tw-rounded-lg tw-bg-[#9b94ab] tw-px-2 tw-py-2">
                    <div className="tw-grid tw-grid-cols-3 tw-gap-2 tw-rounded-lg md:tw-grid-cols-4 lg:tw-grid-cols-6 xl:tw-grid-cols-10">
                      {filteredEPKs.map((fepk, index) => (
                        <div
                          key={index}
                          className="tw-flex tw-h-[120px] tw-items-center tw-justify-center "
                        >
                          <img
                            // key={index}
                            src={
                              fepk.image_details.includes("https")
                                ? fepk.image_details
                                : fepk.image_details === ""
                                ? moviePic
                                : `${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`
                            }
                            className=" tw-aspect-1 tw-h-full tw-rounded-none  tw-object-cover hover:tw-cursor-pointer"
                            alt="Movie Cover"
                            onClick={() => navigate(`/epk/${fepk.title}`)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
