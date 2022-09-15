import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import io from "socket.io-client";
import TopNav from './TopNav'
import "../Chat.css";
import ChatRoom from "./ChatRoom";
import { GET_ORDER_USER, GET_OWNORDER_DELIVERY } from "../api/apiURL";
import ChatContext from "../context/ChatProvider";


//const socket = io.connect("http://localhost:3001");
const socket = io.connect("http://140.118.122.148:30312");



const getCookie = (name) => {
    const strCookie = document.cookie;
    const arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] === name) return arr[1];
    }
    return "";
}

const Chat = () => {
    let url = GET_ORDER_USER

    const useraccount = getCookie("account")
    const userRole = getCookie("role")

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const { isJoinRoom, setIsJoinRoom } = useContext(ChatContext)


    const joinRoom = (username, room) => {
        // console.log(isJoinRoom)
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            // setShowChat(true);
            setIsJoinRoom(true);
        }
    };

    if (userRole === "delivery") {
        url = GET_OWNORDER_DELIVERY
    } else {
        url = GET_ORDER_USER
    }


    useEffect(() => {
        axios.post(url,
            JSON.stringify({ consumer: useraccount, account: useraccount }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                // console.log(response.data)
                setUsername(useraccount)
                setRoom(response.data.msg[0].Orderid)
                if (useraccount !== "" && !isJoinRoom) {
                    joinRoom(useraccount, response.data.msg[0].Orderid)
                }
            })
            .catch((error) => console.log(error))
    }, []);


    return (
        <div className="Chat">
            <TopNav />
            {isJoinRoom
                ? <ChatRoom socket={socket} username={username} room={room} />
                : <></>}
        </div>
    );
}

export default Chat
