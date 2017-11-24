package net.grafikowy.website.shift.controller;

import net.grafikowy.website.shift.model.Shift;
import net.grafikowy.website.shift.service.ShiftService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/shifts")
public class ShiftController {
    private ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    @GetMapping("/all")
    public List<Shift> findAll() {
        List<Shift> all = shiftService.findAll();
        return all;
    }
}
