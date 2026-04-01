package com.example.InternalManagementSystem.Dto;

public class ItemResponseDto {
    private int itemId;
    private String item;

    public ItemResponseDto(int itemId, String item) {
        this.itemId = itemId;
        this.item = item;
    }

    public int getItemId() { return itemId; }
    public String getItem() { return item; }
}