package net.grafikowy.website.shift.repository;

import net.grafikowy.website.group.model.Group;
import net.grafikowy.website.shift.model.Shift;
import net.grafikowy.website.shift.model.ShiftType;
import net.grafikowy.website.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    Set<Shift> findByUsersContainingAndGroupAndShiftDateBetween(User user, Group group, LocalDate startDate, LocalDate endDate);

    Optional<Shift> findByShiftDateAndShiftTypeAndGroup(LocalDate shiftDate, ShiftType shiftType, Group group);
}
