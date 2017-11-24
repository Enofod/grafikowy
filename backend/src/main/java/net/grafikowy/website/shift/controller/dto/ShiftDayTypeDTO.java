package net.grafikowy.website.shift.controller.dto;

import net.grafikowy.website.shift.model.ShiftType;

import java.time.LocalDate;

public class ShiftDayTypeDTO {
    private int day;
    private ShiftType shiftType;

    public ShiftDayTypeDTO(int day, ShiftType shiftType) {
        this.day = day;
        this.shiftType = shiftType;
    }

    public ShiftDayTypeDTO() {
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public ShiftType getShiftType() {
        return shiftType;
    }

    public void setShiftType(ShiftType shiftType) {
        this.shiftType = shiftType;
    }
}
