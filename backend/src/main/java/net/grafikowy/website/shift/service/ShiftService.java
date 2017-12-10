package net.grafikowy.website.shift.service;

import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.group.service.GroupService;
import net.grafikowy.website.shift.model.Shift;
import net.grafikowy.website.shift.model.ShiftType;
import net.grafikowy.website.shift.repository.ShiftRepository;
import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.service.UserService;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
}
