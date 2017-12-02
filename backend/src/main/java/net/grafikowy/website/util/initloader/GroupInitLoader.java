package net.grafikowy.website.util.initloader;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.group.service.GroupService;
import org.springframework.stereotype.Service;

@Service
public class GroupInitLoader {
    private GroupService groupService;

    public GroupInitLoader(GroupService groupService) {
        this.groupService = groupService;
    }

    public void load() throws GroupNotFoundException {
        String firstGroupName = "Kotleciki";
        Group group1 = groupService.createGroup(firstGroupName);
        String secondGroupName = "Schaboszczaki";
        Group group2 = groupService.createGroup(secondGroupName);

        long groupOneId = group1.getId();
        groupService.addModeratorToGroup(groupOneId, "a");
        groupService.addModeratorToGroup(group2.getId(), "a");
        groupService.addUserToGroup(groupOneId, "a");
        groupService.addUserToGroup(groupOneId, "b");
        groupService.addUserToGroup(groupOneId, "c");
        groupService.addUserToGroup(groupOneId, "c");

        groupService.addUserToGroup(group2.getId(), "b");
    }
}
