package net.grafikowy.website.schedule.model;

import net.grafikowy.website.shift.controller.dto.UserShiftsDTO;
import net.grafikowy.website.shift.model.ShiftType;

import java.util.List;
import java.util.Map;

public class Schedule {
	private int year;
	private int month;
	private List<UserShiftsDTO> userShifts;

	public Schedule(int year, int month, List<UserShiftsDTO> userShifts) {
		this.year = year;
		this.month = month;
		this.userShifts = userShifts;
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

	public List<UserShiftsDTO> getUserShifts() {
		return userShifts;
	}

	public void setUserShifts(List<UserShiftsDTO> userShifts) {
		this.userShifts = userShifts;
	}
}
