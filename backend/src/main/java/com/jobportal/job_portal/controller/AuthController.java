package com.jobportal.job_portal.controller;

import com.jobportal.job_portal.dto.JwtLoginResponse;
import com.jobportal.job_portal.dto.LoginRequest;
import com.jobportal.job_portal.dto.RegisterRequest;
import com.jobportal.job_portal.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtLoginResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        JwtLoginResponse jwtLoginResponse = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(jwtLoginResponse);

    }



}
