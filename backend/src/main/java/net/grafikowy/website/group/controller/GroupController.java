package net.grafikowy.website.group.controller;

import net.grafikowy.website.group.controller.dto.EmailHolder;
import net.grafikowy.website.group.controller.dto.GroupDetailsDTO;
import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.group.service.GroupService;
import net.grafikowy.website.user.controller.exception.UserNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
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

    @GetMapping("/{id}")
    public GroupDetailsDTO getById(Long id) throws GroupNotFoundException {
        return new GroupDetailsDTO(
                groupService.findOne(id)
                        .orElseThrow(
                                () -> new GroupNotFoundException("Group with id: " + id + " not exist")
                        )
        );
    }

    @PostMapping("/{groupName}")
    public GroupDetailsDTO createGroup(@PathVariable String groupName, @RequestBody EmailHolder moderatorEmail) throws UserNotFoundException {
        return new GroupDetailsDTO(groupService.createGroup(groupName, moderatorEmail.getEmail()));
    }

    // TODO: Change to patch mapping
    @PostMapping(value = "/{groupName}/addUser")
    public void addUserToGroup(@PathVariable String groupName, @RequestBody EmailHolder userEmail) throws GroupNotFoundException, UserNotFoundException {
        groupService.addUserToGroup(groupName, userEmail.getEmail());
    }

    // TODO: Change to patch mapping
    @PostMapping(value = "/{groupName}/removeUser")
    public void removeUserFromGroup(@PathVariable String groupName, @RequestBody EmailHolder userEmail) throws GroupNotFoundException, UserNotFoundException {
        groupService.removeUserFromGroup(groupName, userEmail.getEmail());
    }
}
