import React from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../../../context/ChatProvider.js";

function ChatListItem({
  chat,
  getChatSender,
  formatTimestamp,
  isOnline,
  onChatItemClick,
}) {
  const { selectedChat, setSelectedChat } = ChatState();
  const user = useSelector((state) => state.user);

  // Check if the current chat item is the selected chat
  const isSelected = chat?._id === selectedChat?._id;

  return (
    <div
      className={`tw-mx-4 tw-my-4 tw-flex tw-flex-wrap tw-items-center tw-rounded-full ${
        isSelected ? "tw-border-white-500 tw-border" : ""
      } tw-bg-[#341a4d] tw-text-gray-400 hover:tw-bg-gray-300/25 hover:tw-text-white`}
    >
      <div
        className='tw-relative tw-flex tw-w-full tw-flex-wrap tw-items-center tw-justify-around tw-rounded-lg md:tw-text-sm lg:tw-text-base xl:tw-text-lg'
        onClick={() => {
          setSelectedChat(chat);
          onChatItemClick(chat);
        }}
      >
        {/* <img
          className="tw-m-1 tw-ml-6 tw-h-16 tw-w-16 tw-flex-none tw-rounded-lg"
          src={getChatSender(user, chat?.users)?.avatar}
          alt="profile image"
        /> */}

        <div className='tw-relative tw-m-1 tw-flex tw-h-16 tw-w-16 tw-flex-wrap tw-overflow-hidden tw-rounded-lg'>
          <img
            className='tw-h-10 tw-w-10 tw-rounded-lg tw-object-cover xl:tw-h-16 xl:tw-w-16'
            src={getChatSender(user, chat?.users)?.avatar}
            alt='profile img'
          />

          {isOnline && (
            <span className='tw-absolute tw-right-0 tw-top-0 tw-h-3 tw-w-3 tw-rounded-full tw-border-2 tw-border-white tw-bg-green-500'></span>
          )}

          <div className='tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-w-full tw-bg-black/50 tw-text-center tw-text-xs tw-text-white'>
            {getChatSender(user, chat?.users)?.type}
          </div>
        </div>

        <span className=''>{getChatSender(user, chat?.users)?.name}</span>
        <span className=''>{formatTimestamp(chat?.updatedAt)}</span>
      </div>
    </div>
  );
}

export default ChatListItem;
