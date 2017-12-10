package net.grafikowy.website.schedule.service;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.group.service.GroupService;
import net.grafikowy.website.schedule.model.Schedule;
import net.grafikowy.website.shift.controller.dto.ShiftDayTypeDTO;
import net.grafikowy.website.shift.controller.dto.UserShiftsDTO;
import net.grafikowy.website.shift.model.Shift;
import net.grafikowy.website.shift.model.ShiftType;
import net.grafikowy.website.shift.service.ShiftService;
import net.grafikowy.website.user.controller.dto.SimpleUserDetailsDTO;
import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.service.UserService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ScheduleService {

    private GroupService groupService;
    private ShiftService shiftService;
    private UserService userService;

    public ScheduleService(GroupService groupService, ShiftService shiftService, UserService userService) {
        this.groupService = groupService;
        this.shiftService = shiftService;
        this.userService = userService;
    }

    public Schedule getSchedule(String groupName, int year, int month) throws GroupNotFoundException {
        Group group = groupService.findByName(groupName).orElseThrow(() -> new GroupNotFoundException("Group with name " + groupName + " not found."));
        Set<User> usersInGroup = group.getUsers();
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, startDate.lengthOfMonth());

        Map<User, Map<Integer, ShiftType>> tempMap = new HashMap<>();

        usersInGroup.forEach(user -> {
                    tempMap.put(user, getEmptyShiftListForMonth(year, month));
                    user.getShifts().stream()
                            .filter(shift -> shift.getGroup().equals(group))
                            .filter(shift -> (shift.getShiftDate().isEqual(startDate) || shift.getShiftDate().isEqual(endDate)) || (shift.getShiftDate().isAfter(startDate) && shift.getShiftDate().isBefore(endDate)))
                            .forEach(shift -> {
                                tempMap.get(user).put(shift.getShiftDate().getDayOfMonth(), shift.getShiftType());
                            });
                }
        );

        List<UserShiftsDTO> userShifts = new ArrayList<>();
        tempMap.forEach((user, value) -> {
            List<ShiftDayTypeDTO> shiftList = value.entrySet().stream()
                    .map(entry -> new ShiftDayTypeDTO(entry.getKey(), entry.getValue()))
                    .collect(Collectors.toList());
            userShifts.add(new UserShiftsDTO(new SimpleUserDetailsDTO(user), shiftList));
        });

        return new Schedule(year, month, groupName, userShifts);
    }

    private Map<Integer, ShiftType> getEmptyShiftListForMonth(int year, int month) {
        return IntStream.range(1, LocalDate.of(year, month, 1).lengthOfMonth() + 1)
                .boxed()
                .collect(Collectors.toMap(Function.identity(), day -> ShiftType.NONE));
    }

    public void saveSchedule(Schedule schedule) throws GroupNotFoundException {
        schedule.getUserShifts().forEach(userShiftsDTO -> {
            userShiftsDTO.getShiftInDay().stream()
                    .filter(shiftDayTypeDTO -> !shiftDayTypeDTO.getShiftType().equals(ShiftType.NONE))
                    .forEach(shiftDayTypeDTO ->
                            shiftService.addShift(
                                    userShiftsDTO.getUser().getId(),
                                    LocalDate.of(schedule.getYear(), schedule.getMonth(), shiftDayTypeDTO.getDay()),
                                    shiftDayTypeDTO.getShiftType(),
                                    schedule.getGroupName()
                            ));
        });
    }

    @Transactional
    public void removeSchedulesForGroupInMonth(String groupName, int year, int month) throws GroupNotFoundException {
        Group group = groupService.findByName(groupName).orElseThrow(() -> new GroupNotFoundException("Group with name " + groupName + " not found."));
        List<Shift> shiftsToRemove = group.getShifts().stream().filter(shift ->
                shift.getShiftDate().isAfter(LocalDate.of(year, month, 1).minusDays(1))
                        && shift.getShiftDate().isBefore(LocalDate.of(year, month, 1).plusMonths(1))
        ).collect(Collectors.toList());


        shiftsToRemove.stream().forEach(shift -> shift.getUsers().stream().forEach(user -> user.removeShift(shift)));
        //group.removeShifts(shiftsToRemove); // TODO: fix it -> remove shift when they have no users
    }
}
