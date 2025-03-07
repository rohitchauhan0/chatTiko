"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoChatbox } from "react-icons/io5";

const Page = () => {
  const router = useRouter()
  const [roomId, setroomId] = useState("")
  const handleCreateRoom = () => {
    const newRoom = `room-${Math.random().toString(36).substring(7)}`;
    router.push(`/room/${newRoom}`);
  };
  return (
    <div className=' lg:min-h-screen h-[90vh] w-full flex items-center flex-col space-y-7 justify-center bg-[#353648]'>
      <div className='flex flex-col items-center justify-center'>
        <IoChatbox size={80} className=' animate-bounce text-green-500' />
        <h2 className='text-5xl bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 text-transparent bg-clip-text font-bold'>ChatTiko</h2>
      </div>
      <p className='text-2xl text-gray-400 text-center'>Connect Freely, Chat Effortlessly - No Names, Just Conversations!</p>

        <button onClick={handleCreateRoom} className='bg-[#5A65CA] cursor-pointer hover:bg-[#5a65cad5] text-white font-bold py-3 px-10 rounded'>
          Create Room
        </button>
      <div className='flex flex-col items-center justify-center space-y-5'>
        <h2 className='text-2xl text-gray-400'>Join a Room</h2>
        <input type="text" onChange={(e) => setroomId(e.target.value)} className='bg-gray-700 text-white py-3 px-10 rounded' placeholder='Room ID' />
        <button onClick={() => router.push(`/room/${roomId}`)} className='bg-[#5A65CA] cursor-pointer hover:bg-[#5a65cad2] text-white font-bold py-3 px-10 rounded'>
          Join Room
        </button>
      </div>

    </div>
  )
}

export default Page