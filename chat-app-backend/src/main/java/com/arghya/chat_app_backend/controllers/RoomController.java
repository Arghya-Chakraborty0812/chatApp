package com.arghya.chat_app_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.arghya.chat_app_backend.config.AppConstants;
import com.arghya.chat_app_backend.entities.Message;
import com.arghya.chat_app_backend.services.RoomServices;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(origins = AppConstants.FRONT_END_BASE_URL) // Allow requests from the React frontend
public class RoomController {
    @Autowired
    RoomServices roomServices;
    //create room 
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId){
        return roomServices.createRoom(roomId);
    }

    //get room : join
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId){


        return roomServices.joinRoom(roomId);
    }

    //get message of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "20") int size){
        return roomServices.getMessages(roomId, page, size);
    }
}
