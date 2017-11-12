package net.grafikowy.website.user.controller.dto;

import net.grafikowy.website.group.controller.dto.SimpleGroupDTO;
import net.grafikowy.website.user.model.User;
import org.hibernate.validator.constraints.Email;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetailsDTO {

    private long id;

    @Email
    private String email;

    private String firstName;
    private String lastName;
    private String phone;
    private List<SimpleGroupDTO> usingGroups = new ArrayList<>();
    private List<SimpleGroupDTO> moderatingGroups = new ArrayList<>();

    public UserDetailsDTO(User user) {
        id = user.getId();
        email = user.getEmail();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        phone = user.getPhone();
        usingGroups = user.getUsingGroups().stream().map(group -> new SimpleGroupDTO(group)).collect(Collectors.toList());
        moderatingGroups = user.getModeratingGroups().stream().map(group -> new SimpleGroupDTO(group)).collect(Collectors.toList());
    }

    public UserDetailsDTO(String email, String firstName, String lastName, String phone) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }


    public UserDetailsDTO(long id, String email, String firstName, String lastName, String phone) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    public UserDetailsDTO(long id, String email, String firstName, String lastName, String phone, List<SimpleGroupDTO> usingGroups, List<SimpleGroupDTO> moderatingGroups) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.usingGroups = usingGroups;
        this.moderatingGroups = moderatingGroups;
    }

    public UserDetailsDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<SimpleGroupDTO> getUsingGroups() {
        return usingGroups;
    }

    public void setUsingGroups(List<SimpleGroupDTO> usingGroups) {
        this.usingGroups = usingGroups;
    }

    public List<SimpleGroupDTO> getModeratingGroups() {
        return moderatingGroups;
    }

    public void setModeratingGroups(List<SimpleGroupDTO> moderatingGroups) {
        this.moderatingGroups = moderatingGroups;
    }
}
