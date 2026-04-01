package com.example.InternalManagementSystem.Repository;

import com.example.InternalManagementSystem.Entity.Groups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupsRepo extends JpaRepository<Groups,Integer> {
}
