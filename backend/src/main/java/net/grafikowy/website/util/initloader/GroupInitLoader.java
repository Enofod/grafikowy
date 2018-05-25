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
        String firstGroupName = "Kardiolodzy";
        Group group1 = groupService.createGroup(firstGroupName, "jan@kowalski.pl");
        String secondGroupName = "Anestezjolodzy";
        Group group2 = groupService.createGroup(secondGroupName, "jan@kowalski.pl");

        String groopOneName = group1.getName();
        String groupTwoName = group2.getName();
        groupService.addUserToGroup(groopOneName, "jan@kowalski.pl");
        groupService.addUserToGroup(groopOneName, "b@b.pl");
        groupService.addUserToGroup(groopOneName, "c@c.pl");
        groupService.addUserToGroup(groopOneName, "d@d.pl");

        groupService.addUserToGroup(groupTwoName, "jan@kowalski.pl");
        groupService.addUserToGroup(groupTwoName, "d@d.pl");
    }
}
