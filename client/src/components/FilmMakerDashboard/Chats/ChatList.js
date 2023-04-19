import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider.js";
import NotificationItem from "./NotificationItem.js";
import ChatListItem from "./ChatListItem.js";
import ChatItem from "./ChatItem.js";
// import avatarDefault from "../../../images/avatarDefault.jpeg";

export default function ChatList({ fetchAgain }) {
  const { user } = useSelector((user) => ({ ...user }));
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [chats, setChats] = useState();
  // const [chatlist, setChatList] = useState([]);

  // const displayChatlist = ()=>{

  // }

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
      setNotification([]);
      data.map((chat) => {
        // console.log("33", chat);
        //check if notification is null and if the sender is not same as logged user
        if (
          !chat.latestMessage.receiverHasRead &&
          chat.latestMessage.sender._id != user.id
        ) {
          setNotification((notification) => [
            chat.latestMessage,
            ...notification,
          ]);
        }
      });
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

    return formatDate == currentDate ? formatTime : formatDate;
  };
  const displayChatList = (chat) => {
    console.log("c", chat);
    console.log("notif", notification);

    if (notification.length != 0) {
      for (let i in notification) {
        // console.log("2", notification[i]);
        if (
          notification[i].sender._id == getChatSender(user, chat.users).userId
        ) {
          return (
            <NotificationItem
              chat={chat}
              getChatSender={getChatSender}
              formatTimestamp={formatTimestamp}
              notif={notification[i]}
            />
          );
        }
      }
    }
    return (
      <ChatListItem
        chat={chat}
        getChatSender={getChatSender}
        formatTimestamp={formatTimestamp}
      />
    );
  };


  
  return chats?.map((chat) => displayChatList(chat));
}
