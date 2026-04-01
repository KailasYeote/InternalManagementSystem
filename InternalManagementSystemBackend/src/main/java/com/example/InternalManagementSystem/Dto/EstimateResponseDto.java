package com.example.InternalManagementSystem.Dto;


public class EstimateResponseDto {
    private int estimateId;
    private double totalAmount;
    private String subzoneName;
    private String customerName;
    private String clientName;
    private String groupName;
    private String location;
    private java.util.List<String> items;

    public EstimateResponseDto(int estimateId,
                               double totalAmount,
                               String subzoneName,
                               String location,
                               String clientName,
                               String groupName,
                               String customerName,
                               java.util.List<String> items) {

        this.estimateId = estimateId;
        this.totalAmount = totalAmount;
        this.subzoneName = subzoneName;
        this.clientName = clientName;
        this.groupName = groupName;
        this.customerName = customerName;
        this.location=location;
        this.items = items;
    }

    public int getEstimateId() {
        return estimateId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getSubzoneName() {
        return subzoneName;
    }

    public String getClientName() {
        return clientName;
    }

    public String getGroupName() {
        return groupName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public  String getLocation(){
        return location;
    }

    public java.util.List<String> getItems() {
        return items;
    }
}
