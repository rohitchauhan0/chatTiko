"use client"
import { generateShayari } from '@/utils/gemini'
import React, { useState } from 'react'

const Modal = ({setmodal, setMessage, sendMessage}) => {
    const [shayri, setshayri] = useState("")
    const [loading, setloading] = useState(false)
    const handleGenerate = async() => {
        setloading(true)
            try {
                const prompt = `Please generate a beautiful and rhyming shayari for my crush, expressing deep love and admiration. It should be heartwarming, romantic, and bring a bright smile to her face. Make it magical and unforgettable! only max 7 to 8 lines and do not add any other words and special characters and also use emojis with it`

                const response = await generateShayari.sendMessage(prompt);
                const data = await response.response?.text();
                setshayri(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            setloading(false)
    }
  return (
    <div className=' fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center backdrop-blur-lg'>
            <div className='bg-[#353648] p-4 rounded-lg w-96 min-h-96 flex items-center justify-center flex-col space-y-5'>
                {
                    loading ? (
                        <div className='w-full h-full flex items-center justify-center'>
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <p className='text-lg text-gray-400 text-center'>{shayri}</p>
                    )
                }
                <button className='bg-[#5A65CA] cursor-pointer hover:bg-[#5a65cacf] text-white font-bold py-3 px-10 rounded' onClick={handleGenerate}>{shayri ? "Generate Again" : "Generate Shayari"}</button>
                {
                    shayri && (
                        <button className='bg-green-500 cursor-pointer hover:bg-green-600 text-white font-bold py-3 px-10 rounded' onClick={() => {
                            setMessage(shayri)
                            sendMessage()
                            setmodal(false)
                        }}>Send Shayari</button>
                    )
                }
            </div>
    </div>
  )
}

export default Modal