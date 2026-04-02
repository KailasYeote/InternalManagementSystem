package com.example.InternalManagementSystem.Controller;

import com.example.InternalManagementSystem.Dto.EstimateRequestDto;
import com.example.InternalManagementSystem.Dto.EstimateResponseDto;
import com.example.InternalManagementSystem.Service.EstimateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // ← added
@RestController
@RequestMapping("/api/estimate")
public class EstimateController {

    private final EstimateService estimateService;

    // ✅ Inject interface, not implementation
    public EstimateController(EstimateService estimateService) {
        this.estimateService = estimateService;
    }

    @PostMapping("/{subzoneId}")
    public ResponseEntity<EstimateResponseDto> generateEstimate(
            @PathVariable int subzoneId,
            @RequestBody EstimateRequestDto requestDto) { // ✅ Use DTO not Entity

        return ResponseEntity.ok(estimateService.generateEstimate(subzoneId, requestDto));
    }

    @GetMapping("/{estimateId}")
    public ResponseEntity<EstimateResponseDto> getEstimate(
            @PathVariable int estimateId) {

        return ResponseEntity.ok(estimateService.getEstimate(estimateId));
    }

    @PutMapping("/{estimateId}")
    public ResponseEntity<EstimateResponseDto> updateEstimate( // ✅ Return DTO not Entity
            @PathVariable int estimateId,
            @RequestBody EstimateRequestDto requestDto) {

        return ResponseEntity.ok(estimateService.updateEstimate(estimateId, requestDto));
    }
}