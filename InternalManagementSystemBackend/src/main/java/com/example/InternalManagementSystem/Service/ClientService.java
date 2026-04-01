package com.example.InternalManagementSystem.Service;

import com.example.InternalManagementSystem.Entity.Clients;

import java.util.List;
import java.util.Optional;

public interface ClientService {

     Clients createClient(Clients clients, int groupId);

     List<Clients> getClients();

     Optional<Clients> getClientById(int clientId);

     Clients updateById(int clientId, Clients updateData);

     void deleteById(int clientId);
}