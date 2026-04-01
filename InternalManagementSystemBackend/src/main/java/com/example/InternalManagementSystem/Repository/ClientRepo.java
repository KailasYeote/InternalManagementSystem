package com.example.InternalManagementSystem.Repository;

import com.example.InternalManagementSystem.Entity.Clients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepo extends JpaRepository<Clients, Integer> {
}
