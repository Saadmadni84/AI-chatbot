package com.chatbot.backend.dto.openai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpenAIChatResponse {
    private String id;
    private String object;
    private long created;
    private List<Choice> choices;
}
