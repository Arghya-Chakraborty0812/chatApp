package com.arghya.chat_app_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arghya.chat_app_backend.entities.Message;
import com.arghya.chat_app_backend.entities.Room;
import com.arghya.chat_app_backend.repositories.RoomRepository;

@Service
public class RoomServices {
    @Autowired
    RoomRepository roomRepository;
    public ResponseEntity<?> createRoom(String roomId){
        if(roomRepository.findByRoomId(roomId) != null){
            //room is already there
            return ResponseEntity.badRequest().body("Room already exists");
        }
        //create a new room
        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    public ResponseEntity<?> joinRoom(String roomId){
        Room room = roomRepository.findByRoomId(roomId);
        if(room == null){
            return  ResponseEntity.badRequest().body("Room not found");

        }
        return ResponseEntity.ok(room);
    }

    public ResponseEntity<List<Message>> getMessages(String roomId, int page, int size){
        Room room = roomRepository.findByRoomId(roomId);
        if(room == null){
            return ResponseEntity.badRequest().build();
        }
        List<Message> messages = room.getMessages();
        int start = Math.max(0, messages.size() - (page + 1) * size);
        int end = Math.min(messages.size(),start + size);
        List<Message> paginatedMessages = messages.subList(start, end);
        return ResponseEntity.ok(paginatedMessages);
    }
}
