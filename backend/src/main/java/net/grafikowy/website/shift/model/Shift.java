package net.grafikowy.website.shift.model;

import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.user.model.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate shiftDate;
    private ShiftType shiftType;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_shifts", joinColumns = @JoinColumn(name = "shift_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> users = new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "group_id")
    private Group group;

    public Shift(LocalDate shiftDate, ShiftType shiftType, Group group) {
        this.shiftDate = shiftDate;
        this.shiftType = shiftType;
        this.group = group;
    }

    public Shift() {
    }

    public LocalDate getShiftDate() {
        return shiftDate;
    }

    public void setShiftDate(LocalDate shiftDate) {
        this.shiftDate = shiftDate;
    }

    public ShiftType getShiftType() {
        return shiftType;
    }

    public void setShiftType(ShiftType shiftType) {
        this.shiftType = shiftType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    @Override
    public String toString() {
        return "Shift{" +
                "id=" + id +
                ", shiftDate=" + shiftDate +
                ", shiftType=" + shiftType +
                ", users=" + users +
                ", group=" + group +
                '}';
    }
}
