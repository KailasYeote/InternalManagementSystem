package com.example.InternalManagementSystem.Service.Impl;

import com.example.InternalManagementSystem.Entity.Clients;
import com.example.InternalManagementSystem.Entity.Subzones;
import com.example.InternalManagementSystem.Repository.ClientRepo;
import com.example.InternalManagementSystem.Repository.SubzonesRepo;
import com.example.InternalManagementSystem.Service.SubzoneService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubzoneServiceImpl implements SubzoneService {

    private final SubzonesRepo subzonesRepo;

    private final ClientRepo clientRepo;

    public SubzoneServiceImpl(SubzonesRepo subzonesRepo, ClientRepo clientRepo) {
        this.subzonesRepo = subzonesRepo;
        this.clientRepo = clientRepo;
    }

    @Transactional
    @Override
    public Subzones CreateSubzone(int clientId, Subzones subzones) {
        Clients clients_ID= clientRepo.findById(clientId).orElseThrow(()->
                new RuntimeException("ID IS NOT FOUND...."));
        subzones.setClient(clients_ID);
        return subzonesRepo.save(subzones);
    }

    @Override
    public Optional<Subzones> getSubzone(int clientId) {

        return subzonesRepo.findById(clientId);
    }

    @Override
    public Optional<Subzones> getSubzoneId(String name, String location) {
        return subzonesRepo.findByNameAndLocation(name,location);
    }
}
