import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../../../context/ChatProvider.js";

function ChatListItem({ chat, getChatSender, formatTimestamp }) {
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="tw-my-4 tw-mx-4 tw-flex tw-flex-col tw-rounded-full  tw-bg-[#1E0039] tw-text-gray-400 hover:tw-bg-gray-300/25 hover:tw-text-white">
      <div
        className="tw-relative tw-flex tw-rounded-lg"
        onClick={() => {
          setSelectedChat(chat);
        }}
      >
        <img
          className="tw-m-1 tw-ml-6 tw-h-16 tw-w-16 tw-flex-none tw-rounded-lg"
          src={getChatSender(user, chat.users).avatar}
          alt="profile image"
        />
        <span className="tw-grow tw-self-center tw-pl-8">
          {getChatSender(user, chat.users).name}
        </span>
        <span className="tw-self-center tw-pr-4">
          {formatTimestamp(chat.updatedAt)}
        </span>
      </div>
    </div>
  );
}

export default ChatListItem;
