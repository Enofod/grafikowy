package net.grafikowy.website.group.controller.dto;

import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.user.controller.dto.SimpleUserDetailsDTO;

import java.util.List;
import java.util.stream.Collectors;

public class GroupDetailsDTO {

    private long id;
    private String name;
    private List<SimpleUserDetailsDTO> users;
    private List<SimpleUserDetailsDTO> moderators;

    public GroupDetailsDTO() {
    }

    public GroupDetailsDTO(long id, String name, List<SimpleUserDetailsDTO> users, List<SimpleUserDetailsDTO> moderators) {
        this.id = id;
        this.name = name;
        this.users = users;
        this.moderators = moderators;
    }

    public GroupDetailsDTO(Group group) {
        id = group.getId();
        name = group.getName();
        users = group.getUsers().stream().map(user -> new SimpleUserDetailsDTO(user)).collect(Collectors.toList());
        moderators = group.getModerators().stream().map(user -> new SimpleUserDetailsDTO(user)).collect(Collectors.toList());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SimpleUserDetailsDTO> getUsers() {
        return users;
    }

    public void setUsers(List<SimpleUserDetailsDTO> users) {
        this.users = users;
    }

    public List<SimpleUserDetailsDTO> getModerators() {
        return moderators;
    }

    public void setModerators(List<SimpleUserDetailsDTO> moderators) {
        this.moderators = moderators;
    }
}
