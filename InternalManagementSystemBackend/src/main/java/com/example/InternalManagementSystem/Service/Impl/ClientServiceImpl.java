package com.example.InternalManagementSystem.Service.Impl;

import com.example.InternalManagementSystem.Entity.Clients;
import com.example.InternalManagementSystem.Entity.Groups;
import com.example.InternalManagementSystem.Repository.ClientRepo;
import com.example.InternalManagementSystem.Repository.GroupsRepo;
import com.example.InternalManagementSystem.Service.ClientService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepo clientRepo;
    private final GroupsRepo groupsRepo;

    public ClientServiceImpl(ClientRepo clientRepo, GroupsRepo groupsRepo) {
        this.clientRepo = clientRepo;
        this.groupsRepo = groupsRepo;
    }

    @Transactional
    @Override
    public Clients createClient(Clients clients, int groupId) {
        Groups group = groupsRepo.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found with ID: " + groupId));
        clients.setGroup(group);
        return clientRepo.save(clients);
    }

    @Override
    public List<Clients> getClients() {
        return clientRepo.findAll();
    }

    @Override
    public Optional<Clients> getClientById(int clientId) {
        return clientRepo.findById(clientId);
    }

    @Transactional
    @Override
    public Clients updateById(int clientId, Clients updateData) {
        Clients existing = clientRepo.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with ID: " + clientId));
        existing.setName(updateData.getName());
        existing.setOrganizationDetails(updateData.getOrganizationDetails());
        return clientRepo.save(existing);
    }

    @Transactional
    @Override
    public void deleteById(int clientId) {
        clientRepo.deleteById(clientId);
    }
}