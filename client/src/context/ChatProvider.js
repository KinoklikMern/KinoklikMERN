import React, { createContext, useContext, useEffect, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    return (
        <ChatContext.Provider value={({
            selectedChat,
            setSelectedChat,
        })}>
            {children}
        </ChatContext.Provider>
    )
}


export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;