package com.jobportal.job_portal.service;

import com.jobportal.job_portal.dto.JwtLoginResponse;
import com.jobportal.job_portal.dto.RegisterRequest;
import com.jobportal.job_portal.model.User;
import com.jobportal.job_portal.repository.UserRepository;
import com.jobportal.job_portal.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new RuntimeException("Email already Registered");
        }
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole());

        userRepository.save(user);

        return "User Registered Successfully";
    }


    public JwtLoginResponse login(String email, String password){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        }
        catch (Exception e){
            throw new RuntimeException("Invalid Credentials");
        }
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));
        String token = jwtUtil.generateToken(email);
        return new JwtLoginResponse(
                token,
                user.getName(),
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

    }
}
