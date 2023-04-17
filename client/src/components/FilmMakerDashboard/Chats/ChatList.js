import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider.js";
import NotificationItem from "./NotificationItem.js";
import ChatListItem from "./ChatListItem.js";

export default function ChatList({ fetchAgain }) {
  // { chats }
  // console.log("chatlist", chats);
  const { user } = useSelector((user) => ({ ...user }));
  const { selectedChat, setSelectedChat, notification } = ChatState();
  const [chats, setChats] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/chat`,
        config
      );
      setChats(data);
    } catch (error) {
      console.log(`message: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [selectedChat, fetchAgain]);

  // console.log("---", notification);
  const getChatSender = (loggedUser, users) => {
    const firstName =
      users[0]._id === loggedUser.id ? users[1].firstName : users[0].firstName;
    const lastName =
      users[0]._id === loggedUser.id ? users[1].lastName : users[0].lastName;
    const name = `${firstName} ${lastName}`;
    const avatar =
      users[0]._id === loggedUser.id ? users[1].picture : users[0].picture;
    const userId = users[0]._id === loggedUser.id ? users[1]._id : users[0]._id;

    return { name, avatar, userId };
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const currentDate = new Date().toLocaleDateString();
    const formatDate = date.toLocaleDateString();
    const formatTime = date.toLocaleTimeString("en-US", {
      hour12: false,
      timeStyle: "short",
    });

    return formatDate == currentDate ? formatTime : formatDate;
  };
  return (
    <>
      <div className="tw-my-4 tw-mx-4 tw-flex tw-flex-col tw-rounded-full  tw-bg-[#1E0039] tw-text-gray-400">
        {chats?.map((chat) =>
          notification?.length != 0 ? (
            notification.map((notif) =>
              notif.sender._id == getChatSender(user, chat.users).userId ? (
                <NotificationItem chat={chat} getChatSender={getChatSender} formatTimestamp={formatTimestamp} notif={notif}/>
              ) : (
                <ChatListItem chat={chat} getChatSender={getChatSender} formatTimestamp={formatTimestamp}/>
              )
            )
          ) : (
            <ChatListItem chat={chat} getChatSender={getChatSender} formatTimestamp={formatTimestamp}/>
          )
        )}
      </div>
    </>
  );
}
