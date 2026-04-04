import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import EpkCard from "../../components/UserDashboard/EpkCard";
import Axios from "axios";
import { useTranslation } from "react-i18next";

export default function RequestsPage() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const userId = user?.id || "0";
  
  const [lists, setLists] = useState({ approved: [], pending: [], refused: [] });

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/fepks/getRequestsFepksByUser/${userId}`)
      .then((rs) => {
        // Helper to filter the raw data by status for this specific user
        const filterStatus = (status) => rs.data.filter((item) => 
          item.requests?.some((req) => req.status === status && req.user._id === userId)
        );

        setLists({
          approved: filterStatus("approved"),
          pending: filterStatus("pending"),
          refused: filterStatus("refused"),
        });
      })
      .catch((error) => alert(error.response?.data?.message || "Error fetching data"));
  }, [userId]);

  return (
    <div className='tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]'>
      <div className='tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white md:tw-mb-8'>
        <p className='tw-text-4xl'>{user.role} {t("Dashboard")}</p>
      </div>
      
      <div className='tw-mx-8 tw-flex tw-h-5/6 tw-flex-row'>
        <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
          <Sidebar selectedTab='Requests' role={user.role} />
        </div>

        <div className='tw-scrollbar-w-36 tw-mt-12 tw-h-5/6 tw-w-full tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-6 md:tw-ml-16 md:tw-w-5/6'>
          
          {/* Map through statuses to eliminate code duplication */}
          {["approved", "pending", "refused"].map((status) => {
            const currentList = lists[status];
            
            return (
              <div key={status} className='tw-mb-10 tw-flex tw-flex-col tw-gap-3'>
                <span className='tw-bg-[#1E0039] tw-px-4 tw-py-1 tw-text-xl tw-font-bold tw-text-white tw-rounded-t-md'>
                  {t(`${status.charAt(0).toUpperCase() + status.slice(1)} EPKs`)}
                </span>

                {currentList.length === 0 ? (
                  /* INLINED EMPTY MESSAGE - NO MORE EMPTYEPK COMPONENT */
                  <div className="tw-flex tw-justify-center tw-py-12 tw-border-2 tw-border-dashed tw-border-gray-100 tw-rounded-b-md">
                    <p className="tw-text-2xl tw-font-light tw-text-[#1E0039]">
                      {t('You don’t have any EPK')} {t(status)}.
                    </p>
                  </div>
                ) : (
                  <div className={`tw-p-2 ${currentList.length > 2 ? 'tw-flex tw-overflow-x-auto tw-gap-4' : 'tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4'}`}>
                    {currentList.map((epk) => (
                      <div key={epk._id} className={currentList.length > 2 ? 'tw-w-80 tw-flex-none' : ''}>
                        <EpkCard EpkInfo={epk} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}