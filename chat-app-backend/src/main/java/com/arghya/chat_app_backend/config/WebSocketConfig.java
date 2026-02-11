package com.arghya.chat_app_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // Enable WebSocket message handling, backed by a message broker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // /topic/messages : client can subscribe to this topic to receive messages
        config.setApplicationDestinationPrefixes("/app"); // Set the prefix for messages that are bound for @MessageMapping-annotated methods
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
       registry.addEndpoint("/chat")  //allows clients to connect to websocket endpoint at /chat
       .setAllowedOrigins(AppConstants.FRONT_END_BASE_URL)  // Allow CORS for the frontend application
       .withSockJS(); // Enable SockJS fallback options for browsers that don’t support WebSocket 
    }
}
