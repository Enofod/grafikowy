package net.grafikowy.website.util.initloader;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

@Service
public class InitDataLoader implements InitializingBean {

    private AuthorityInitLoader authorityLoader;

    private UserInitLoader userInitLoader;

    public InitDataLoader(AuthorityInitLoader authorityLoader, UserInitLoader userInitLoader) {
        this.authorityLoader = authorityLoader;
        this.userInitLoader = userInitLoader;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        authorityLoader.load();
        userInitLoader.load();
    }
}
