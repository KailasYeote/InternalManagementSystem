package com.example.InternalManagementSystem.Service.Impl;

import com.example.InternalManagementSystem.Dto.EstimateRequestDto;
import com.example.InternalManagementSystem.Dto.EstimateResponseDto;
import com.example.InternalManagementSystem.Entity.*;
import com.example.InternalManagementSystem.Exception.ResourceNotFoundException;
import com.example.InternalManagementSystem.Repository.EstimateRepo;
import com.example.InternalManagementSystem.Repository.SubzonesRepo;
import com.example.InternalManagementSystem.Service.EstimateService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;



@Service
public class EstimateServiceImpl implements EstimateService {

    private final EstimateRepo estimateRepo;
    private final SubzonesRepo subzonesRepo;

    public EstimateServiceImpl(EstimateRepo estimateRepo, SubzonesRepo subzonesRepo) {
        this.estimateRepo = estimateRepo;
        this.subzonesRepo = subzonesRepo;
    }

    // ✅ FIX 1: Accept DTO, build entity manually, return DTO
    @Transactional
    @Override
    public EstimateResponseDto generateEstimate(int subzoneId, EstimateRequestDto requestDto) {
        Subzones subzone = subzonesRepo.findById(subzoneId)
                .orElseThrow(() -> new ResourceNotFoundException("Subzone not found with ID: " + subzoneId));

        Estimates estimate = new Estimates();
        estimate.setCustomerName(requestDto.getCustomerName());
        estimate.setTotal_amount((int) requestDto.getTotalAmount());
        estimate.setSubzones(subzone);

        // If items is a JSON string stored in entity, serialize it
        // Adjust based on how your Estimates entity stores items
        if (requestDto.getItems() != null && !requestDto.getItems().isEmpty()) {
            estimate.setItem(requestDto.getItems().stream().map(com.example.InternalManagementSystem.Dto.EstimateRequestDto.ItemDto::getItem).collect(java.util.stream.Collectors.toList()));
        }

        Estimates saved = estimateRepo.save(estimate);
        return buildResponseDto(saved);
    }

    @Override
    public EstimateResponseDto getEstimate(int estimateId) {
        Estimates estimate = estimateRepo.findById(estimateId)
                .orElseThrow(() -> new ResourceNotFoundException("Estimate not found with ID: " + estimateId));

        return buildResponseDto(estimate);
    }

    // ✅ FIX 2: Return DTO instead of entity
    @Transactional
    @Override
    public EstimateResponseDto updateEstimate(int estimateId, EstimateRequestDto requestDto) {
        Estimates estimate = estimateRepo.findById(estimateId)
                .orElseThrow(() -> new ResourceNotFoundException("Estimate not found with ID: " + estimateId));

        if (requestDto.getCustomerName() != null) {
            estimate.setCustomerName(requestDto.getCustomerName());
        }
        estimate.setTotal_amount((int) requestDto.getTotalAmount());

        if (requestDto.getItems() != null && !requestDto.getItems().isEmpty()) {
            estimate.setItem(requestDto.getItems().stream().map(com.example.InternalManagementSystem.Dto.EstimateRequestDto.ItemDto::getItem).collect(java.util.stream.Collectors.toList()));
        }

        Estimates updated = estimateRepo.save(estimate);
        return buildResponseDto(updated);
    }

    // ✅ FIX 3: Reusable helper to build DTO safely
    private EstimateResponseDto buildResponseDto(Estimates estimate) {
        Subzones subzone = estimate.getSubzones();
        Clients client = subzone != null ? subzone.getClient() : null;
        Groups group = client != null ? client.getGroup() : null;

        return new EstimateResponseDto(
                estimate.getEstimate_id(),
                estimate.getTotal_amount(),
                subzone != null ? subzone.getName() : null,
                subzone != null ? subzone.getLocation() : null,
                client != null ? client.getName() : null,
                group != null ? group.getName() : null,
                estimate.getCustomerName(),
                estimate.getItem()
        );
    }
}