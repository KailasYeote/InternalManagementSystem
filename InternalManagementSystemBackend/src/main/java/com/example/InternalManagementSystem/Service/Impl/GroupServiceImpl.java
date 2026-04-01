package com.example.InternalManagementSystem.Service.Impl;

import com.example.InternalManagementSystem.Entity.Groups;
import com.example.InternalManagementSystem.Repository.GroupsRepo;
import com.example.InternalManagementSystem.Service.GroupService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupServiceImpl implements GroupService {

    private final GroupsRepo groupsRepo;

    public GroupServiceImpl(GroupsRepo groupsRepo) {
        this.groupsRepo = groupsRepo;
    }

    @Override
    public Groups CreateGroup(Groups groups) {
        return groupsRepo.save(groups);
    }

    @Override
    public List<Groups> GetGroup() {
        List<Groups> groupsList=groupsRepo.findAll();
        return  groupsList;
    }

    @Override
    public Optional<Groups> GetById(int groupId) {
        return groupsRepo.findById(groupId);
    }

    @Transactional
    @Override
    public Groups UpdateBYId(int groupId,Groups updateGroup) {
        Groups updateGroup1=groupsRepo.findById(groupId).orElseThrow(()->
                new RuntimeException("ID NOT FOUND"));

        updateGroup1.setName(updateGroup.getName());
        updateGroup1.setDescription(updateGroup.getDescription());

        return groupsRepo.save(updateGroup1);
    }

    @Override
    public void Delete(int groupId) {
         groupsRepo.deleteById(groupId);
    }

}
