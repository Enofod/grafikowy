package net.grafikowy.website;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping(value = "/test", produces = MediaType.APPLICATION_JSON_VALUE)
    public TestModel test() {
        return new TestModel("test", "test");
    }

    @GetMapping(value = "/kotlet", produces = MediaType.APPLICATION_JSON_VALUE)
    public TestModel kotlet() {
        return new TestModel("kotlet", "kotlet");
    }
}
