package com.jobportal.job_portal.service;

import com.jobportal.job_portal.model.Job;
import com.jobportal.job_portal.model.JobApplication;
import com.jobportal.job_portal.repository.JobApplicationRepository;
import com.jobportal.job_portal.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.JobName;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public JobService(JobRepository jobRepository, JobApplicationRepository jobApplicationRepository){
        this.jobRepository=jobRepository;
        this.jobApplicationRepository=jobApplicationRepository;
    }

    public Job postJob(Job job){
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs(){
        return jobRepository.findAll();
    }

    public List<Job> getJobsByLocation(String location){
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Job> getJobsBySkills(String skills){
        return jobRepository.findBySkillsRequiredContainingIgnoreCase(skills);
    }
    public List<Job> getJobsByEmployerEmail(String email){

        return jobRepository.findByEmployerEmail(email);
    }

    public String storeResume(MultipartFile resume, String candidateEmail)throws IOException {
        String folder = System.getProperty("user.dir")+"uploads/resume/";

        File directory = new File(folder);
        if(!directory.exists()) {
            boolean created = directory.mkdirs();
            if(!created){
                throw new RuntimeException("Failed to create Directory"+folder);
            }
        }
        String safeEmail = candidateEmail.replaceAll("[^a-zA-Z0-9]","_");
        String filename = safeEmail + "_" +resume.getOriginalFilename();

        File file = new File(folder+filename);
        resume.transferTo(file);
        return file.getAbsolutePath();// to store path in DB

    }


    public void applyForJobWithResume(Long jobId, String candidateEmail, String resumePath){
        if(jobApplicationRepository.existsByCandidateEmailAndJob_Id(candidateEmail,jobId)){
            throw new RuntimeException("You have Already Applied for the Job !");
        }
        Job job = jobRepository.findById(jobId)
                .orElseThrow(()->new RuntimeException("Job Not found"));

        JobApplication application = new JobApplication();
        application.setCandidateEmail(candidateEmail);
        application.setJob(job);
        application.setResumeUrl(resumePath);

        jobApplicationRepository.save(application);
    }

    //List all application by a candidate
    public List<JobApplication> getCandidateApplications(String candidateEmail){
        return jobApplicationRepository.findByCandidateEmail(candidateEmail);
    }

    //List all application posted by employer
    public List<JobApplication> getApplicationsForEmployer(String employerEmail){
        List<Job> jobs = jobRepository.findByEmployerEmail(employerEmail);
        return jobs.stream().flatMap(job->jobApplicationRepository
                .findAll().stream()
                .filter(app->app
                        .getJob().getId().equals(job.getId()))).toList();
    }









}
