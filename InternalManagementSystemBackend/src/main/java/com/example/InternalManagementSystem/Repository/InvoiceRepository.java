package com.example.InternalManagementSystem.Repository;

import com.example.InternalManagementSystem.Entity.Invoices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoices, Integer> {
}
