package net.grafikowy.website.util.initloader;

import net.grafikowy.website.shift.model.ShiftType;
import net.grafikowy.website.shift.service.ShiftService;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Component
public class ShiftInitLoader {

    private ShiftService shiftService;

    public ShiftInitLoader(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    public void load() {
        shiftService.addShift(1, LocalDate.now(), ShiftType.DAY, 1);
        shiftService.addShift(2, LocalDate.now().plusDays(1), ShiftType.NIGHT, 1);
        //shiftService.addShift(2, LocalDate.now().plusDays(5), ShiftType.NIGHT, 2);
        //shiftService.addShift(2, LocalDate.now().minusDays(1), ShiftType.NIGHT, 1);
        //shiftService.addShift(1, LocalDate.now().plusDays(7), ShiftType.DAY, 2);
        //shiftService.addShift(2, LocalDate.now().minusDays(2), ShiftType.NIGHT, 1);
    }

}
