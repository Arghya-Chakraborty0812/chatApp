package com.arghya.chat_app_backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.arghya.chat_app_backend.entities.Room;


public interface RoomRepository extends MongoRepository<Room, String>{
    //get room using room id 
    Room findByRoomId(String roomId);  
}
