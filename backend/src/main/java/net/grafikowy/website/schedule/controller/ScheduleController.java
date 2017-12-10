package net.grafikowy.website.schedule.controller;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.schedule.model.ScheduleDTO;
import net.grafikowy.website.schedule.service.ScheduleService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/group")
    public ScheduleDTO getScheduleForGroupInSpecifiedYearAndMonth(@RequestParam(name = "groupName") String groupName, @RequestParam(name = "year") int year, @RequestParam(name = "month") int month) throws GroupNotFoundException {
        return scheduleService.getSchedule(groupName, year, month);
    }

    @PostMapping("/group")
    public void saveSchedule(@RequestBody ScheduleDTO scheduleDTO) throws GroupNotFoundException {
        scheduleService.removeSchedulesForGroupInYearAndMonth(scheduleDTO.getGroupName(), scheduleDTO.getYear(), scheduleDTO.getMonth());
        scheduleService.saveSchedule(scheduleDTO);
    }
}
