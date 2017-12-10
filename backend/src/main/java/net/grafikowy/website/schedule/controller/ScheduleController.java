package net.grafikowy.website.schedule.controller;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.schedule.model.Schedule;
import net.grafikowy.website.schedule.service.ScheduleService;
import net.grafikowy.website.shift.model.Shift;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/group")
    public Schedule getScheduleForGroupInSpecifiedYearAndMonth(@RequestParam(name = "groupName") String groupName, @RequestParam(name = "year") int year, @RequestParam(name = "month") int month) throws GroupNotFoundException {
        return scheduleService.getSchedule(groupName, year, month);
    }

    @PostMapping("/group")
    public void saveSchedule(@RequestBody Schedule schedule) throws GroupNotFoundException {
        scheduleService.removeSchedulesForGroupInMonth(schedule.getGroupName(), schedule.getYear(), schedule.getMonth());
        scheduleService.saveSchedule(schedule);
    }
}
