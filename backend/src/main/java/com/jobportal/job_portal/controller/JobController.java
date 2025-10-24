package com.jobportal.job_portal.controller;

import com.jobportal.job_portal.model.Job;
import com.jobportal.job_portal.model.JobApplication;
import com.jobportal.job_portal.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService){
        this.jobService=jobService;
    }


    //Post - Employer Posts Jobs
    @PreAuthorize("hasRole('EMPLOYER')")
    @PostMapping("/create")
    public Job postJob(@Valid @RequestBody Job job, Authentication authentication){
        String employerEmail = authentication.getName();
        job.setEmployerEmail(employerEmail);
        return jobService.postJob(job);
    }

    //Get - Get all jobs
    @GetMapping("/all")
    public List<Job> getAllJob(){
        return jobService.getAllJobs();
    }

    //Get - Get job by either skill or location , or both
    @GetMapping("/search")
    public List<Job> searchJob(
            @RequestParam(required = false)String skill,
            @RequestParam(required = false)String location
    ){
        if(skill != null && location != null){
            return jobService.getJobsBySkills(skill).stream()
                    .filter(job->job.getLocation().toLowerCase().contains(location.toLowerCase())).toList();
        } else if (skill != null) {
            return jobService.getJobsBySkills(skill);
        } else if (location != null) {
            return jobService.getJobsByLocation(location);
        }else {
            return jobService.getAllJobs();
        }
    }

    //Get - List of jobs posted by the Employer
    @PreAuthorize("hasRole('EMPLOYER')")
    @GetMapping("/employer")
    public List<Job> getEmployerJobs(Authentication authentication){
        String employerEmail = authentication.getName();
        return jobService.getJobsByEmployerEmail(employerEmail);
    }


    @PreAuthorize("hasRole('CANDIDATE')")
    @GetMapping("/candidate/application")
    public List<JobApplication> viewCandidateApplications(Authentication authentication){
        String candidateEmail = authentication.getName();
        return jobService.getCandidateApplications(candidateEmail);
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    @GetMapping("/employer/application")
    public List<JobApplication> viewApplicationsForEmployer(Authentication authentication){
        String employerEmail = authentication.getName();
        return jobService.getApplicationsForEmployer(employerEmail);
    }

    //Post - Apply for Job
    @PreAuthorize("hasRole('CANDIDATE')")
    @PostMapping("/apply")
    public ResponseEntity<String> applyForJobWithResume(
            @RequestParam Long jobId,
            @RequestParam("resume") MultipartFile resume,
            Authentication authentication) throws IOException {
        if(resume.isEmpty()){
            return ResponseEntity.badRequest().body("Resume File is Required");
        }

        String candidateEmail = authentication.getName();
        String resumePath = jobService.storeResume(resume,candidateEmail);
        jobService.applyForJobWithResume(jobId,candidateEmail,resumePath);
        return ResponseEntity.status(HttpStatus.CREATED).body("Candidate " + candidateEmail + " applied for Job ID " + jobId);
    }
}
