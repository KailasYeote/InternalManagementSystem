package com.example.InternalManagementSystem.Controller;

import com.example.InternalManagementSystem.Entity.Clients;
import com.example.InternalManagementSystem.Service.Impl.ClientServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ims/v1/client")
public class ClientController {

    private final ClientServiceImpl clientService;

    public ClientController(ClientServiceImpl clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/{groupId}")
    public ResponseEntity<Clients> createClient(@RequestBody Clients clients, @PathVariable int groupId) {
        Clients saved = clientService.createClient(clients, groupId);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Clients>> getClients() {
        List<Clients> clientList = clientService.getClients();
        return ResponseEntity.ok(clientList);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<Clients> getClientById(@PathVariable int clientId) {
        Clients client = clientService.getClientById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with ID: " + clientId));
        return ResponseEntity.ok(client);
    }

    @PutMapping("/{clientId}")
    public ResponseEntity<Clients> updateById(@PathVariable int clientId, @RequestBody Clients updateData) {
        Clients updated = clientService.updateById(clientId, updateData);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{clientId}")
    public ResponseEntity<String> deleteById(@PathVariable int clientId) {
        clientService.deleteById(clientId);
        return ResponseEntity.ok("Client deleted successfully");
    }
}