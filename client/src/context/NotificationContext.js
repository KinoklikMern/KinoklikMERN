// Yeming added

import React, { createContext, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [filmmakerInfo, setFilmmakerInfo] = useState(null);

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

  return (
    <NotificationContext.Provider
      value={{
        notificationCount,
        messageCount,
        showNotification,
        incrementNotification,
        incrementMessage,
        filmmakerInfo,
        setFilmmakerInfo,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
