package com.example.InternalManagementSystem.Service;
import com.example.InternalManagementSystem.Dto.EstimateResponseDto;


import com.example.InternalManagementSystem.Dto.EstimateRequestDto;

public interface EstimateService {
    EstimateResponseDto generateEstimate(int subzoneId, EstimateRequestDto requestDto);
    EstimateResponseDto getEstimate(int estimateId);
    EstimateResponseDto updateEstimate(int estimateId, EstimateRequestDto requestDto);
}