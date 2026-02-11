package com.arghya.chat_app_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arghya.chat_app_backend.entities.Message;
import com.arghya.chat_app_backend.entities.Room;
import com.arghya.chat_app_backend.payload.MessageRequest;
import com.arghya.chat_app_backend.repositories.RoomRepository;

@Service
public class ChatService {
     @Autowired
    private RoomRepository roomRepository;
    public Message sendMessage(String roomId, MessageRequest request) {
       Room room = roomRepository.findByRoomId(request.getRoomId());
       Message message = new Message();
       message.setContent(request.getContent());
       message.setSender(request.getSender());
       message.setTimestamp(request.getMessageTime());
       if(room != null){
        room.getMessages().add(message);
        roomRepository.save(room);
       }
       else{
        throw new RuntimeException("Room not found");
       }
       return message;
    }
    
}
