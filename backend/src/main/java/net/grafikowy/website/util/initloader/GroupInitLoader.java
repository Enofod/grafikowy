package net.grafikowy.website.util.initloader;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.group.service.GroupService;
import net.grafikowy.website.user.controller.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class GroupInitLoader {
    private GroupService groupService;

    public GroupInitLoader(GroupService groupService) {
        this.groupService = groupService;
    }

    public void load() throws GroupNotFoundException, UserNotFoundException {
        String firstGroupName = "Kotleciki";
        Group group1 = groupService.createGroup(firstGroupName);
        String secondGroupName = "Schaboszczaki";
        Group group2 = groupService.createGroup(secondGroupName);

        String groopOneName = group1.getName();
        groupService.addModeratorToGroup(groopOneName, "a");
        String groupTwoName = group2.getName();
        groupService.addModeratorToGroup(groupTwoName, "a");
        groupService.addUserToGroup(groopOneName, "a");
        groupService.addUserToGroup(groopOneName, "b");
        groupService.addUserToGroup(groopOneName, "c");
        groupService.addUserToGroup(groopOneName, "c");

        groupService.addUserToGroup(groupTwoName, "b");
    }
}
