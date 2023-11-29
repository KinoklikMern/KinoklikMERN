import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider.js";

function NotificationItem({ chat, getChatSender, formatTimestamp, notif }) {
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const user = useSelector((state) => state.user);
  const isSelected = chat?._id === selectedChat?._id;

  // // Initialize the message count state
  // const [messageCount, setMessageCount] = useState(0);

  // // Calculate the message count for the filmmaker
  // const calculateMessageCount = () => {
  //   const senderId = notif.sender._id;
  //   const filmmakerId = user._id;
  //   // Filter unread messages from the same sender in the same chat
  //   const messagesFromSenderToFilmmaker = notification.filter(
  //     (n) =>
  //       n.sender._id === senderId &&
  //       n.chat === notif.chat &&
  //       n.receiverHasRead === false &&
  //       n.sender._id !== filmmakerId
  //   );
  //   return messagesFromSenderToFilmmaker.length;
  // };

  // useEffect(() => {
  //   setMessageCount(calculateMessageCount());
  // }, [notification, notif.sender._id, user._id, notif.chat]);

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

  console.log("notif", notif);
  console.log("notification", notification);

  return (
    <div
      className={`tw-mx-4 tw-my-4 tw-flex tw-flex-col tw-rounded-full ${
        isSelected ? "tw-border-white-500 tw-border" : ""
      } tw-bg-gray-300/25 tw-text-gray-400 hover:tw-bg-gray-300/25 hover:tw-text-white`}
    >
      <div
        className='tw-relative tw-flex tw-rounded-lg'
        onClick={() => {
          markAsRead();
        }}
      >
        {/* <img
          className="tw-m-1 tw-ml-6 tw-h-16 tw-w-16 tw-flex-none tw-rounded-lg"
          src={getChatSender(user, chat.users).avatar}
          alt="profile image"
        /> */}

        <div className='tw-relative tw-m-1 tw-ml-6 tw-h-16 tw-w-16 tw-flex-none tw-overflow-hidden tw-rounded-lg'>
          <img
            className='tw-h-16 tw-w-16 tw-flex-none tw-rounded-lg'
            src={getChatSender(user, chat?.users)?.avatar}
            alt='profile image'
          />

          <div className='tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-w-full tw-bg-black/50 tw-text-center tw-text-xs tw-text-white'>
            {getChatSender(user, chat?.users)?.type}
          </div>
        </div>

        <span className='tw-grow tw-self-center tw-pl-8'>
          {getChatSender(user, chat.users).name}
          <div className='tw-absolute tw--right-1 tw--top-1 tw-bottom-auto tw-left-auto tw-z-10 tw-rounded-full tw-bg-pink-700 tw-p-2.5'></div>
          {/* Red indicator with message count */}
          {/* {messageCount > 0 && (
            // <div className="tw-absolute tw-bottom-auto tw-left-auto tw--right-1 tw--top-1 tw-z-10 tw-rounded-full tw-bg-pink-700 tw-p-2.5">
            <div className="tw-absolute tw-top-0 tw-right-0 tw-flex tw-h-6 tw-w-6 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-text-white">
              {messageCount}
            </div>
          )} */}
        </span>
        <span className='tw-self-center tw-pr-4'>
          {formatTimestamp(chat.updatedAt)}
        </span>
      </div>
    </div>
  );
}

export default NotificationItem;
