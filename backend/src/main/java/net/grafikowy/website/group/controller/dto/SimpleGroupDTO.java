package net.grafikowy.website.group.controller.dto;

import net.grafikowy.website.group.model.Group;

/* DTO with only id and name - used by User */
public class SimpleGroupDTO {
    private long id;
    private String name;

    public SimpleGroupDTO(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public SimpleGroupDTO(Group group) {
        id = group.getId();
        name = group.getName();
    }

    public SimpleGroupDTO() {
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
}
