package com.example.InternalManagementSystem.Controller;

import com.example.InternalManagementSystem.Entity.Subzones;
import com.example.InternalManagementSystem.Service.Impl.SubzoneServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*") // ← added
@RestController
@RequestMapping("/api/subzone")
public class SubzoneContoller {

    private final SubzoneServiceImpl subzoneService;

    public SubzoneContoller(SubzoneServiceImpl subzoneService) {
        this.subzoneService = subzoneService;
    }

    @PostMapping("/{clientId}")
    public ResponseEntity<Subzones> CreateSubzone(@PathVariable int clientId, @RequestBody Subzones subzones) {
        Subzones Create_Subzones = subzoneService.CreateSubzone(clientId, subzones);
        return ResponseEntity.ok(Create_Subzones);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<Optional<Subzones>> GetSubzone(@PathVariable int clientId) {
        Optional<Subzones> subzones = subzoneService.getSubzone(clientId);
        return ResponseEntity.ok(subzones);
    }

    @GetMapping("/search")
    public ResponseEntity<Subzones> getSubzoneByNameAndLocation(
            @RequestParam String name,
            @RequestParam String location) {

        Subzones subzone = subzoneService
                .getSubzoneId(name, location)
                .orElseThrow(() -> new RuntimeException("Subzone Not Found"));

        return ResponseEntity.ok(subzone);
    }

}
