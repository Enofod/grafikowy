package net.grafikowy.website.group.service;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.group.repository.GroupRepository;
import net.grafikowy.website.user.controller.exception.UserNotFoundException;
import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    private GroupRepository groupRepository;
    private UserRepository userRepository;

    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public List<Group> getAll() {
        return groupRepository.findAll();
    }

    public Optional<Group> findOne(Long id) {
        return Optional.ofNullable(groupRepository.findOne(id));
    }

    public Optional<Group> findByName(String name) {
        return groupRepository.findByName(name);
    }

    @Transactional
    public Group createGroup(String groupName, String moderatorEmail) throws UserNotFoundException {
        Group group = new Group(groupName);
        User user = userRepository.findByEmail(moderatorEmail).orElseThrow(() -> new UserNotFoundException("User with email: " + moderatorEmail + " not found!"));
        group.addModerator(user);

        return groupRepository.save(group);
    }

    @Transactional
    public void addUserToGroup(String groupName, String userEmail) throws GroupNotFoundException, UserNotFoundException {
        Group group = groupRepository.findByName(groupName).orElseThrow(() -> new GroupNotFoundException("Group with name: " + groupName + " not found!"));
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new UserNotFoundException("User with email: " + userEmail + " not found!"));

        group.addUser(user);
    }

    @Transactional
    public void removeUserFromGroup(String groupName, String userEmail) throws GroupNotFoundException, UserNotFoundException {
        Group group = groupRepository.findByName(groupName).orElseThrow(() -> new GroupNotFoundException("Group with name: " + groupName + " not found!"));
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new UserNotFoundException("User with email: " + userEmail + " not found!"));

        group.removeUser(user);
    }

    @Transactional
    public void addModeratorToGroup(String groupName, String userEmail) throws GroupNotFoundException, UserNotFoundException {
        Group group = groupRepository.findByName(groupName).orElseThrow(() -> new GroupNotFoundException("Group with name: " + groupName + " not found!"));
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new UserNotFoundException("User with email: " + userEmail + " not found!"));

        group.addModerator(user);
    }
}
