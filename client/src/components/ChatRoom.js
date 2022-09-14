import React, { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatContext from "../context/ChatProvider";

const ChatRoom = ({ socket, username, room }) => {
    // const [currentMessage, setCurrentMessage] = useState("");
    // const [messageList, setMessageList] = useState([]);

    const { currentMessage, messageList, setCurrentMessage, setMessageList } = useContext(ChatContext)

    const style = {
        backgroundColor: "white",
        borderTop: "solid black",
        borderWidth: "1px",
        // textAlign: "center",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "50px",
        width: "100%"
    };


    const wrapperDiv = {
        display: 'block',
        height: '50px',
        width: '100%',
    }

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            {/* <div className="chat-header">
                <p>Live Chat</p>
            </div> */}
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "you" : "other"}
                                key={index}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer" style={style}>
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={() => sendMessage()} >&#9658;</button>
            </div>
            <div style={wrapperDiv}></div>
        </div>
    );
}

export default ChatRoom