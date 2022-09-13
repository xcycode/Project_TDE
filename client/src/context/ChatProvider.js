import { createContext, useState } from 'react'
import io from "socket.io-client";

const ChatContext = createContext({})

export const ChatProvider = ({ children }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [isJoinRoom, setIsJoinRoom] = useState(false)

    const ChatReset = () => {
        setCurrentMessage("")
        setMessageList([])
        console.log("reset chat")
    }


    return (
        <ChatContext.Provider value={{ currentMessage, messageList, isJoinRoom, setCurrentMessage, setMessageList, setIsJoinRoom, ChatReset }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext