package net.grafikowy.website.shift.service;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.group.service.GroupService;
import net.grafikowy.website.shift.model.Shift;
import net.grafikowy.website.shift.model.ShiftType;
import net.grafikowy.website.shift.repository.ShiftRepository;
import net.grafikowy.website.user.controller.exception.UserNotFoundException;
import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.service.UserService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ShiftService {

    private ShiftRepository shiftRepository;
    private UserService userService;
    private GroupService groupService;

    public ShiftService(ShiftRepository shiftRepository, UserService userService, GroupService groupService) {
        this.shiftRepository = shiftRepository;
        this.userService = userService;
        this.groupService = groupService;
    }

    public List<Shift> findAll() {
        return shiftRepository.findAll();
    }

    // TODO: Fix - it not always saves data.
    @Transactional
    public void addShift(long userId, LocalDate shiftDate, ShiftType shiftType, String groupName) {
        Optional<User> user = userService.findOne(userId);
        if (user.isPresent()) {
            Optional<Group> group = groupService.findByName(groupName);
            if (group.isPresent()) {
                Shift shift = shiftRepository.findByShiftDateAndShiftTypeAndGroup(shiftDate, shiftType, group.get()).orElse(new Shift(shiftDate, shiftType, group.get()));
                user.get().addShift(shift);
            }
        }
    }

    public Set<Shift> findForUserInYearAndMonth(String userEmail, String groupName, int year, int month) throws GroupNotFoundException, UserNotFoundException {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, startDate.lengthOfMonth());

        User user = userService.findByEmail(userEmail).orElseThrow(() -> new UserNotFoundException("User with id: " + userEmail + " not fond"));
        Group group = groupService.findByName(groupName).orElseThrow(() -> new GroupNotFoundException("Group with name " + groupName + " not found."));

        return shiftRepository.findByUsersContainingAndGroupAndShiftDateBetween(user, group, startDate, endDate);
    }
}
