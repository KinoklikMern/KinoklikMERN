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
  const [loading, setLoading] = useState(true);

  // manage the fetched user's details
  const [fetchedUser, setFetchedUser] = useState(null);

  const onlineUsers = useSelector((state) => state.onlineUsers);

  // Fetch a user by their ID
  const fetchUserById = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
        config
      );
      setFetchedUser(data);
      console.log("userdata", data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // initiate a chat with a user given their ID
  const initiateChatWithUser = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/chat`,
        {
          userId: id,
          chatName: `${fetchedUser.firstName} ${fetchedUser.lastName}`,
        },
        config
      );
      console.log("data", data);
      if (data._id) {
        fetchChats();
        setSelectedChat(data);
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };

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
          (b.latestMessage
            ? new Date(b.latestMessage.createdAt)
            : new Date(0)) -
          (a.latestMessage ? new Date(a.latestMessage.createdAt) : new Date(0))
      );
      setChats(sortedChats);
      setLoading(false);
      console.log("Fetched and sorted chats:", sortedChats);

      const unreadMessages = data.filter((chat) => {
        if (!chat.latestMessage) return false; // Skip chats without any messages
        return (
          !chat.latestMessage.receiverHasRead &&
          chat.latestMessage.sender._id !== user.id
        );
      });
      setNotification(unreadMessages.map((chat) => chat.latestMessage));
    } catch (error) {
      console.log(`message: ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  useEffect(() => {
    if (userId) {
      const existingChat = chats.find((chat) =>
        chat.users.some((u) => u._id === userId)
      );

      if (existingChat) {
        setSelectedChat(existingChat);
      } else {
        fetchUserById(userId).then(() => {
          initiateChatWithUser(userId);
        });
      }
    }
  }, [userId, chats]);

  // determine and return the chat sender
  const getChatSender = (loggedUser, users) => {
    const firstName =
      users[0]._id === loggedUser.id ? users[1].firstName : users[0].firstName;
    const lastName =
      users[0]._id === loggedUser.id ? users[1].lastName : users[0].lastName;
    const name = `${firstName} ${lastName}`;
    const picture =
      users[0]._id === loggedUser.id ? users[1].picture : users[0].picture;
    const avatar =
      picture ===
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
        ? picture
        : `${process.env.REACT_APP_AWS_URL}/${picture}`;
    const userId = users[0]._id === loggedUser.id ? users[1]._id : users[0]._id;

    const type = users[0]._id === loggedUser.id ? users[1].role : users[0].role;

    return { name, avatar, userId, type };
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
    // Filtering Chats by userId
    if (userId) {
      if (getChatSender(user, chat.users).userId !== userId) {
        return null;
      }
    }

    // Get the chat sender information
    const senderInfo = getChatSender(user, chat.users);

    // Check if the sender is online by referencing the `onlineUsers` state
    // const isSenderOnline = onlineUsers[senderInfo.userId] === true;
    const isSenderOnline = !!onlineUsers[senderInfo.userId];

    // Check if the Chat has a Notification
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

    // Display as Regular Chat
    return (
      <ChatListItem
        chat={chat}
        getChatSender={getChatSender}
        formatTimestamp={formatTimestamp}
        isOnline={isSenderOnline} // Pass the online status to the ChatListItem
      />
    );
  };

  // Separate and sort chats into Unread and Read
  const unreadChats = chats
    .filter((chat) => notification.some((notif) => notif.chat === chat._id))
    .sort((a, b) => {
      const bDate = b.latestMessage?.createdAt
        ? new Date(b.latestMessage.createdAt)
        : new Date(0);
      const aDate = a.latestMessage?.createdAt
        ? new Date(a.latestMessage.createdAt)
        : new Date(0);
      return bDate - aDate;
    });

  const readChats = chats
    .filter((chat) => !notification.some((notif) => notif.chat === chat._id))
    .sort((a, b) => {
      const bDate = b.latestMessage?.createdAt
        ? new Date(b.latestMessage.createdAt)
        : new Date(0);
      const aDate = a.latestMessage?.createdAt
        ? new Date(a.latestMessage.createdAt)
        : new Date(0);
      return bDate - aDate;
    });

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
  // console.log("filteredReadChats", filteredReadChats);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : filteredUnreadChats.length === 0 && filteredReadChats.length === 0 ? (
        <div className="tw-mx-4 tw-mt-4 tw-text-center tw-text-white">
          No conversations to display
        </div>
      ) : (
        <>
          {(userId
            ? filteredUnreadChats.some(
                (chat) =>
                  getChatSender(user, chat.users).userId === userId &&
                  notification.some(
                    (notif) =>
                      notif.sender._id ===
                        getChatSender(user, chat.users).userId &&
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
          {filteredReadChats.length > 0 && (
            <>
              {(userId
                ? filteredReadChats.some(
                    (chat) =>
                      getChatSender(user, chat.users).userId === userId &&
                      chat.latestMessage
                  )
                : true) && (
                <>
                  <div className="tw-mx-4 tw-mt-4 tw-text-white">Read</div>
                  <div className="tw-mx-4 tw-mb-4 tw-flex tw-border-b tw-border-white"></div>
                </>
              )}

              {filteredReadChats.map((chat) => displayChatList(chat))}
            </>
          )}
        </>
      )}
    </div>
  );
}
