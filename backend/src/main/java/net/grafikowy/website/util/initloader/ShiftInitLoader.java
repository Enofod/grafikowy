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
        String group1 = "Kardiolodzy";
        String group2 = "Anystezjolodzy";

        shiftService.addShift(1, LocalDate.now(), ShiftType.DAY, group1);
        shiftService.addShift(2, LocalDate.now().plusDays(1), ShiftType.NIGHT, group1);
        shiftService.addShift(2, LocalDate.now().plusDays(5), ShiftType.NIGHT, group2);
        shiftService.addShift(2, LocalDate.now().minusDays(4), ShiftType.NIGHT, group1);
        shiftService.addShift(1, LocalDate.now().plusDays(7), ShiftType.DAY, group2);
        shiftService.addShift(2, LocalDate.now().minusDays(2), ShiftType.NIGHT, group1);
    }

}
