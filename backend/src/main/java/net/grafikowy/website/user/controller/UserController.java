package net.grafikowy.website.user.controller;

import net.grafikowy.website.user.constants.AuthorityConstant;
import net.grafikowy.website.user.controller.dto.UserDTO;
import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody @Valid UserDTO userDTO) {
        User saveUser = userService.saveUser(userDTO.getEmail(), userDTO.getPassword(), userDTO.getFirstName(), userDTO.getLastName(), userDTO.getPhone(), AuthorityConstant.USER);
        logger.info("Created user: {}", saveUser);
    }
}
