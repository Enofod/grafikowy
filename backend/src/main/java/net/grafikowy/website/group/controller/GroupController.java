package net.grafikowy.website.group.controller;

import net.grafikowy.website.group.controller.dto.GroupDetailsDTO;
import net.grafikowy.website.group.service.GroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/groups")
public class GroupController {

    private GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/all")
    public List<GroupDetailsDTO> getAll() {
        return groupService.getAll().stream().map(group -> new GroupDetailsDTO(group)).collect(Collectors.toList());
    }

    @PostMapping("/{groupName}")
    public GroupDetailsDTO createGroup(@PathVariable String groupName) {
        return new GroupDetailsDTO(groupService.createGroup(groupName));
    }
}
