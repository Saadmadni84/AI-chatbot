package com.chatbot.backend.service;

import com.chatbot.backend.dto.ChatRequest;
import com.chatbot.backend.dto.ChatResponse;
import com.chatbot.backend.dto.Message;
import com.chatbot.backend.dto.openai.OpenAIChatRequest;
import com.chatbot.backend.dto.openai.OpenAIChatResponse;
import com.chatbot.backend.dto.openai.OpenAIMessage;
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

    private final WebClient openAiWebClient;

    @Value("${openai.model:gpt-3.5-turbo}")
    private String model;

    @Value("${openai.temperature:0.7}")
    private double temperature;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    public ChatResponse handleMessage(ChatRequest request) {
        // Check for valid API key
        if (openAiApiKey == null || openAiApiKey.isEmpty() || "your_openai_api_key_here".equals(openAiApiKey)) {
            return ChatResponse.builder()
                    .id(UUID.randomUUID().toString())
                    .message("I am currently running in **Demo Mode** because the OpenAI API key is not configured.\n\n" +
                            "To enable real AI responses:\n" +
                            "1. Get an API key from [OpenAI](https://platform.openai.com)\n" +
                            "2. Set `OPENAI_API_KEY` environment variable or update `application.yml`\n\n" +
                            "You said: \"" + request.getMessage() + "\"")
                    .done(true)
                    .build();
        }

        try {
            return queryOpenAI(request.getHistory(), request.getMessage());
        } catch (WebClientResponseException e) {
            log.error("Error calling OpenAI API: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            return ChatResponse.builder()
                    .id(UUID.randomUUID().toString())
                    .message("I'm sorry, I'm having trouble connecting to my brain right now. (OpenAI API Error)")
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

    private ChatResponse queryOpenAI(List<Message> history, String userMessage) {
        List<OpenAIMessage> messages = new ArrayList<>();
        
        // Map history if exists
        if (history != null) {
            messages.addAll(history.stream()
                    .map(msg -> new OpenAIMessage(msg.getRole(), msg.getContent()))
                    .collect(Collectors.toList()));
        }
        
        // Add current user message
        messages.add(new OpenAIMessage("user", userMessage));

        OpenAIChatRequest request = OpenAIChatRequest.builder()
                .model(model)
                .messages(messages)
                .temperature(temperature)
                .build();

        OpenAIChatResponse response = openAiWebClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(OpenAIChatResponse.class)
                .block(); // Blocking for now as we are in a synchronous controller

        String content = "No response generated.";
        if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
            content = response.getChoices().get(0).getMessage().getContent();
        }

        return ChatResponse.builder()
                .id(response != null ? response.getId() : UUID.randomUUID().toString())
                .message(content)
                .done(true)
                .build();
    }
}
