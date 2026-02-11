package com.arghya.chat_app_backend.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="rooms")
public class Room {
    @Id
    private String id; //MongoDB unique id
    private String roomId; //user will specify this
    private List<Message> messages = new ArrayList<>();
}
