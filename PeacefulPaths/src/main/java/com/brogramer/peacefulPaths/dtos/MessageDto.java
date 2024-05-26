package com.brogramer.peacefulPaths.dtos;

public class MessageDto {

    private int userId;
    private int chatId;
    private int therapistId;
    private String message;
    private String writtenBy;

    public MessageDto() {
    }

    public MessageDto(int userId, int therapistId, String message,int chatId,String writtenBy) {
        this.userId = userId;
        this.therapistId = therapistId;
        this.message = message;
        this.chatId = chatId;
        this.writtenBy = writtenBy;
    }

    public String getWrittenBy() {
        return writtenBy;
    }

    public void setWrittenBy(String writtenBy) {
        this.writtenBy = writtenBy;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
