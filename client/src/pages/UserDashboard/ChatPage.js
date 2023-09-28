import React, { useEffect, useState } from "react";
import Sidebar from "../../components/UserDashboard/Sidebar";
import avatarDemo from "../../images/avatarDefault.jpeg";
import ChatList from "../../components/FilmMakerDashboard/Chats/ChatList";
import MessageBox from "../../components/FilmMakerDashboard/Chats/MessageBox";
import ChatProvider from "../../context/ChatProvider";
import { useSelector } from "react-redux";

export default function ChatPage() {
  const [fetchAgain, setFetchAgain] = useState(false);
  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  
  return (
    <ChatProvider>
      <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
        <div className="tw-mt-24 tw-mb-8 tw-flex tw-justify-start tw-pl-24 tw-text-white">
          <p className="tw-text-4xl">User Dashboard</p>
        </div>
        <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
          <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
            <Sidebar selectedTab="Messages" role={user.role}/>
          </div>
          <div className="tw-scrollbar-w-36 tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-rounded-lg tw-bg-white tw-p-4">
            <div className="tw-grid tw-h-full tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
              <div className="tw-overflow-auto tw-bg-[#1E0039] tw--m-4">
                {/* search bar */}
                {/* <label className="tw-relative tw-block">
                  <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-2">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{ color: "#ffffff" }}
                    />
                  </span>
                  <input
                    className="tw-placeholder:tw-italic tw-block tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-slate-300 tw-bg-gradient-to-b tw-from-[#868585] tw-to-[#1E0039] tw-py-2 tw-pl-9 tw-pr-3 tw-text-white tw-shadow-sm placeholder:tw-text-white focus:tw-border-sky-500 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-sky-500 sm:tw-text-sm"
                    placeholder="Search..."
                    type="text"
                    name="search"
                  />
                </label> */}
                {/* chatlist */}
                <ChatList fetchAgain={fetchAgain}/>
              </div>
              <div className="tw-col-span-2 tw-mx-4 tw-overflow-y-auto">
                <MessageBox fetchAgain={fetchAgain} setFetchAgain={fetchAgain}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}
