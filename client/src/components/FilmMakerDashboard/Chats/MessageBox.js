import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import avatarDemo from "../../../images/avatarDefault.jpeg";

let socket, selectedChatCompare;
export default function MessageBox({ chat, senderName }) {
  const { user } = useSelector((user) => ({ ...user }));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

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
    if (!chat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/message/${chat._id}`,
        config
      );
      setMessages(data);
      socket.emit("join chat", user.id, chat._id);
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  const typingHandler = (e) => {
    if (!socketConnected) return;
    setNewMessage(e.target.value);
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
          chatId: chat._id,
          content: newMessage,
        },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };
  useEffect(() => {
    socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chat;
  }, [chat]);

  useEffect(() => {
    console.log("selectchat", selectedChatCompare);

    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || //if this chat is not selected or does not match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  console.log("new msg", messages);

  return (
    <>
      <div className="tw-flex tw-h-12 tw-justify-center tw-rounded-full tw-bg-[#1E0039]">
        <span className="tw-self-center tw-text-xl tw-text-white">
          {chat
            ? `Message exchange with ${senderName}`
            : "Select a conversation to display"}
        </span>
      </div>

      <div className="tw-h-5/6 tw-overflow-y-auto ">
        {/* in come message */}

        {messages?.map((message) => (
          <div
            className={`tw-m-4 tw-flex ${
              isLoggedUser(message.sender) ? "tw-flex-row-reverse" : ""
            }`}
          >
            <img
              className="tw-h-12 tw-w-12 tw-flex-none tw-rounded-lg"
              src={`${process.env.REACT_APP_AWS_URL}/${message.sender.picture}`}
              alt="profile image"
            />
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
                className={`tw-w-fit tw-max-w-2xl tw-rounded-full tw-border-2  tw-py-2 tw-px-8 tw-text-lg tw-text-white ${
                  isLoggedUser(message.sender)
                    ? "tw-justify-self-end tw-bg-[#1E0039]"
                    : "tw-bg-[#581396]"
                }`}
              >
                {message.content}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="tw-relative tw-flex tw-items-center tw-rounded-lg">
          <textarea
            value={newMessage}
            onChange={typingHandler}
            className="tw-block tw-w-full tw-self-center tw-rounded-lg tw-border tw-border-gray-100/50 tw-bg-gray-500/50 tw-px-3 tw-pt-2 tw-text-base tw-text-white placeholder:tw-text-white focus:tw-border-gray-100 focus:tw-ring-gray-100"
            placeholder="Your message..."
          ></textarea>
          <button
            onClick={sendMessage}
            type="submit"
            className="tw-absolute tw-inset-y-0 tw-right-0 tw-cursor-pointer tw-justify-center tw-bg-white/0 tw-p-2 tw-text-[#1E0039] hover:tw-scale-125 hover:tw-text-blue-200"
          >
            <svg
              aria-hidden="true"
              className="tw-h-8 tw-w-8 tw-rotate-45"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
