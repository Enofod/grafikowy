package net.grafikowy.website.util.initloader;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.group.service.GroupService;

public class GroupInitLoader {
    private GroupService groupService;

    public GroupInitLoader(GroupService groupService) {
        this.groupService = groupService;
    }

    public void load() throws GroupNotFoundException {
        String firstGroupName = "Kotleciki";
        groupService.createGroup(firstGroupName);
        String secondGroupName = "Kotleciki";

        groupService.createGroup(secondGroupName);
        groupService.addModeratorToGroup(firstGroupName, "a");
        groupService.addUserToGroup(firstGroupName, "a");
        groupService.addUserToGroup(firstGroupName, "b");

        groupService.addUserToGroup(secondGroupName, "b");
    }
}
