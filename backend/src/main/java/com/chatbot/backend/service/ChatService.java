package com.chatbot.backend.service;

import com.chatbot.backend.dto.ChatRequest;
import com.chatbot.backend.dto.ChatResponse;
import com.chatbot.backend.dto.Message;
import com.chatbot.backend.dto.ollama.OllamaChatRequest;
import com.chatbot.backend.dto.ollama.OllamaChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final WebClient ollamaWebClient;

    @Value("${openai.model:llama3}")
    private String model;

    public ChatResponse handleMessage(ChatRequest request) {
        try {
            return queryOllama(request.getHistory(), request.getMessage());
        } catch (WebClientResponseException e) {
            log.error("Error calling Ollama API: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            return ChatResponse.builder()
                    .id(UUID.randomUUID().toString())
                    .message("I'm sorry, I'm having trouble connecting to my brain right now. (Ollama API Error)")
                    .done(true)
                    .build();
        } catch (Exception e) {
            log.error("Unexpected error in ChatService", e);
            return ChatResponse.builder()
                    .id(UUID.randomUUID().toString())
                    .message("An unexpected error occurred. Please try again later.")
                    .done(true)
                    .build();
        }
    }

    private ChatResponse queryOllama(List<Message> history, String userMessage) {
        List<Message> messages = new ArrayList<>();
        
        // Map history if exists
        if (history != null) {
            messages.addAll(history);
        }
        
        // Add current user message
        messages.add(new Message("user", userMessage));

        OllamaChatRequest request = OllamaChatRequest.builder()
                .model(model)
                .messages(messages)
                .stream(false)
                .build();

        OllamaChatResponse response = ollamaWebClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(OllamaChatResponse.class)
                .block(); // Blocking for now as we are in a synchronous controller

        String content = "No response generated.";
        if (response != null && response.getMessage() != null) {
            content = response.getMessage().getContent();
        }

        return ChatResponse.builder()
                .id(UUID.randomUUID().toString())
                .message(content)
                .done(true)
                .build();
    }
}
