package net.grafikowy.website.shift.controller.dto;

import net.grafikowy.website.user.controller.dto.SimpleUserDetailsDTO;

import java.util.List;

/**
 * Created by DKUNERT on 2017-11-25.
 */
public class UserShiftsDTO {
    private SimpleUserDetailsDTO user;
    private List<ShiftDayTypeDTO> shiftInDay;

    public UserShiftsDTO(SimpleUserDetailsDTO user, List<ShiftDayTypeDTO> shiftInDay) {
        this.user = user;
        this.shiftInDay = shiftInDay;
    }

    public UserShiftsDTO() {
    }

    public SimpleUserDetailsDTO getUser() {
        return user;
    }

    public void setUser(SimpleUserDetailsDTO user) {
        this.user = user;
    }

    public List<ShiftDayTypeDTO> getShiftInDay() {
        return shiftInDay;
    }

    public void setShiftInDay(List<ShiftDayTypeDTO> shiftInDay) {
        this.shiftInDay = shiftInDay;
    }
}
