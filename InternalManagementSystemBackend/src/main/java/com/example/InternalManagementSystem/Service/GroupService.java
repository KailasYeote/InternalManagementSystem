package com.example.InternalManagementSystem.Service;

import com.example.InternalManagementSystem.Entity.Groups;

import java.util.List;
import java.util.Optional;

public interface GroupService  {

     Groups CreateGroup(Groups groups);

     List<Groups> GetGroup();

     Optional<Groups> GetById(int groupId);

     Groups UpdateBYId(int groupId,Groups updateGroup);

     void Delete(int groupId);

}
