package net.grafikowy.website.group.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GroupNotFoundException extends Exception {
    public GroupNotFoundException(String message) {
        super(message);
    }
}
