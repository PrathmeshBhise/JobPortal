import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: {
    id: number;
    title: string;
    description: string;
    skillsRequired?: string;
    employerEmail?: string;
    location?: string;
  };
  onApply?: (jobId: number) => void;
  showApplyButton?: boolean;
}

const JobCard = ({ job, onApply, showApplyButton = true }: JobCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            {job.employerEmail && (
              <CardDescription className="text-base font-medium text-foreground">
                {job.employerEmail}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">{job.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {job.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
          )}
          {job.skillsRequired && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Badge variant="outline">{job.skillsRequired}</Badge>
            </div>
          )}
        </div>

        {showApplyButton && onApply && (
          <Button 
            onClick={() => onApply(job.id)} 
            className="w-full"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
