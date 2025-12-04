package com.chatbot.backend.dto.ollama;

import com.chatbot.backend.dto.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OllamaChatRequest {
    private String model;
    private List<Message> messages;
    private boolean stream;
}
