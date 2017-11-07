package net.grafikowy.website.user.repository;

import net.grafikowy.website.user.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
