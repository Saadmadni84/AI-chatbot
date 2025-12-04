package com.chatbot.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRequest {
    
    private String sessionId;
    
    @NotBlank(message = "Message cannot be empty")
    private String message;
    
    @Valid
    private List<Message> history;
}
