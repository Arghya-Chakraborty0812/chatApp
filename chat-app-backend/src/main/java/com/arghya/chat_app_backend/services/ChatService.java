package com.arghya.chat_app_backend.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arghya.chat_app_backend.entities.Message;
import com.arghya.chat_app_backend.entities.Room;
import com.arghya.chat_app_backend.entities.User;
import com.arghya.chat_app_backend.payload.MessageRequest;
import com.arghya.chat_app_backend.repositories.RoomRepository;
import com.arghya.chat_app_backend.repositories.UserRepository;

@Service
public class ChatService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Message sendMessage(String roomId, MessageRequest request) {

        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            throw new RuntimeException("Room not found");
        }

       // Fetch existing user or create a new one
User user = userRepository.findAllByUsername(request.getSender())
.stream()
.findFirst() // pick the first existing user if multiple exist
.orElseGet(() -> {
    User newUser = new User();
    newUser.setUsername(request.getSender());
    // Generate a random avatar
    int id = (int) (Math.random() * 100);
    newUser.setAvatar("https://randomuser.me/api/portraits/men/" + id + ".jpg");
    return userRepository.save(newUser);
});
        // Create message
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());

        // ✅ Convert frontend ISO string to LocalDateTime
        LocalDateTime timestamp = LocalDateTime.parse(request.getTimestamp(), DateTimeFormatter.ISO_DATE_TIME);
        message.setTimestamp(timestamp);

        message.setAvatar(user.getAvatar());

        // Add message to room
        room.getMessages().add(message);
        roomRepository.save(room);

        return message;
    }
}