package com.brogramer.peacefulPaths.dtos;

import com.brogramer.peacefulPaths.entity.Message;
import lombok.Builder;
import lombok.Data;

import java.util.Collection;

@Data
@Builder
public class ChatDto {

    private int id;
    private Collection<Message> messages;

    public ChatDto() {
    }

    public ChatDto(int id, Collection<Message> messages) {
        this.id = id;
        this.messages = messages;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Collection<Message> getMessages() {
        return messages;
    }

    public void setMessages(Collection<Message> messages) {
        this.messages = messages;
    }
}
