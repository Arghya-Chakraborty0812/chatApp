import React, { useEffect, useRef, useState } from 'react'
import { MdAttachFile, MdSend } from 'react-icons/md'
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { baseUrl } from '../config/AxiosHelper.js';
import { Stomp } from '@stomp/stompjs';
import { toast } from 'react-toastify';
import { getMessages } from '../services/RoomService.js';
import { timeAgo } from '../config/helper.js';




export default function ChatPage() {
    const {roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser} = useChatContext();
    
    const navigate = useNavigate();
    useEffect(() => {
        if(!connected){
            navigate("/");
        }

    },[connected, roomId, currentUser]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);

    //purane message load karna
    useEffect(() => {
        async function loadMessages(){
            try {
                const messages = await getMessages(roomId);
                
                setMessages(messages);
            } catch (error) {
                
            }

        }
        if(connected){
            loadMessages();
        }
        
    }, [])

    //scroll-down
    useEffect(() => {
        if(chatBoxRef.current){
            chatBoxRef.current.scroll({
                top : chatBoxRef.current.scrollHeight,
                behavior : 'smooth'
            })
        }
    }, [messages])

    //subscribe
    useEffect(() => {
        const connectWebSocket = () => {
            //SockJs
            const sock = new SockJS(`${baseUrl}/chat`)
            const client = Stomp.over(sock);

            client.connect({}, () => {

                setStompClient(client);
                toast.success("WebSocket connected successfully");
                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    console.log("Received message: ", message);
                    const newMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
            })
        };
        if(connected){
            connectWebSocket();
        }
        
    },[roomId])

    //send message handle
    const sendMessage = async() => {
        if(stompClient && connected && input.trim()){
            console.log(input)
        }
        const message = {
            content: input,
            sender: currentUser,
            roomId: roomId,
            timestamp: new Date().toISOString() // ✅ FIX
        }
        stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message)); 
        setInput('');
    }

    //handle logout

    function handleLogout(){
        stompClient.disconnect();
        setConnected(false);
        setRoomId("");
        setCurrentUser("");
        navigate("/");
    }
    
  return (
    <div>
        {/* Header portion */}
     <header className='dark:border-gray-700 fixed w-full border dark:bg-gray-900 py-5 shadow flex justify-around items-center'>
        {/* room name container */}
        <div>
            <h1 className='text-0.5xl font-semibold'>Room : <span>{roomId}</span></h1>
        </div>
        {/* username container */}
        <div>
            <h1 className='text-0.5xl font-semibold'>User : <span>{currentUser}</span></h1>
        </div>
        {/* button : Leave Room */}
        <div>
            <button onClick={handleLogout} className='dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded'>
                Leave Room
            </button>
        </div>
     </header>

     <main ref={chatBoxRef} className='py-20 px-10 w-3/4 dark:bg-slate-600 mx-auto h-screen overflow-auto'>
        <div className='message_container'>
            {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}>
                    <div className={`my-2 ${message.sender === currentUser ? 'bg-green-800' : 'bg-gray-800'} p-2 max-w-xs rounded`}>
                    <div className='flex flex-row gap-2'>
                        <img className='h-10 w-10' src={"https://avatar.iran.liara.run/public/9"} alt='/'/>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-bold'>{message.sender}</p>
                            <p>{message.content}</p>
                            {/* <p>{timeAgo(message.timestamp)}</p> */}

                        </div>

                    </div>
                    
                </div>

                </div>

            ))}

        </div>
     </main>

     {/* input message container */}
     <div className='fixed bottom-2 w-full h-16 '>
        <div className='h-full pr-10 gap-4 flex items-center justify-between w-2/3 mx-auto dark:bg-gray-900 rounded-full'>
            <input type='text' onKeyDown={(e) => {if(e.key === "Enter"){
                sendMessage();
            }}} value={input} onChange={(e) => {setInput(e.target.value)}} placeholder='Type your message here...' className='w-full h-full dark:bg-gray-800 px-10 py-2 border dark:border-gray-800 rounded-full focus:outline-none '/>
            <div className='flex gap-1'>
            <button className='dark:bg-purple-600 px-3 py-2 rounded-full '>
                <MdAttachFile size={20}/>
            </button>
            <button onClick={sendMessage}className='dark:bg-green-600 px-3 py-2 rounded-full '>
                <MdSend size={20}/>
            </button>
            
            </div>
            
        </div>
     </div>
    </div>
  )
}
