package net.grafikowy.website.schedule.controller;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.schedule.model.Schedule;
import net.grafikowy.website.schedule.service.ScheduleService;
import net.grafikowy.website.shift.model.Shift;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
