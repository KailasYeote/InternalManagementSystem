package com.example.InternalManagementSystem.Repository;

import com.example.InternalManagementSystem.Entity.Subzones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SubzonesRepo extends JpaRepository<Subzones,Integer> {
    Optional<Subzones> findByNameAndLocation(String name, String location);
}
