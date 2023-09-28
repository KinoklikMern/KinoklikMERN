import React, { createContext, useContext, useEffect, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    return (
        <ChatContext.Provider value={({
            selectedChat,
            setSelectedChat,
            notification,
            setNotification,
        })}>
            {children}
        </ChatContext.Provider>
    )
}


export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;