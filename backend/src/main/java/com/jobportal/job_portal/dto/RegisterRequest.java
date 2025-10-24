package com.jobportal.job_portal.dto;

import com.jobportal.job_portal.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RegisterRequest {


    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is Required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;


    private Role role;
}
