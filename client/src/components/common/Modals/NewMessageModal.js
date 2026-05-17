import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { ChatState } from "../../../context/ChatProvider";
import { NotificationContext } from "../../../context/NotificationContext";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { addToChat } from "../../../api/epks";

let socket;

export default function NewMessageModal({ close, user, userId, userFirstName, setRefresh }) {
  const { notification, setNotification } = ChatState();
  const [msg, setMsg] = useState("");
  const { t } = useTranslation();
  const { incrementMessage, setUserInfo } = useContext(NotificationContext);
  const recipientName = userFirstName || t('this user');
  const MAX_CHARS = 1000;

  const handleSubmit = () => {
    if (msg.trim().length > 0) {
      try {
        addToChat(msg, user, userId).then((res) => {
          if (res.status === 200) {
            incrementMessage();
            setUserInfo(userId);
            socket.emit("new message", res.data);
            toast.success(t("Message sent!"));
            
            setTimeout(() => close("message"), 100);
          } else {
            toast.error(t("Message could not be sent. Please try again."));
            setTimeout(() => close("message"), 100);
          }
        });
      } catch (error) {
        console.error(error.message);
        toast.error(t("Message could not be sent. Please try again."));
        setTimeout(() => close("message"), 100);
      }
    }
  };

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

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-[#190033]/90 tw-backdrop-blur-md tw-p-4">
      <div className="tw-relative tw-w-full tw-max-w-md tw-bg-[#280D41] tw-border-2 tw-border-[#FF43A7] tw-rounded-2xl tw-p-6 tw-shadow-[0_0_30px_rgba(255,67,167,0.2)]">
        
        <button 
          onClick={() => close("message")} 
          className="tw-absolute tw-top-4 tw-right-4 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-bg-black/20 hover:tw-bg-[#FF43A7] tw-text-white tw-rounded-full tw-transition-colors tw-border-none tw-cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h2 className="tw-text-white tw-text-xl tw-font-bold tw-mb-6 tw-text-center">
          {t('Reach out to')} {recipientName}
        </h2>

        <div className="tw-mb-6">
          <textarea
            value={msg}
            maxLength={MAX_CHARS}
            onChange={(e) => setMsg(e.target.value)}
            placeholder={t("Say hello, ask a question, or start a conversation...")}
           className="tw-w-full tw-h-48 tw-bg-[#190033] tw-border tw-border-[#FF43A7]/30 tw-rounded-xl tw-p-4 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7] tw-resize-none placeholder:tw-text-[#AA8894]/60"
          />
          <div className={`tw-text-right tw-text-xs tw-mt-1 ${msg.length >= MAX_CHARS ? 'tw-text-red-500' : 'tw-text-[#AA8894]'}`}>
          {msg.length} / {MAX_CHARS}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!msg.trim()}
          className="tw-w-full tw-bg-[#FF43A7] hover:tw-bg-[#ff5cac] tw-text-[#570033] tw-font-bold tw-py-3 tw-rounded-xl tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-border-none tw-cursor-pointer disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          {t('Send')}
        </button>
      </div>
    </div>
  );
}