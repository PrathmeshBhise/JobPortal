import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const jobsApi = {
  searchJobs: (skill?: string, location?: string) => {
    const params = new URLSearchParams();
    if (skill) params.append('skill', skill);
    if (location) params.append('location', location);
    return api.get(`/jobs/search?${params.toString()}`);
  },
  createJob: (jobData: any) => api.post('/jobs/create', jobData),
};

export const applicationsApi = {
  applyToJob: (jobId: number, resume: File) => {
    const formData = new FormData();
    formData.append('jobId', jobId.toString());
    formData.append('resume', resume);
    return api.post('/jobs/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getCandidateApplications: () => api.get('/jobs/candidate/application'),
  getEmployerApplications: () => api.get('/jobs/employer/application'),
};

export default api;
