// Yeming added

import React, { createContext, useState, useEffect } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const initialMessageCount =
    parseInt(localStorage.getItem("messageCount"), 10) || 0;

  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(initialMessageCount);
  const [showNotification, setShowNotification] = useState(false);
  // const [filmmakerInfo, setFilmmakerInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    localStorage.setItem("messageCount", messageCount);
  }, [messageCount]);

  const incrementNotification = (incrementBy = 1) => {
    setNotificationCount((prevCount) => {
      const newCount = prevCount + incrementBy;
      return newCount;
    });
    setShowNotification(true);
  };

  const incrementMessage = (incrementBy = 1) => {
    setMessageCount((prevCount) => prevCount + incrementBy);
    setShowNotification(true);
  };

  const clearMessageCount = () => {
    setMessageCount(0);
    localStorage.removeItem("messageCount");
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationCount,
        messageCount,
        setMessageCount,
        showNotification,
        incrementNotification,
        incrementMessage,
        // filmmakerInfo,
        // setFilmmakerInfo,
        userInfo,
        setUserInfo,
        clearMessageCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
