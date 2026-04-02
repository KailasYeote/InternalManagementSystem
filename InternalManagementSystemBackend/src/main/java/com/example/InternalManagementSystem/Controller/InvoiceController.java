package com.example.InternalManagementSystem.Controller;

import com.example.InternalManagementSystem.Entity.Invoices;
import com.example.InternalManagementSystem.Entity.Estimates;
import com.example.InternalManagementSystem.Entity.Clients;
import com.example.InternalManagementSystem.Entity.InvoiceStatus;
import com.example.InternalManagementSystem.Repository.InvoiceRepository;
import com.example.InternalManagementSystem.Repository.EstimateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/invoice") // ← Fixed path
public class InvoiceController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private EstimateRepo estimateRepo;

    @GetMapping
    public ResponseEntity<List<Invoices>> getAllInvoices() {
        return ResponseEntity.ok(invoiceRepository.findAll());
    }

    @PostMapping("/convert/{id}")
    public ResponseEntity<String> convertToInvoice(@PathVariable int id) {
        Optional<Estimates> estimateOpt = estimateRepo.findById(id);
        if (estimateOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Estimate not found");
        }

        Estimates estimate = estimateOpt.get();
        Clients client = null;

        try {
            client = estimate.getSubzones().getClient();
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Estimate has no associated client");
        }

        if (client == null) {
            return ResponseEntity.status(400).body("Estimate has no associated client");
        }

        Invoices invoice = new Invoices();
        invoice.setClient(client);
        invoice.setAmount(estimate.getTotal_amount());
        invoice.setDate_created(new Date());
        invoice.setStatus(InvoiceStatus.CREATED);

        invoiceRepository.save(invoice);
        return ResponseEntity.ok("Invoice Created Successfully");
    }
}