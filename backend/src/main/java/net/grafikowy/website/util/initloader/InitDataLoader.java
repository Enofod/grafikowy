package net.grafikowy.website.util.initloader;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

@Service
public class InitDataLoader implements InitializingBean {

    private AuthorityInitLoader authorityLoader;

    private UserInitLoader userInitLoader;
    private GroupInitLoader groupInitLoader;
    private ShiftInitLoader shiftInitLoader;

    public InitDataLoader(AuthorityInitLoader authorityLoader, UserInitLoader userInitLoader, GroupInitLoader groupInitLoader, ShiftInitLoader shiftInitLoader) {
        this.authorityLoader = authorityLoader;
        this.userInitLoader = userInitLoader;
        this.groupInitLoader = groupInitLoader;
        this.shiftInitLoader = shiftInitLoader;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        authorityLoader.load();
        userInitLoader.load();
        groupInitLoader.load();
        shiftInitLoader.load();
    }
}
