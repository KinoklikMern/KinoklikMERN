/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { ChatState } from "../../../context/ChatProvider";
import { NotificationContext } from "../../../context/NotificationContext";
import { useTranslation } from "react-i18next";

let socket, selectedChatCompare;
export default function MessageBox({
  fetchAgain,
  setFetchAgain,
  userId,
  onBackToChatList,
}) {
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

  // console.log("select", selectedChat);

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

  // console.log("messages", messages);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div className='tw-invisible tw-flex tw-h-12 tw-justify-center tw-rounded-full tw-bg-[#1E0039] md:tw-visible'>
        <span className='tw-self-center tw-text-white md:tw-text-base lg:tw-text-lg'>
          {selectedChat
            ? `Message exchange with ${selectedChat.chatName}`
            : t("Select a conversation to display")}
        </span>
      </div>

      <div className='no-scrollbar tw-flex tw-h-5/6 tw-flex-col tw-overflow-auto'>
        {/* in come message */}

        <button
          onClick={onBackToChatList}
          className='tw-bg-transparent tw-text-midnight hover:tw-text-gray-600 md:tw-hidden'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20'
            width='20'
            viewBox='0 0 512 512'
          >
            <path d='M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z' />
          </svg>
        </button>

        {messages?.map((message) => (
          <div
            key={message._id}
            className={`tw-m-4 tw-flex ${
              isLoggedUser(message.sender) ? "tw-flex-row-reverse" : ""
            }`}
          >
            <div className='tw-relative tw-m-1 tw-h-12 tw-w-12 tw-flex-none tw-overflow-hidden tw-rounded-lg'>
              <img
                className='tw-h-12 tw-w-12 tw-flex-none tw-rounded-full tw-object-cover'
                src={
                  message.sender.picture ===
                  "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
                    ? message.sender.picture
                    : `${process.env.REACT_APP_AWS_URL}/${message.sender.picture}`
                }
                alt='profile img'
              />

              <div className='tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-w-full tw-rounded-full tw-bg-black/50 tw-text-center tw-text-xxs tw-text-white'>
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
      <div className='tw-relative tw-flex tw-items-center tw-rounded-lg'>
        <input
          value={newMessage}
          onChange={typingHandler}
          onKeyDown={handleKeyDown}
          className='tw-w-full tw-rounded-lg tw-border tw-border-gray-100/50 tw-bg-gray-500/50 tw-px-2 tw-py-3 tw-text-base tw-text-midnight placeholder:tw-text-white focus:tw-border-gray-100 focus:tw-ring-gray-100'
          placeholder={t("Your message...")}
        />
        <button
          onClick={sendMessage}
          type='submit'
          className='tw-absolute tw-inset-y-0 tw-right-0 tw-cursor-pointer tw-justify-center tw-bg-white/0 tw-p-2 tw-text-[#1E0039] hover:tw-text-blue-200'
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
    </>
  );
}
