package com.chatbot.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @NotBlank(message = "Role cannot be empty")
    private String role;
    
    @NotBlank(message = "Content cannot be empty")
    private String content;
}
