package com.arghya.chat_app_backend.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.arghya.chat_app_backend.entities.User;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAllByUsername(String username); // ✅ returns all matching users
}