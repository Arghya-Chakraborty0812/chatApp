import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createRoomApi, joinChatApi } from '../services/RoomService';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { baseUrl } from '../config/AxiosHelper';

export default function JoinCreateChat() {

    const [detail, setDetail] = useState({
        username: "",
        roomId: "",
    });

    const [selectedAvatar, setSelectedAvatar] = useState("");

    const [loadingType, setLoadingType] = useState(null);
// values: "join" | "create" | null

    const { roomId, currentUser, setRoomId, setCurrentUser, setConnected } = useChatContext();
    const navigate = useNavigate();

    function handleInputFormChange(event){
        setDetail({
            ...detail,
            [event.target.name]: event.target.value
        });
    }

    function validateForm(){
        if(detail.username === "" || detail.roomId === ""){
            toast.error("Please fill all the fields");
            return false;
        }

        if(selectedAvatar === ""){
            toast.error("Please select an avatar");
            return false;
        }

        return true;
    }

    async function saveUser(){
        await axios.post(`${baseUrl}/api/users`, {
            username: detail.username,
            avatar: selectedAvatar
        });
    }

    async function joinChat(){
        if(validateForm()){
           try{
            setLoadingType("join");   // START LOADER

            await saveUser();

            const room = await joinChatApi(detail.roomId);
            toast.success("Room joined successfully");

            setRoomId(room.roomId);
            setCurrentUser(detail.username);
            setConnected(true);

            navigate("/chat"); 

           }catch(error){
            console.log(error);
            toast.error("Error joining room");
           }
           finally{
            setLoadingType(null);  // STOP LOADER
           }
        }
    }

    async function createRoom(){
        if(validateForm()){
           try{
            setLoadingType("create")  // START LOADER

            await saveUser();

            const response = await createRoomApi(detail.roomId);
            toast.success("Room created successfully");

            setRoomId(response.roomId);
            setCurrentUser(detail.username);
            setConnected(true);

            navigate("/chat"); 
           }
           catch(error){
            console.log(error);
            toast.error("Error creating room");
           }
           finally{
            setLoadingType(null);  // STOP LOADER
           }
        }
    }
    
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='p-10 dark:border-gray-700 border w-full max-w-md flex flex-col gap-4 rounded dark:bg-gray-900 shadow'>
        
        <h1 className='text-2xl font-semibold text-center'>
            Join Room / Create Room ..
        </h1>

        <div>
            <label htmlFor='name' className='block font-medium mb-2'>
                Your name
            </label>
            <input 
                type='text'
                id='name'
                name="username"
                value={detail.username}
                onChange={handleInputFormChange}
                placeholder='Enter your name'
                className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
        </div>

        <div>
            <label htmlFor='room' className='block font-medium mb-2'>
                Room ID / New Room ID
            </label>
            <input 
                type='text'
                name="roomId"
                value={detail.roomId}
                onChange={handleInputFormChange}
                placeholder='Enter RoomId'
                id='room'
                className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
        </div>

        {/* Avatar Selection */}
        <div>
            <label className='block font-medium mb-2'>
                Select Avatar
            </label>

            <div className='flex gap-3 flex-wrap'>
                {[
                  "https://randomuser.me/api/portraits/men/1.jpg",
                   "https://randomuser.me/api/portraits/men/2.jpg",
                   "https://randomuser.me/api/portraits/women/1.jpg",
                   "https://randomuser.me/api/portraits/women/2.jpg"
                ].map((avatar, index) => (
                    <img
                        key={index}
                        src={avatar}
                        alt="avatar"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`h-14 w-14 rounded-full cursor-pointer border-4 ${
                            selectedAvatar === avatar
                                ? "border-green-500"
                                : "border-transparent"
                        }`}
                    />
                ))}
            </div>
        </div>

        <div className='flex justify-center gap-2'>

{/* Join Button */}
<button 
    disabled={loadingType !== null}
    onClick={joinChat}
    className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 min-w-[130px]
    ${loadingType === "join"
        ? "bg-gray-400 cursor-not-allowed"
        : "dark:bg-blue-500 hover:dark:bg-blue-800"}
    `}
>
    {loadingType === "join" ? (
        <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Joining...
        </>
    ) : (
        "Join Room"
    )}
</button>

{/* Create Button */}
<button 
    disabled={loadingType !== null}
    onClick={createRoom}
    className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 min-w-[130px]
    ${loadingType === "create"
        ? "bg-gray-400 cursor-not-allowed"
        : "dark:bg-orange-500 hover:dark:bg-orange-800"}
    `}
>
    {loadingType === "create" ? (
        <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating...
        </>
    ) : (
        "Create Room"
    )}
</button>

</div>
       
      </div>
    </div>
  )
}