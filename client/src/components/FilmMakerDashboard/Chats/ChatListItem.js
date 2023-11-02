import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../../../context/ChatProvider.js";

function ChatListItem({ chat, getChatSender, formatTimestamp, isOnline }) {
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const { user } = useSelector((user) => ({ ...user }));

  // Check if the current chat item is the selected chat
  const isSelected = chat?._id === selectedChat?._id;

  console.log("sender", getChatSender(user, chat?.users));
  return (
    <div
      className={`tw-mx-4 tw-my-4 tw-flex tw-flex-col tw-rounded-full ${
        isSelected ? "tw-border-white-500 tw-border" : ""
      } tw-bg-[#341a4d] tw-text-gray-400 hover:tw-bg-gray-300/25 hover:tw-text-white`}
    >
      <div
        className="tw-relative tw-flex tw-rounded-lg"
        onClick={() => {
          setSelectedChat(chat);
        }}
      >
        {/* <img
          className="tw-m-1 tw-ml-6 tw-h-16 tw-w-16 tw-flex-none tw-rounded-lg"
          src={getChatSender(user, chat?.users)?.avatar}
          alt="profile image"
        /> */}

        <div className="tw-relative tw-m-1 tw-ml-6 tw-h-16 tw-w-16 tw-flex-none tw-overflow-hidden tw-rounded-lg">
          <img
            className="tw-h-16 tw-w-16 tw-flex-none tw-rounded-lg"
            src={getChatSender(user, chat?.users)?.avatar}
            alt="profile image"
          />

          {isOnline && (
            <span className="tw-absolute tw-right-0 tw-top-0 tw-h-3 tw-w-3 tw-rounded-full tw-border-2 tw-border-white tw-bg-green-500"></span>
          )}

          <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-w-full tw-bg-black/50 tw-text-center tw-text-xs tw-text-white">
            {getChatSender(user, chat?.users)?.type}
          </div>
        </div>

        <span className="tw-grow tw-self-center tw-pl-8">
          {getChatSender(user, chat?.users)?.name}
        </span>
        <span className="tw-self-center tw-pr-4">
          {formatTimestamp(chat?.updatedAt)}
        </span>
      </div>
    </div>
  );
}

export default ChatListItem;
