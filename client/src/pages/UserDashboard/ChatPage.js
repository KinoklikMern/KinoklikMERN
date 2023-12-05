import React, { useState, useEffect } from "react";
import Sidebar from "../../components/UserDashboard/Sidebar";
import ChatList from "../../components/FilmMakerDashboard/Chats/ChatList";
import MessageBox from "../../components/FilmMakerDashboard/Chats/MessageBox";
import ChatProvider from "../../context/ChatProvider";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { useNavigate, useParams } from "react-router-dom";

export default function ChatPage() {
  // eslint-disable-next-line no-unused-vars
  const [fetchAgain, setFetchAgain] = useState(false);
  // fetching user
  const user = useSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();

  const { userId } = useParams();
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (userId) {
      // If there's a selected user ID, navigate to the chat page for that user
      navigate(`/userdashboard/chat/${userId}`);
    }
  }, [userId, navigate]);

  return (
    <ChatProvider>
      <div className='tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]'>
        <div className='tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white md:tw-mb-8'>
          <p className='tw-text-4xl'>
            {user.role} {t("Dashboard")}
          </p>
        </div>
        <div className='tw-flex tw-h-5/6 tw-flex-row md:tw-mx-8'>
          <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
            <Sidebar selectedTab='Messages' role={user.role} />
          </div>
          <div className='tw-scrollbar-w-36 tw-mt-12 tw-h-5/6 tw-w-full tw-rounded-lg tw-bg-white tw-p-4 md:tw-ml-16 md:tw-w-5/6'>
            <div className='tw-h-full md:tw-grid md:tw-grid-cols-3 md:tw-gap-4'>
              <div className='-tw-m-4 tw-overflow-auto tw-rounded-lg tw-bg-[#341a4d] md:tw-rounded-r-none'>
                {/* search bar */}

                <div className='shadow-sm tw-relative tw-mx-4 tw-my-8 tw-rounded-md'>
                  <input
                    type='text'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className='tw-w-full tw-rounded-md tw-border tw-bg-gradient-to-b tw-from-[#868585] tw-to-[#1E0039] tw-py-2 tw-pl-9 tw-pr-10 tw-text-white tw-shadow-sm placeholder:tw-text-white focus:tw-border-white focus:tw-ring-1 focus:tw-ring-white sm:tw-text-sm'
                    placeholder='Search...'
                  />
                  <div className='tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-3'>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className='tw-text-white'
                    />
                  </div>
                </div>
                {/* chatlist */}
                {userId ? (
                  <ChatList
                    fetchAgain={fetchAgain}
                    userId={userId}
                    searchValue={searchValue}
                  />
                ) : (
                  <ChatList fetchAgain={fetchAgain} searchValue={searchValue} />
                )}
              </div>
              <div className='tw-col-span-2 tw-mx-4 tw-h-full tw-overflow-hidden'>
                <MessageBox
                  fetchAgain={fetchAgain}
                  setFetchAgain={fetchAgain}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}
