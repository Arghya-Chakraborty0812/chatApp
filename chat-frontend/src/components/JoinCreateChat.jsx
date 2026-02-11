import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createRoomApi, joinChatApi } from '../services/RoomService';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';

export default function JoinCreateChat() {

    const [detail, setDetail] = useState({
        username: "",
        roomId: "",
    })
    const { roomId, currentUser, setRoomId, setCurrentUser, setConnected } = useChatContext();

    const navigate = useNavigate();
    function handleInputFormChange(event){
        setDetail({
            ...detail,
            [event.target.name]: event.target.value
        })
    }

    function validateForm(){
        if(detail.username === "" || detail.roomId === ""){
            toast.error("Please fill all the fields");
            return false;
        }
        return true;
    }

    async function joinChat(){
        if(validateForm()){
           try{
            const room = await joinChatApi(detail.roomId);
            toast.success("Room joined successfully");
            setRoomId(room.roomId);
            setCurrentUser(detail.username);
            setConnected(true);
            //forward to chat page ..
            navigate("/chat"); 

           }catch(error){
            console.log(error);
            toast.error("Error joining room");
           }
        }
    }

    async function createRoom(){
        if(validateForm()){
           try{
            const response = await createRoomApi(detail.roomId);
            toast.success("Room created successfully");
            console.log(response);
            setRoomId(response.roomId);
            setCurrentUser(detail.username);
            setConnected(true);
            //forward to chat page ..
            navigate("/chat"); 
           }
           catch(error){
            console.log(error);
            toast.error("Error creating room");
           }
        }
    }
    
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='p-10 dark:border-gray-700 border w-full max-w-md flex flex-col gap-4 rounded dark:bg-gray-900 shadow'>
        <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room ..</h1>
        <div>
            <label htmlFor='name' className='block font-medium mb-2'>Your name</label>
            <input type='text' id='name' onChange={handleInputFormChange} value={detail.username} name = "username" placeholder='Enter your name' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
        <div>
            <label htmlFor='name' className='block font-medium mb-2'>Room ID / New Room ID</label>
            <input type='text' name= "roomId" value={detail.roomId} onChange={handleInputFormChange} placeholder='Enter RoomId' id='name' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
        <div className='flex justify-center gap-2'>
            <button className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-lg' onClick={joinChat}>Join Room</button>
            <button className='px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-lg' onClick={createRoom}>Create Room</button>
        </div>
       
           
      </div>
    </div>
  )
}
