package com.arghya.chat_app_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.arghya.chat_app_backend.config.AppConstants;
import com.arghya.chat_app_backend.entities.Message;
import com.arghya.chat_app_backend.payload.MessageRequest;
import com.arghya.chat_app_backend.repositories.RoomRepository;
import com.arghya.chat_app_backend.services.ChatService;

@RestController
@CrossOrigin(origins = AppConstants.FRONT_END_BASE_URL) // Allow requests from the React frontend
public class ChatController {
   

    @Autowired
    private ChatService chatService;

    //for sending and receiving messages
    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}") //app/sendMessage/<roomId>
    public Message sendMessage(@DestinationVariable String roomId,@RequestBody MessageRequest request){
        return chatService.sendMessage(roomId, request);
    }
}
