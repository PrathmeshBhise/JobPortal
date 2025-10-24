package com.jobportal.job_portal.repository;

import com.jobportal.job_portal.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {

    //find jobs by location
    List<Job> findByLocationContainingIgnoreCase(String location);

    //find jobs by location
    List<Job> findBySkillsRequiredContainingIgnoreCase(String skill);

    //find jobs by employer email
    List<Job> findByEmployerEmail(String email);

    //find jobs



}
