package com.jobportal.job_portal.repository;

import com.jobportal.job_portal.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication,Long> {

    //Find all application by candidate email
    List<JobApplication> findByCandidateEmail(String candidateEmail);

    //Find if candidate applied for same job (to prevent double application)
    boolean existsByCandidateEmailAndJob_Id(String candidate, Long jobId);


}
