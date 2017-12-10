package net.grafikowy.website.shift.controller.dto;

import java.util.List;

public class CalendarDTO {
    private int year;
    private int month;
    private String userEmail;
    private String groupName;
    private List<ShiftDayTypeDTO> shiftInDay;

    public CalendarDTO(int year, int month, String userEmail, String groupName, List<ShiftDayTypeDTO> shiftInDay) {
        this.year = year;
        this.month = month;
        this.userEmail = userEmail;
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

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
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
