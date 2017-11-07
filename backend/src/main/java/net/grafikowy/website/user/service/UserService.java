package net.grafikowy.website.user.service;

import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User saveUser(String email, String password, String firstName, String lastName) {
        User user = new User(email, bCryptPasswordEncoder.encode(password), firstName, lastName);
        return userRepository.save(user);
    }
}
