import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider.js";
import NotificationItem from "./NotificationItem.js";
import ChatListItem from "./ChatListItem.js";
// import avatarDefault from "../../../images/avatarDefault.jpeg";

export default function ChatList({ fetchAgain, userId, searchValue }) {
  const { user } = useSelector((user) => ({ ...user }));
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [chats, setChats] = useState([]);

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
      // setChats(data);

      // Sort the chats based on the latest message timestamp before setting the state
      const sortedChats = data.sort(
        (a, b) =>
          new Date(b.latestMessage.createdAt) -
          new Date(a.latestMessage.createdAt)
      );
      setChats(sortedChats);
      const unreadMessages = data.filter(
        (chat) =>
          !chat.latestMessage.receiverHasRead &&
          chat.latestMessage.sender._id !== user.id
      );
      setNotification(unreadMessages.map((chat) => chat.latestMessage));
    } catch (error) {
      console.log(`message: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchChats();
  }, [selectedChat, fetchAgain]);

  const getChatSender = (loggedUser, users) => {
    const firstName =
      users[0]._id === loggedUser.id ? users[1].firstName : users[0].firstName;
    const lastName =
      users[0]._id === loggedUser.id ? users[1].lastName : users[0].lastName;
    const name = `${firstName} ${lastName}`;
    const picture =
      users[0]._id === loggedUser.id ? users[1].picture : users[0].picture;
    const avatar =
      picture ==
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
        ? picture
        : `${process.env.REACT_APP_AWS_URL}/${picture}`;
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

    return formatDate === currentDate ? formatTime : formatDate;
  };

  const displayChatList = (chat) => {
    if (userId) {
      if (getChatSender(user, chat.users).userId !== userId) {
        return null;
      }
    }

    if (
      notification.some(
        (notif) => notif.sender._id === getChatSender(user, chat.users).userId
      )
    ) {
      return (
        <NotificationItem
          chat={chat}
          getChatSender={getChatSender}
          formatTimestamp={formatTimestamp}
          notif={notification.find(
            (notif) =>
              notif.sender._id === getChatSender(user, chat.users).userId
          )}
        />
      );
    }

    return (
      <ChatListItem
        chat={chat}
        getChatSender={getChatSender}
        formatTimestamp={formatTimestamp}
      />
    );
  };

  // Separate and sort chats into Unread and Read
  const unreadChats = chats
    .filter((chat) => notification.some((notif) => notif.chat === chat._id))
    .sort(
      (a, b) =>
        new Date(b.latestMessage.createdAt) -
        new Date(a.latestMessage.createdAt)
    );

  const readChats = chats
    .filter((chat) => !notification.some((notif) => notif.chat === chat._id))
    .sort(
      (a, b) =>
        new Date(b.latestMessage.createdAt) -
        new Date(a.latestMessage.createdAt)
    );

  // Here's where we filter the chats based on searchValue
  const filteredUnreadChats = unreadChats.filter((chat) => {
    const sender = getChatSender(user, chat.users);
    if (!sender || typeof sender.name !== "string") {
      console.error("Invalid sender:", sender, "for chat:", chat);
      return false;
    }
    return sender.name
      .toLowerCase()
      .includes((searchValue || "").toLowerCase());
  });

  const filteredReadChats = readChats.filter((chat) => {
    const sender = getChatSender(user, chat.users);
    if (!sender || typeof sender.name !== "string") {
      console.error("Invalid sender:", sender, "for chat:", chat);
      return false;
    }
    return sender.name
      .toLowerCase()
      .includes((searchValue || "").toLowerCase());
  });

  // console.log("Notifications:", notification);
  // console.log("unreadchats", unreadChats);
  // console.log("readchats", readChats);

  return (
    <div>
      {(userId
        ? filteredUnreadChats.some(
            (chat) =>
              getChatSender(user, chat.users).userId === userId &&
              notification.some(
                (notif) =>
                  notif.sender._id === getChatSender(user, chat.users).userId &&
                  notif.receiverHasRead === false
              )
          )
        : filteredUnreadChats.length > 0) && (
        <>
          <div className="tw-mx-4 tw-mt-4 tw-text-white">Unread</div>
          <div className="tw-mx-4 tw-mb-4 tw-flex tw-border-b tw-border-white"></div>
          {filteredUnreadChats.map((chat) => displayChatList(chat))}
        </>
      )}
      {filteredReadChats && filteredReadChats.length > 0 && (
        <>
          <div className="tw-mx-4 tw-mt-4 tw-text-white">Read</div>
          <div className="tw-mx-4 tw-mb-4 tw-flex tw-border-b tw-border-white"></div>
          {filteredReadChats.map((chat) => displayChatList(chat))}
        </>
      )}
    </div>
  );
}
