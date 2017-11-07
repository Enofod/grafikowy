package net.grafikowy.website.util.initloader;

import net.grafikowy.website.user.constants.AuthorityConstant;
import net.grafikowy.website.user.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserInitLoader {

    private UserService userService;

    public UserInitLoader(UserService userService) {
        this.userService = userService;
    }

    public void load() {
        userService.saveUser("admin@a.pl", "haslo", "Dawid", "Mistrz", "1231241", AuthorityConstant.ADMIN);
        userService.saveUser("user@u.pl", "haslo", "Dawid", "Mistrz", "1231241", AuthorityConstant.USER);
    }
}
