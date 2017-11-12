package net.grafikowy.website.group.controller;

import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.group.service.GroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/groups")
public class GroupController {

    private GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/all")
    public List<Group> getAll() {
        return groupService.getAll();
    }

    @PostMapping("/{groupName}")
    public Group createGroup(@PathVariable String groupName) {
        return groupService.createGroup(groupName);
    }
}
