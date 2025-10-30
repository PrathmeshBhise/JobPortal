import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { jobsApi, applicationsApi } from '@/lib/api';
import { Search, Upload, User, Briefcase, FileText, Mail, MapPin, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [skillKeyword, setSkillKeyword] = useState('');
  const [locationKeyword, setLocationKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  // Profile state
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    location: '',
    bio: '',
    skills: [] as string[],
    experience: '',
    education: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    fetchJobs();
    if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await applicationsApi.getCandidateApplications();
      setApplications(response.data);
    } catch (error) {
      toast.error('Failed to fetch applications');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await jobsApi.searchJobs();
      setJobs(response.data);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await jobsApi.searchJobs(skillKeyword || undefined, locationKeyword || undefined);
      setJobs(response.data);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyClick = (jobId: number) => {
    setSelectedJobId(jobId);
    setApplyDialogOpen(true);
  };

  const handleApplySubmit = async () => {
    if (!resumeFile || !selectedJobId) {
      toast.error('Please select a PDF resume');
      return;
    }

    if (resumeFile.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    try {
      await applicationsApi.applyToJob(selectedJobId, resumeFile);
      toast.success('Application submitted successfully!');
      setApplyDialogOpen(false);
      setResumeFile(null);
      setSelectedJobId(null);
      fetchApplications();
    } catch (error) {
      toast.error('Failed to submit application');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skillToRemove) });
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
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Manage your job search journey</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Browse Jobs
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              My Profile
            </TabsTrigger>
          </TabsList>

          {/* Browse Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by skill (e.g., Java, React)..."
                    value={skillKeyword}
                    onChange={(e) => setSkillKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
                <Input
                  placeholder="Location (e.g., Pune, Mumbai)..."
                  value={locationKeyword}
                  onChange={(e) => setLocationKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={isLoading}>
                  Search
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">No jobs found. Try adjusting your search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job: any) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApplyClick}
                    showApplyButton={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : applications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    You haven't applied to any jobs yet
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Applied Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app: any) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.job?.title || 'N/A'}</TableCell>
                            <TableCell>{app.job?.company || 'N/A'}</TableCell>
                            <TableCell>{app.job?.location || 'N/A'}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(app.status)}>
                                {app.status || 'Pending'}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date().toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Manage your profile details</CardDescription>
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
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        disabled={!isEditingProfile}
                        placeholder="John Doe"
                      />
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
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditingProfile}
                        placeholder="+91 1234567890"
                      />
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
                          placeholder="Delhi, DL"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditingProfile}
                      placeholder="Tell us about yourself and your career goals..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Add your technical and professional skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditingProfile && (
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                        placeholder="Add a skill (e.g., React, Python, Communication)"
                      />
                      <Button onClick={handleAddSkill} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No skills added yet</p>
                    ) : (
                      profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                          {skill}
                          {isEditingProfile && (
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                  <CardDescription>Your work experience and background</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    disabled={!isEditingProfile}
                    placeholder="Senior Software Engineer at Tech Corp (2020-Present)&#10;• Led team of 5 developers&#10;• Built scalable microservices..."
                    rows={6}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Your educational background</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    disabled={!isEditingProfile}
                    placeholder="Bachelor of Science in Computer Science&#10;University Name, 2016-2020"
                    rows={4}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>Your latest resume (PDF format)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      id="profile-resume"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                    />
                    <label htmlFor="profile-resume" className="cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload or update your resume</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF format, max 5MB</p>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply to Job</DialogTitle>
            <DialogDescription>
              Upload your resume (PDF only) to apply for this position
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="resume" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  {resumeFile ? (
                    <p className="text-sm font-medium">{resumeFile.name}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Click to upload resume</p>
                  )}
                </label>
              </div>
            </div>

            <Button onClick={handleApplySubmit} className="w-full" disabled={!resumeFile}>
              Submit Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CandidateDashboard;
