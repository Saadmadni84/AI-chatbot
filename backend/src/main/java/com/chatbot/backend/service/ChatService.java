package com.chatbot.backend.service;

import com.chatbot.backend.dto.ChatRequest;
import com.chatbot.backend.dto.ChatResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ChatService {

    public ChatResponse handleMessage(ChatRequest request) {
        // TODO: Integrate with OpenAI or other LLM provider here
        // For now, return a mock response
        
        return ChatResponse.builder()
                .id(UUID.randomUUID().toString())
                .message("Hello! This is a mock response from the backend. I received your message: \"" + request.getMessage() + "\"")
                .done(true)
                .build();
    }
}
