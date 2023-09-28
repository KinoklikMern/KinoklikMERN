import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider.js";

function NotificationItem({ chat, getChatSender, formatTimestamp, notif }) {
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const { user } = useSelector((user) => ({ ...user }));
  const markAsRead = async () => {
    setSelectedChat(chat);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/message/updateMessage/${chat._id}`,
        {},
        config
      );
      if (data.acknowledged) {
        setNotification(notification.filter((n) => n !== notif));
      }
    } catch (error) {
      console.log(`message: ${error.message}`);
    }
  };

  return (
    <div className="tw-my-4 tw-mx-4 tw-flex tw-flex-col tw-rounded-full  tw-bg-gray-300/25 tw-text-gray-400 hover:tw-bg-gray-300/25 hover:tw-text-white">
      <div
        className="tw-relative tw-flex tw-rounded-lg"
        onClick={() => {
          markAsRead();
        }}
      >
        <div className="tw-absolute tw-bottom-auto tw-left-auto tw--right-1 tw--top-1 tw-z-10 tw-rounded-full tw-bg-pink-700 tw-p-2.5"></div>

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

export default NotificationItem;
