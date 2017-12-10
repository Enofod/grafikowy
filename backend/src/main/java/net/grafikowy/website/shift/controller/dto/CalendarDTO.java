package net.grafikowy.website.shift.controller.dto;

import java.util.List;

public class CalendarDTO {
    private int year;
    private int month;
    private long userId;
    private String groupName;
    private List<ShiftDayTypeDTO> shiftInDay;

    public CalendarDTO(int year, int month, long userId, String groupName, List<ShiftDayTypeDTO> shiftInDay) {
        this.year = year;
        this.month = month;
        this.userId = userId;
        this.groupName = groupName;
        this.shiftInDay = shiftInDay;
    }

    public CalendarDTO() {
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public List<ShiftDayTypeDTO> getShiftInDay() {
        return shiftInDay;
    }

    public void setShiftInDay(List<ShiftDayTypeDTO> shiftInDay) {
        this.shiftInDay = shiftInDay;
    }
}
