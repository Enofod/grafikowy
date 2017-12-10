package net.grafikowy.website.schedule.model;

import net.grafikowy.website.shift.controller.dto.UserShiftsDTO;

import java.util.List;

public class ScheduleDTO {
	private int year;
	private int month;
	private String groupName;
	private List<UserShiftsDTO> userShifts;

	public ScheduleDTO() {
	}

	public ScheduleDTO(int year, int month, String groupName, List<UserShiftsDTO> userShifts) {
		this.year = year;
		this.month = month;
		this.groupName = groupName;
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

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public List<UserShiftsDTO> getUserShifts() {
		return userShifts;
	}

	public void setUserShifts(List<UserShiftsDTO> userShifts) {
		this.userShifts = userShifts;
	}
}
