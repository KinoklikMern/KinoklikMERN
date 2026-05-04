import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { ChatState } from "../../../context/ChatProvider";
import { NotificationContext } from "../../../context/NotificationContext";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { addToRequests, addToChat } from "../../../api/epks";

let socket;

export default function RequestAccessModal({ close, open, user, epkId, filmmakerId, setRefresh }) {
  const [requestMsg, setRequestMsg] = useState("");
  const { notification, setNotification } = ChatState();
  const { incrementMessage, setUserInfo } = useContext(NotificationContext);
  const { t } = useTranslation();

  useEffect(() => {
    socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.emit("setup", user);
    
    return () => {
      if (socket) socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("message recieved", (newMessageRecieved) => {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
        }
      });
    }
  }, [notification, setNotification]);

  const handleSubmit = () => {
    if (requestMsg) {
      addToRequests(requestMsg, epkId, user.id).then((res) => {
        if (res) {
          addToChat(requestMsg, user, filmmakerId).then((res) => {
            if (res.status === 200) {
              incrementMessage();
              setUserInfo(filmmakerId);
              socket.emit("new message", res.data);
              
              close("request"); 
              setRefresh(true);
            }
          });
        }
      });
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-[#190033]/90 tw-backdrop-blur-md tw-p-4">
      <div className="tw-relative tw-w-full tw-max-w-md tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/30 tw-rounded-2xl tw-p-6 tw-shadow-2xl">
        
        <button 
          onClick={() => close("request")} 
          className="tw-absolute tw-top-4 tw-right-4 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-bg-black/20 hover:tw-bg-[#FF43A7] tw-text-white tw-rounded-full tw-transition-colors tw-border-none tw-cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h2 className="tw-text-white tw-text-xl tw-font-bold tw-mb-6 tw-text-center">
          {t('Please type your message to the Filmmaker EPK Owner')}
        </h2>

        <div className="tw-mb-6">
          <textarea
            value={requestMsg}
            onChange={(e) => setRequestMsg(e.target.value)}
            placeholder={t("eg. Hello Filmmaker, I’m interested to see your film EPK and possibly purchase the rights. Let’s connect and talk!")}
            className="tw-w-full tw-h-48 tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-xl tw-p-4 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7] tw-resize-none placeholder:tw-text-[#AA8894]/60"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!requestMsg.trim()}
          className="tw-w-full tw-bg-[#FF43A7] hover:tw-bg-[#ff5cac] tw-text-[#570033] tw-font-bold tw-py-3 tw-rounded-xl tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-border-none tw-cursor-pointer disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          {t('Submit')}
        </button>
      </div>
    </div>
  );
}