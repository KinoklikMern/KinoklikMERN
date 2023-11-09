import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  //   const socket = io(process.env.REACT_APP_BACKEND_URL);
  const socket = useMemo(
    () =>
      io(process.env.REACT_APP_BACKEND_URL, {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
      }),
    []
  );
  useEffect(() => {
    // Listen for the 'userOnline' socket event and dispatch a Redux action
    socket.on("userOnline", (userId) => {
      console.log("userOnline event received with userId:", userId);
      dispatch({ type: "USER_ONLINE", payload: { userId } });
    });

    // Listen for the 'userOffline' socket event and dispatch a Redux action
    socket.on("userOffline", (userId) => {
      console.log("userOffline event received with userId:", userId);
      dispatch({ type: "USER_OFFLINE", payload: { userId } });
    });

    // Cleanup on unmount
    return () => {
      socket.off("userOnline");
      socket.off("userOffline");
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
