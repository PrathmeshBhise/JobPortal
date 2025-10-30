import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { jobsApi, applicationsApi } from '@/lib/api';
import { PlusCircle, Briefcase, FileText, ExternalLink, User, Building2, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('post-job');
  const [applications, setApplications] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
  });

  // Profile state
  const [profile, setProfile] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    phone: '',
    location: '',
    description: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications();
    } else if (activeTab === 'my-jobs') {
      fetchPostedJobs();
    }
  }, [activeTab]);

  const fetchPostedJobs = async () => {
    setIsLoading(true);
    try {
      const response = await jobsApi.searchJobs();
      setPostedJobs(response.data);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await applicationsApi.getEmployerApplications();
      setApplications(response.data);
    } catch (error) {
      toast.error('Failed to fetch applications');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await jobsApi.createJob(jobData);
      toast.success('Job posted successfully!');
      setJobData({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        type: 'Full-time',
      });
      setShowJobForm(false);
      fetchPostedJobs();
    } catch (error) {
      toast.error('Failed to post job');
    }
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditingProfile(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'secondary';
      case 'accepted':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your job postings and applications</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="post-job" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Post Job
            </TabsTrigger>
            <TabsTrigger value="my-jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              My Jobs
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Post Job Tab */}
          <TabsContent value="post-job">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Post New Job
                </CardTitle>
                <CardDescription>Create a new job posting to attract candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostJob} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        value={jobData.title}
                        onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                        required
                        placeholder="e.g. Senior Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={jobData.company}
                        onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
                        required
                        placeholder="e.g. Tech Corp"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      value={jobData.description}
                      onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                      required
                      rows={4}
                      placeholder="Describe the role, requirements, and responsibilities..."
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={jobData.location}
                        onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                        placeholder="e.g. New Delhi, DL"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary Range</Label>
                      <Input
                        id="salary"
                        value={jobData.salary}
                        onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                        placeholder="e.g. 80k - 120k"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Input
                        id="type"
                        value={jobData.type}
                        onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
                        placeholder="e.g. Full-time"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Post Job
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Jobs Tab */}
          <TabsContent value="my-jobs">
            <Card>
              <CardHeader>
                <CardTitle>My Posted Jobs</CardTitle>
                <CardDescription>View and manage all your job postings</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : postedJobs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No jobs posted yet. Create your first job posting!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {postedJobs.map((job: any) => (
                      <Card key={job.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{job.title}</CardTitle>
                              <CardDescription>{job.company} • {job.location}</CardDescription>
                            </div>
                            <Badge>{job.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                          {job.salary && (
                            <p className="text-sm font-medium">Salary: {job.salary}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Applications Received
                </CardTitle>
                <CardDescription>Review and manage candidate applications</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : applications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No applications received yet
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate Email</TableHead>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Resume</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app: any) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.candidateEmail}</TableCell>
                            <TableCell>{app.job?.title || 'N/A'}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(app.status)}>
                                {app.status || 'Applied'}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date().toLocaleDateString()}</TableCell>
                            <TableCell>
                              {app.resumeUrl ? (
                                <a
                                  href={app.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline inline-flex items-center gap-1"
                                >
                                  View Resume
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              ) : (
                                <span className="text-muted-foreground">No resume</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Manage your company information</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
                  >
                    {isEditingProfile ? 'Save Profile' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyName"
                        value={profile.companyName}
                        onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                        disabled={!isEditingProfile}
                        placeholder="Tech Corp Inc."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input value={user?.email || ''} disabled />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={profile.industry}
                      onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                      disabled={!isEditingProfile}
                      placeholder="e.g. Technology, Finance, Healthcare"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Input
                      id="companySize"
                      value={profile.companySize}
                      onChange={(e) => setProfile({ ...profile, companySize: e.target.value })}
                      disabled={!isEditingProfile}
                      placeholder="e.g. 50-200 employees"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      disabled={!isEditingProfile}
                      placeholder="https://www.example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditingProfile}
                        placeholder="+91 1234567890"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditingProfile}
                      placeholder="New Delhi, DL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={profile.description}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    disabled={!isEditingProfile}
                    placeholder="Tell candidates about your company, culture, and values..."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;
