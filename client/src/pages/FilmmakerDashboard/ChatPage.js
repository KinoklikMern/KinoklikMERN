import React, { useEffect, useState } from "react";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import ChatList from "../../components/FilmMakerDashboard/Chats/ChatList";
import MessageBox from "../../components/FilmMakerDashboard/Chats/MessageBox";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function ChatPage() {
  const [fetchAgain, setFetchAgain] = useState(false);

  // Yeming added
  const { userId } = useParams();
  const navigate = useNavigate(); // Initialize navigate function
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (userId) {
      // If there's a selected user ID, navigate to the chat page for that user
      navigate(`/dashboard/chat/${userId}`);
    }
  }, [userId, navigate]);
  //

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white">
        <p className="tw-text-4xl">Filmmaker Dashboard</p>
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-mt-12 tw-h-5/6 md:tw-ml-16">
          <Sidebar selectedTab="Messages" />
        </div>
        <div className="tw-scrollbar-w-36 tw-mt-12 tw-h-5/6 tw-w-full tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 md:tw-ml-16 md:tw-w-5/6">
          <div className="tw-grid tw-h-full tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3 ">
            <div className="tw--m-4 tw-overflow-auto tw-rounded-lg tw-bg-[#341a4d]">
              {/* search bar */}
              <div className="shadow-sm tw-relative tw-mx-4 tw-mb-8 tw-rounded-md">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="tw-block tw-w-full tw-rounded-md tw-border tw-bg-gradient-to-b tw-from-[#868585] tw-to-[#1E0039] tw-py-2 tw-pl-9 tw-pr-10 tw-text-white tw-shadow-sm placeholder:tw-text-white focus:tw-border-white focus:tw-ring-1 focus:tw-ring-white sm:tw-text-sm"
                  placeholder="Search..."
                />
                <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-3">
                  <FontAwesomeIcon icon={faSearch} className="tw-text-white" />
                </div>
              </div>

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

            <div className="tw-col-span-2 tw-mx-4 tw-overflow-y-auto tw-rounded-lg">
              <MessageBox
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
