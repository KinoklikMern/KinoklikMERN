import React from "react";
import { useSelector } from "react-redux";
import {ChatState} from "../../../context/ChatProvider.js"
import avatarDemo from "../../../images/avatarDefault.jpeg";


export default function ChatList({ chats, selectChatHandle }) {
  // console.log("chatlist", chats);
  const { user } = useSelector((user) => ({ ...user }));
  const {selectedChat, setSelectedChat} = ChatState();

  const getChatSender = (loggedUser, users) => {
    const firstName =
      users[0]._id === loggedUser.id ? users[1].firstName : users[0].firstName;
    const lastName =
      users[0]._id === loggedUser.id ? users[1].lastName : users[0].lastName;
    const name = `${firstName} ${lastName}`;
    const avatar =
      users[0]._id === loggedUser.id ? users[1].picture : users[0].picture;

    return { name, avatar };
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const currentDate = new Date().toLocaleDateString();
    const formatDate = date.toLocaleDateString();
    const formatTime = date.toLocaleTimeString("en-US",{hour12:false, timeStyle:"short"});

    return formatDate == currentDate ? formatTime : formatDate;
  };
  return (
    <div className="tw-my-4 tw-flex tw-flex-col tw-rounded-lg  tw-bg-gray-200 hover:tw-bg-[#581396] hover:tw-text-white">
      {chats?.map((chat) => (
        <div className="tw-flex tw-rounded-lg" onClick={()=>selectChatHandle(chat, getChatSender(user, chat.users).name)}>
          <img
            className="tw-m-2 tw-h-16 tw-w-16 tw-flex-none tw-rounded-lg"
            src={`${process.env.REACT_APP_AWS_URL}/${
              getChatSender(user, chat.users).avatar
            }`}
            alt="profile image"
          />
          <span className="tw-grow tw-self-center tw-pl-8">
            {getChatSender(user, chat.users).name}
          </span>
          <span className="tw-self-center tw-pr-4">
            {formatTimestamp(chat.updatedAt)}
          </span>
        </div>
      ))}
    </div>
  );
}
