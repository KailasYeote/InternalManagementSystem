package com.example.InternalManagementSystem.Repository;

import com.example.InternalManagementSystem.Entity.Estimates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimateRepo extends JpaRepository<Estimates,Integer> {
}
