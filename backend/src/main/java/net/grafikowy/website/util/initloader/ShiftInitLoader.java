package net.grafikowy.website.util.initloader;

import net.grafikowy.website.shift.model.ShiftType;
import net.grafikowy.website.shift.service.ShiftService;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ShiftInitLoader {

    private ShiftService shiftService;

    public ShiftInitLoader(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    public void load() {
        shiftService.addShift(1, LocalDate.now(), ShiftType.DAY, 1);
    }
}
