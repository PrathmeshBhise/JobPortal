package com.jobportal.job_portal.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtLoginResponse {
    private String token;
    private String name;
    private Long id;
    private String email;
    private String role;
}
