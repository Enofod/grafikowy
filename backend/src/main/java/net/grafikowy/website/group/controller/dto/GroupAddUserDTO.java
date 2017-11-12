package net.grafikowy.website.group.controller.dto;

public class GroupAddUserDTO {
    private String groupName;
    private String userEmail;

    public GroupAddUserDTO(String groupName, String userEmail) {
        this.groupName = groupName;
        this.userEmail = userEmail;
    }

    public GroupAddUserDTO() {
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
