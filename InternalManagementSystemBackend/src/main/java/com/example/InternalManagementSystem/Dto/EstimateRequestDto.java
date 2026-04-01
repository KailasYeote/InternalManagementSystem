package com.example.InternalManagementSystem.Dto;

import java.util.List;

public class EstimateRequestDto {
    private String customerName;
    private double totalAmount;
    private List<ItemDto> items;          // ✅ was ItemDto, should be List<ItemDto>

    public String getCustomerName() { return customerName; }
    public double getTotalAmount() { return totalAmount; }
    public List<ItemDto> getItems() { return items; }  // ✅ return type matches

    public static class ItemDto {
        private String item;
        public String getItem() { return item; }       // ✅ was List<String>, should be String
    }
}