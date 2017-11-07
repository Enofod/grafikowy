package net.grafikowy.website.util.initloader;

import net.grafikowy.website.user.constants.AuthorityConstant;
import net.grafikowy.website.user.model.Authority;
import net.grafikowy.website.user.repository.AuthorityRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthorityInitLoader {

    private AuthorityRepository authorityRepository;

    public AuthorityInitLoader(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    public void load() {
        authorityRepository.save(new Authority(AuthorityConstant.ADMIN));
        authorityRepository.save(new Authority(AuthorityConstant.USER));
    }
}
