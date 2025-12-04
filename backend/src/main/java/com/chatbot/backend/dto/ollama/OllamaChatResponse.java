package com.chatbot.backend.dto.ollama;

import com.chatbot.backend.dto.openai.OpenAIMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OllamaChatResponse {
    private String model;
    private String created_at;
    private OpenAIMessage message;
    private boolean done;
}
