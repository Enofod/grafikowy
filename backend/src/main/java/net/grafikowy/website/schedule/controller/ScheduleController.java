package net.grafikowy.website.schedule.controller;

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
    public Schedule getScheduleForGroupInSpecifiedYearAndMonth(@RequestParam(name = "groupId") Long groupId, @RequestParam(name = "year") int year, @RequestParam(name = "month") int month) {
        System.out.println(groupId);
        System.out.println(year);
        System.out.println(month);
        return scheduleService.getSchedule(groupId, year, month);
    }
}
