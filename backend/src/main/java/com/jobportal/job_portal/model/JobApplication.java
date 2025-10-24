package com.jobportal.job_portal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateEmail;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @Column(name = "resume_url")
    private String resumeUrl;

    private String status = "Applied";

}
