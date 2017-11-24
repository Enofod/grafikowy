package net.grafikowy.website.schedule.service;

import net.grafikowy.website.group.service.GroupService;
import net.grafikowy.website.schedule.model.Schedule;
import net.grafikowy.website.shift.model.ShiftType;
import net.grafikowy.website.shift.service.ShiftService;
import net.grafikowy.website.user.model.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ScheduleService {

    private GroupService groupService;
    private ShiftService shiftService;

    public ScheduleService(GroupService groupService, ShiftService shiftService) {
        this.groupService = groupService;
        this.shiftService = shiftService;
    }

    public Schedule getSchedule(long groupId, int year, int month) {
        // TODO: Handle exception when group not existing
        Set<User> usersInGroup = groupService.getOne(groupId).getUsers();
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, startDate.lengthOfMonth());

        Map<Long, Map<Integer, ShiftType>> result = new HashMap<>();

        usersInGroup.forEach(user -> {
                    result.put(user.getId(), getEmptyShiftListForMonth(year, month));
                    user.getShifts().stream()
                            .filter(shift -> (shift.getShiftDate().isEqual(startDate) || shift.getShiftDate().isEqual(endDate)) || (shift.getShiftDate().isAfter(startDate) && shift.getShiftDate().isBefore(endDate)))
                            .forEach(shift -> {
                                result.get(user.getId()).put(shift.getShiftDate().getDayOfMonth(), shift.getShiftType());
                            });
                }
        );

        return new Schedule(year, month, result);
    }

    private Map<Integer, ShiftType> getEmptyShiftListForMonth(int year, int month) {
        return IntStream.range(1, LocalDate.of(year, month, 1).lengthOfMonth() + 1)
                .boxed()
                .collect(Collectors.toMap(Function.identity(), day -> ShiftType.NONE));
    }
}
