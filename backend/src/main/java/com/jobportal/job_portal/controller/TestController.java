package com.jobportal.job_portal.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class TestController {
    @GetMapping("/hello")
    public String publicHello(){
        return "Hello World";
    }

    @GetMapping("/profile")
    public String securedEndPoint(){
        return "This is Secured Endpoint";
    }
}
