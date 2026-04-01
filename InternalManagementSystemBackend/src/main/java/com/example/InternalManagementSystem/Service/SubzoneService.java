package com.example.InternalManagementSystem.Service;

import com.example.InternalManagementSystem.Entity.Subzones;

import java.util.Optional;

public interface SubzoneService {

    Subzones CreateSubzone(int clientId,Subzones subzones);

    Optional<Subzones> getSubzone(int clientId);

    Optional<Subzones> getSubzoneId(String name, String location);
}
