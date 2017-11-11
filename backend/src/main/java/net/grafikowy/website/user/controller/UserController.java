package net.grafikowy.website.user.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import net.grafikowy.website.config.SecurityProperties;
import net.grafikowy.website.user.constants.AuthorityConstant;
import net.grafikowy.website.user.controller.dto.SignUpUserDTO;
import net.grafikowy.website.user.controller.dto.UserDetailsDTO;
import net.grafikowy.website.user.controller.exception.UserNotFoundException;
import net.grafikowy.website.user.model.User;
import net.grafikowy.website.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private SecurityProperties securityProperties;

    public UserController(UserService userService, SecurityProperties securityProperties) {
        this.userService = userService;
        this.securityProperties = securityProperties;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody @Valid SignUpUserDTO signUpUserDTO) {
        User saveUser = userService.saveUser(signUpUserDTO.getEmail(), signUpUserDTO.getPassword(), signUpUserDTO.getFirstName(), signUpUserDTO.getLastName(), signUpUserDTO.getPhone(), AuthorityConstant.USER);
        logger.info("Created user: {}", saveUser);
    }

    @GetMapping("/{userEmail}")
    public UserDetailsDTO getUser(@PathVariable String userEmail) throws UserNotFoundException {
        System.out.println("SEARCHING USEER");
        User storedUser = userService.findByEmail(userEmail).orElseThrow(() -> new UserNotFoundException("User with email: " + userEmail + "not found"));
        System.out.println(storedUser);
        return new UserDetailsDTO(storedUser.getEmail(), storedUser.getFirstName(), storedUser.getLastName(), storedUser.getPhone());
    }

    // ITS PROBABLY USELESS, BECOUSE THIS INFORMATION IS ON FRONTEND (JWT) - NO NEED TO CALL
    @GetMapping("/whoAmI")
    public UserDetailsDTO whoAmI(HttpServletRequest request) throws UserNotFoundException {
        String token = request.getHeader(securityProperties.getHeaderName());

        String userEmail = Jwts.parser()
                .setSigningKey(securityProperties.getSecret().getBytes())
                .parseClaimsJws(token.replace(securityProperties.getTokenPrefix(), ""))
                .getBody().getSubject();

        User storedUser = userService.findByEmail(userEmail).orElseThrow(() -> new UserNotFoundException("User with email: " + userEmail + "not found"));
        return new UserDetailsDTO(storedUser.getEmail(), storedUser.getFirstName(), storedUser.getLastName(), storedUser.getPhone());
    }
}
