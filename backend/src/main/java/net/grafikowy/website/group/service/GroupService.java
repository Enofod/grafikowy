package net.grafikowy.website.group.service;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.group.repository.GroupRepository;
import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    public Group getOne(Long id) {
        return groupRepository.findOne(id);
    }

    @Transactional
    public Group createGroup(String groupName) {
        return groupRepository.save(new Group(groupName));
    }

    @Transactional
    public void addUserToGroup(long groupId, String userEmail) throws GroupNotFoundException {
        Group group = Optional.ofNullable(groupRepository.findOne(groupId)).orElseThrow(() -> new GroupNotFoundException("Group with id: " + groupId + " not found!"));
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("User with email: " + userEmail + " not found!"));

        group.addUser(user);
    }

    @Transactional
    public void addModeratorToGroup(long groupId, String userEmail) throws GroupNotFoundException {
        Group group = Optional.ofNullable(groupRepository.findOne(groupId)).orElseThrow(() -> new GroupNotFoundException("Group with id: " + groupId + " not found!"));
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("User with email: " + userEmail + " not found!"));

        group.addModerator(user);
    }
}
