import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewEpkBtn from "../../components/Dashboard/Epks/NewEpkBtn";
import Sidebar from "../../components/Dashboard/Sidebar";
import EpkCard from "../../components/Dashboard/Epks/EpkCard";
import ArchivedEpkCard from "../../components/Dashboard/Epks/ArchivedEpkCard";
import { getFepksByFilmmakerId, getDeletedFepksByFilmmakerId } from "../../api/epks";
import EmptyEpk from "../../components/Dashboard/Epks/EmptyEpk";
import LoadingSpin from "../../components/Dashboard/LoadingSpin";
import { useTranslation } from "react-i18next";
import EpkTextInfo from "../../components/Dashboard/Epks/EpkTextInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function EpkPage() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [epkList, setEpkList] = useState([]);
  const [deletedEpkList, setDeletedEpkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDeleted, setLoadingDeleted] = useState(true);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    getFepksByFilmmakerId(user.id).then((res) => {
      setEpkList(res);
      setLoading(false);
    });

    getDeletedFepksByFilmmakerId(user.id).then((res) => {
      setDeletedEpkList(res);
      setLoadingDeleted(false);
    });
  }, [user.id]);

  const handleRestore = (restoredId) => {
    setDeletedEpkList((prev) => prev.filter((epk) => epk._id !== restoredId));
    // Optionally re-fetch active EPKs to reflect restored entry
    getFepksByFilmmakerId(user.id).then((res) => setEpkList(res));
  };

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-center tw-text-white md:tw-justify-start md:tw-pl-24">
        <p className="tw-text-4xl">{t("Filmmaker Dashboard")}</p>
      </div>
      <div className="tw-flex tw-h-5/6 tw-flex-row md:tw-mx-8">
        <div className="tw-mt-12 tw-h-5/6 md:tw-ml-16">
          <Sidebar selectedTab="EPKs" />
        </div>
        <div className="tw-scrollbar-w-36 tw-mx-auto tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 tw-scrollbar tw-scrollbar-track-gray-500 tw-scrollbar-thumb-[#1E0039] md:tw-ml-16">
          <div className="tw-flex tw-flex-col tw-gap-12">
            {loading ? (
              <LoadingSpin />
            ) : epkList.length === 0 ? (
              <EmptyEpk />
            ) : (
              <>
                <div>
                  <EpkTextInfo />
                </div>
                <div className="tw-mb-4 tw-flex tw-cursor-pointer tw-justify-center">
                  <NewEpkBtn />
                </div>
                <div className="tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-2 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
                  {epkList.map((epk) => (
                    <EpkCard key={epk._id} EpkInfo={epk} />
                  ))}
                </div>
              </>
            )}

            {/* Deleted / Archived EPKs Section */}
            {!loadingDeleted && deletedEpkList.length > 0 && (
              <div className="tw-mt-4 tw-border-t tw-border-gray-200 tw-pt-6">
                <button
                  onClick={() => setShowDeleted((prev) => !prev)}
                  className="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-lg tw-bg-gray-100 tw-px-4 tw-py-3 tw-text-left tw-text-gray-600 hover:tw-bg-gray-200 tw-transition-colors"
                >
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <FontAwesomeIcon icon={faTrash} className="tw-text-gray-400 tw-text-sm" />
                    <span className="tw-font-semibold tw-text-sm">
                      {t("Deleted EPKs")}
                      <span className="tw-ml-2 tw-rounded-full tw-bg-gray-300 tw-px-2 tw-py-0.5 tw-text-xs tw-text-gray-600">
                        {deletedEpkList.length}
                      </span>
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={showDeleted ? faChevronUp : faChevronDown}
                    className="tw-text-gray-400 tw-text-sm"
                  />
                </button>

                {showDeleted && (
                  <div className="tw-mt-4 tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-2 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
                    {deletedEpkList.map((epk) => (
                      <ArchivedEpkCard
                        key={epk._id}
                        EpkInfo={epk}
                        onRestore={handleRestore}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}