package net.grafikowy.website.user.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import net.grafikowy.website.config.SecurityProperties;
import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.repository.AuthorityRepository;
import net.grafikowy.website.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;
    private SecurityProperties securityProperties;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authorityRepository = authorityRepository;
        this.securityProperties = securityProperties;
    }

    @Transactional
    public User saveUser(String email, String password, String firstName, String lastName, String phone, String authorityName) {
        User user = new User(email, bCryptPasswordEncoder.encode(password), firstName, lastName, phone);
        user.setAuthorities(Collections.singleton(authorityRepository.getOne(authorityName)));

        logger.info("Save user: {}", user);
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
