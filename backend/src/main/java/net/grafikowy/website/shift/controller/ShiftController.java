package net.grafikowy.website.shift.controller;

import net.grafikowy.website.group.exception.GroupNotFoundException;
import net.grafikowy.website.shift.controller.dto.CalendarDTO;
import net.grafikowy.website.shift.controller.dto.ShiftDayTypeDTO;
import net.grafikowy.website.shift.model.Shift;
import net.grafikowy.website.shift.service.ShiftService;
import net.grafikowy.website.user.controller.exception.UserNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/shifts")
public class ShiftController {
    private ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    @GetMapping("/all")
    public List<Shift> findAll() {
        return shiftService.findAll();
    }

    @GetMapping
    public CalendarDTO getShiftForUserAndGroupNameYearAndMonth(@RequestParam(name = "userEmail") String userEmail, @RequestParam(name = "groupName") String groupName, @RequestParam(name = "year") int year, @RequestParam(name = "month") int month) throws GroupNotFoundException, UserNotFoundException {
        List<ShiftDayTypeDTO> shiftDayTypeDTOS = shiftService.findForUserInYearAndMonth(userEmail, groupName, year, month).stream()
                .map(shift -> new ShiftDayTypeDTO(shift.getShiftDate().getDayOfMonth(), shift.getShiftType()))
                .collect(Collectors.toList());

        return new CalendarDTO(
                year,
                month,
                userEmail,
                groupName,
                shiftDayTypeDTOS
        );
    }
}
