package com.jobportal.job_portal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="Title is Required")
    @Size(max = 100, message = "Title Cannot Exceeds 100 characters ")
    private String title;

    @NotBlank(message = "Description is Required")
    @Size(max= 500 , message = "Description cannot Exceed 500 character")
    private String description;

    @NotBlank(message="Title is Required")
    @Size(max = 100, message = "Title Cannot Exceeds 100 characters ")
    private String company;

    @NotBlank(message = "Location is Required")
    private String location;

    @NotBlank(message = "Salary required cannot be empty")
    private String salary;

    @NotBlank(message = "Job Type required cannot be empty")
    private String type;

    @Column(name = "skillsRequired", nullable = true)
    private String skillsRequired;

    private String employerEmail; //email of whom positing job

}
