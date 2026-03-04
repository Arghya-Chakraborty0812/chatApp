package com.arghya.chat_app_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arghya.chat_app_backend.config.AppConstants;
import com.arghya.chat_app_backend.entities.User;
import com.arghya.chat_app_backend.repositories.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = AppConstants.FRONT_END_BASE_URL)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}