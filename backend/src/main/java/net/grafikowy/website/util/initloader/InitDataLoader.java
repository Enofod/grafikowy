package net.grafikowy.website.util.initloader;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

@Service
public class InitDataLoader implements InitializingBean {

    private AuthorityInitLoader authorityLoader;

    private UserInitLoader userInitLoader;
    private GroupInitLoader groupInitLoader;

    public InitDataLoader(AuthorityInitLoader authorityLoader, UserInitLoader userInitLoader, GroupInitLoader groupInitLoader) {
        this.authorityLoader = authorityLoader;
        this.userInitLoader = userInitLoader;
        this.groupInitLoader = groupInitLoader;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        authorityLoader.load();
        userInitLoader.load();
        groupInitLoader.load();
    }
}
