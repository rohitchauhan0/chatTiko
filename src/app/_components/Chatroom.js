"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IoCopy, IoHeart } from 'react-icons/io5';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from "uuid";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Modal from './Modal';



const Chatroom = ({ roomId }) => {

    const socket = useMemo(() => io("https://chattiko-1.onrender.com"), []);
    // const socket = useMemo(() => io("http://localhost:3002"), []);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [userId, setUserId] = useState("");
    const scroll = useRef()
    const notificationTone = useRef(null);
    const [copy, setcopy] = useState(false);
    const [modal, setmodal] = useState(false)



    useEffect(() => {
        const id = uuidv4();
        setUserId(id);
    }, []);


    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            console.log("Connected to server");
        });
        socket.on("receive-message", (data) => {
            setChat((prev) => [...prev, data]);
            if (notificationTone.current) {
                notificationTone.current.play().catch((err) => {
                    console.error("Error playing notification tone:", err);
                });
            }
        });


        socket.on("room-users", (users) => {
            setRoomUsers(users);
        });

        socket.emit("join-room", roomId);



        return () => {
            socket.off("connect");
            socket.off("receive-message");
            socket.off("room-users");
        };
    }, [socket, roomId]);




    const sendMessage = (type = "text") => {
        if (!message.trim()) return; // Prevent sending empty messages
        const data = { roomId, message, senderId: userId };
        socket.emit("send-message", data);
        setMessage(""); // Clear input after sending
    };
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent newline in textarea
            sendMessage();
        }
    };



    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollTop = scroll.current.scrollHeight;
        }
    }, [chat]);


    
    




    return (
        <>
            <div className=' bg-[#353648] lg:h-screen h-[80vh] w-full flex items-center flex-col p-3 '>
            <audio ref={notificationTone} src="/tone.mp3" preload="auto" />
                <div className=' max-w-screen-md rounded-lg mx-auto bg-[#3F4255] w-full h-full relative overflow-hidden border-2 border-[#2A2A3C] py-20 '>
                    <div className=' absolute w-full top-0 bg-[#353543] py-2 px-7 border-b-2 border-[#2A2A3C] flex items-center justify-between'>
                        <div className=' flex items-center space-x-4'>
                            <p className=' text-sm text-gray-200'>{roomId}</p>
                            {
                                copy ? (
                                    <IoMdCheckmarkCircleOutline className=' text-green-500' size={20} />
                                ) : (
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(roomId)
                                        setcopy(true)
                                        setTimeout(() => {
                                            setcopy(false)
                                        }, 1000);
                                    }} className=' text-sm text-gray-200 '>
                                        <IoCopy size={20} />
                                    </button>
                                )
                            }
                        </div>
                        <button className=' bg-[#5A65CA] cursor-pointer hover:bg-[#5a65cae9] text-white font-bold py-2 px-10 rounded' onClick={() => setmodal(true)}>Use AI</button>
                    </div>

                    <div className=' flex-1  h-full w-full px-4' >
                        {/* chat section  */}
                        <div className=' w-full h-full overflow-y-scroll flex-col flex space-y-4  ' ref={scroll} id='chat'>
                            {chat.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center  ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
                                >
                                    <div className=' flex items-center space-x-2'>
                                    {msg.senderId !== userId && (
                                      <div className=' bg-gray-300 rounded-full p-1'>
                                         <IoHeart className=' text-red-500' size={20}  />
                                      </div>
                                    )}
                                    <div
                                        className={`py-2 px-4 max-w-xs rounded-lg ${msg.senderId === userId ? "bg-[#5A65CA] text-white" : "bg-[#343547] text-white"}`}
                                    >
                                        {msg.message}

                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className=' absolute w-full bottom-0  py-2 px-7  border-[#2A2A3C] flex items-center justify-between space-x-5'>
                        <input onKeyDown={handleKeyDown} value={message} type="text" onChange={(e) => setMessage(e.target.value)} className=' bg-gray-700 text-white py-3 px-3 rounded w-full border-2 border-[#2A2A3C]' placeholder='Message' />
                        <button onClick={() => sendMessage("text", message)} className='bg-[#5A65CA] cursor-pointer hover:bg-[#5a65cae2] text-white font-bold py-3 px-10 rounded'>Send</button>
                    </div>

                </div>
            </div>
            {
                modal && (
                    <Modal setmodal={setmodal} setMessage={setMessage} sendMessage={sendMessage} />
                )
            }
        </>
    )
}

export default Chatroom