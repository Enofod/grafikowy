package net.grafikowy.website.schedule.model;

import net.grafikowy.website.shift.model.ShiftType;

import java.util.Map;

public class Schedule {
    private int year;
    private int month;
    private Map<Long, Map<Integer, ShiftType>> userShiftTypeInDay;

    public Schedule(int year, int month, Map<Long, Map<Integer, ShiftType>> userShiftTypeInDay) {
        this.year = year;
        this.month = month;
        this.userShiftTypeInDay = userShiftTypeInDay;
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

    public Map<Long, Map<Integer, ShiftType>> getUserShiftTypeInDay() {
        return userShiftTypeInDay;
    }

    public void setUserShiftTypeInDay(Map<Long, Map<Integer, ShiftType>> userShiftTypeInDay) {
        this.userShiftTypeInDay = userShiftTypeInDay;
    }
}
