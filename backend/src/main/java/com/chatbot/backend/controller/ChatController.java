package com.chatbot.backend.controller;

import com.chatbot.backend.dto.ChatRequest;
import com.chatbot.backend.dto.ChatResponse;
import com.chatbot.backend.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    @PostMapping
    public ResponseEntity<?> chat(@Valid @RequestBody ChatRequest request) {
        // Delegate all logic to service, including API key validation/fallback
        ChatResponse response = chatService.handleMessage(request);
        return ResponseEntity.ok(response);
    }
}
