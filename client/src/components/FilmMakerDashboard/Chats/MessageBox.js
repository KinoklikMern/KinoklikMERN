import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import avatarDemo from "../../../images/avatarDefault.jpeg";
import { ChatState } from "../../../context/ChatProvider";
import { NotificationContext } from "../../../context/NotificationContext";
import { useTranslation } from "react-i18next";

let socket, selectedChatCompare;
export default function MessageBox({ fetchAgain, setFetchAgain, userId }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const { incrementMessage, setUserInfo } = useContext(NotificationContext);

  const isLoggedUser = (sender) => {
    return sender._id === user.id ? true : false;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const currentDate = new Date().toLocaleDateString();
    const formatDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formatTime = date.toLocaleTimeString("en-US", {
      hour12: false,
      timeStyle: "short",
    });
    return `${formatDate} ${formatTime}`;
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  console.log("select", selectedChat);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;
  };

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/message`,
        {
          chatId: selectedChat._id,
          content: newMessage,
        },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);

      // Yeming added
      incrementMessage();
      const recipient = selectedChat.users.find((u) => u._id !== user.id);
      const recipientId = recipient?._id;

      if (recipientId) {
        setUserInfo(recipientId);
      }
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };
  useEffect(() => {
    socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    // console.log("selectchat", selectedChatCompare);
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || //if this chat is not selected or does not match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // // Check if the new message is not sent by the logged-in user (incoming message)
        // if (newMessageRecieved.sender._id !== user.id) {
        //   incrementMessage();
        // }

        // notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          // setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
        markAsRead();
      }
    });
  });

  const markAsRead = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/message/updateMessage/${selectedChat._id}`,
        {},
        config
      );
    } catch (error) {
      console.log(`message: ${error.message}`);
    }
  };

  console.log("messages", messages);

  return (
    <>
      <div className='tw-flex tw-h-12 tw-justify-center tw-rounded-full tw-bg-[#1E0039]'>
        <span className='tw-self-center tw-text-xl tw-text-white'>
          {selectedChat
            ? `Message exchange with ${selectedChat.chatName}`
            : t("Select a conversation to display")}
        </span>
      </div>

      <div className='tw-h-5/6 tw-overflow-y-auto'>
        {/* in come message */}

        {messages?.map((message) => (
          <div
            key={message._id}
            className={`tw-m-4 tw-flex ${
              isLoggedUser(message.sender) ? "tw-flex-row-reverse" : ""
            }`}
          >
            <div className='tw-relative tw-m-1 tw-h-12 tw-w-12 tw-flex-none tw-overflow-hidden tw-rounded-lg'>
              <img
                className='tw-h-12 tw-w-12 tw-flex-none tw-rounded-lg'
                src={
                  message.sender.picture ===
                  "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
                    ? message.sender.picture
                    : `${process.env.REACT_APP_AWS_URL}/${message.sender.picture}`
                }
                alt='profile img'
              />

              <div className='tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-w-full tw-bg-black/50 tw-text-center tw-text-xxs tw-text-white'>
                {message.sender.role}
              </div>
            </div>

            <div
              className={`tw-grid tw-w-full ${
                isLoggedUser(message.sender) ? "tw-mr-4" : "tw-ml-4"
              }`}
            >
              <span
                className={`tw-text-slate-500 ${
                  isLoggedUser(message.sender) ? "tw-justify-self-end" : ""
                }`}
              >
                {formatTimestamp(message.createdAt)}
              </span>
              <span
                className={`tw-w-fit tw-max-w-2xl tw-rounded-full tw-border-2  tw-px-8 tw-py-2 tw-text-lg tw-text-white ${
                  isLoggedUser(message.sender)
                    ? "tw-justify-self-end tw-bg-[#1E0039]"
                    : "tw-bg-[#581396]"
                }`}
                dangerouslySetInnerHTML={{ __html: message.content }}
              >
                {/* {message.content} */}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className='tw-relative tw-flex tw-items-center tw-rounded-lg'>
          <textarea
            value={newMessage}
            onChange={typingHandler}
            className='tw-block tw-w-full tw-self-center tw-rounded-lg tw-border tw-border-gray-100/50 tw-bg-gray-500/50 tw-px-3 tw-pt-2 tw-text-base tw-text-white placeholder:tw-text-white focus:tw-border-gray-100 focus:tw-ring-gray-100'
            placeholder={t("Your message...")}
          ></textarea>
          <button
            onClick={sendMessage}
            type='submit'
            className='tw-absolute tw-inset-y-0 tw-right-0 tw-cursor-pointer tw-justify-center tw-bg-white/0 tw-p-2 tw-text-[#1E0039] hover:tw-scale-125 hover:tw-text-blue-200'
          >
            <svg
              aria-hidden='true'
              className='tw-h-8 tw-w-8 tw-rotate-45'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
