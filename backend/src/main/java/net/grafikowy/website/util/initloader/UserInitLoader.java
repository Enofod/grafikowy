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
        userService.saveUser("jan@kowalski.pl", "trudne", "Jan", "Kowalski", "12331414141241", AuthorityConstant.ADMIN);
        userService.saveUser("b@b.pl", "b", "Mariola", "Kowalska", "1231241", AuthorityConstant.USER);
        userService.saveUser("c@c.pl", "c", "Janusz", "Ogórek", "12312414", AuthorityConstant.USER);
        userService.saveUser("d@d.pl", "d", "Wiesława", "Mączka", "12312414", AuthorityConstant.USER);
    }
}
