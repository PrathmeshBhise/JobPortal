package com.jobportal.job_portal.security;

import com.jobportal.job_portal.model.User;
import com.jobportal.job_portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;



    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository=userRepository;

    }

    public UserDetails loadUserByUsername(String email)throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User Not Found"));

        String role = user.getRole().name().replace("ROLE_","");
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(role)
                .build();

    }



}
