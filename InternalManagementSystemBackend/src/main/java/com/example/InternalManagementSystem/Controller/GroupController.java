package com.example.InternalManagementSystem.Controller;

import com.example.InternalManagementSystem.Entity.Groups;
import com.example.InternalManagementSystem.Service.Impl.GroupServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") // ← added
@RestController
@RequestMapping("/api/group")
public class GroupController {

    private final GroupServiceImpl groupService;

    public GroupController(GroupServiceImpl groupService) {
        this.groupService = groupService;
    }

    @PostMapping
    public ResponseEntity<Groups> createGroup(@RequestBody Groups groups) {
        Groups created = groupService.CreateGroup(groups);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<Groups>> getGroups() {
        List<Groups> groupsList = groupService.GetGroup();
        return ResponseEntity.ok(groupsList);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<Optional<Groups>> getGroupById(@PathVariable int groupId) {
        Optional<Groups> group = groupService.GetById(groupId);
        return ResponseEntity.ok(group);
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<Groups> updateById(@PathVariable int groupId, @RequestBody Groups updateGroups) {
        Groups updated = groupService.UpdateBYId(groupId, updateGroups);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<String> deleteById(@PathVariable int groupId) {
        groupService.Delete(groupId);
        return ResponseEntity.ok("Group deleted successfully");
    }
}