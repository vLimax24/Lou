import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { subjectColors } from '@/utils/subjectColors';
 
const assignments = [
  {
    title: "Exam Preparation",
    date: "30-03-2024", // Date format changed to DD-MM-YYYY
    subject: "German", // Subject name corrected to capital "German"
  },
  {
    title: "Project Presentation",
    date: "15-03-2025", // Another example assignment
    subject: "History", // Subject name corrected to capital "History"
  },
  {
    title: "Exam Preparation",
    date: "30-03-2024", // Date format changed to DD-MM-YYYY
    subject: "German", // Subject name corrected to capital "German"
  },
  {
    title: "Project Presentation",
    date: "15-03-2025", // Another example assignment
    subject: "History", // Subject name corrected to capital "History"
  },
  {
    title: "Exam Preparation",
    date: "30-03-2024", // Date format changed to DD-MM-YYYY
    subject: "German", // Subject name corrected to capital "German"
  },
  {
    title: "Project Presentation",
    date: "15-03-2025", // Another example assignment
    subject: "History", // Subject name corrected to capital "History"
  },
];
 
type CardProps = React.ComponentProps<typeof Card>;

export default function AssignmentCard({ className, ...props }: CardProps) {
  const [remainingTime, setRemainingTime] = useState<(number | string)[]>([]);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const today = new Date();
      const remainingTimeArray = assignments.map(assignment => {
        const assignmentDate = new Date(assignment.date.split('-').reverse().join('-')); // Parsing date in DD-MM-YYYY format
        const differenceInTime = assignmentDate.getTime() - today.getTime();
        if (differenceInTime <= 0) {
          return "Expired";
        } else {
          const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
          if (differenceInDays === 0) {
            const differenceInHours = Math.ceil(differenceInTime / (1000 * 3600));
            return `${differenceInHours - 1} hour${differenceInHours !== 1 ? 's' : ''}`;
          } else {
            return `${differenceInDays} day${differenceInDays !== 1 ? 's' : ''}`;
          }
        }
      });
      setRemainingTime(remainingTimeArray);
    };

    calculateRemainingTime();
  }, []);

  const displayedAssignments = assignments.slice(0, 6);

  return (
    <Card className={cn("w-full my-2 md:my-0 md:w-4/5 mx-1", className)} {...props}>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
        <CardDescription>Your upcoming Assignments</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {displayedAssignments.length > 0 ? (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {displayedAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="mb-0.5 w-full items-start p-4 border rounded-md hover:scale-[1.03] hover:cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <div className="space-y-1">
                    <h1 className="text-sm font-semibold leading-none">
                      {assignment.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {assignment.date} - {remainingTime[index]} left
                    </p>
                    <Badge className={`${subjectColors[assignment.subject]} text-sm text-white`}>{assignment.subject}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1 className='text-bold'>You currently don&apos;t have any assignments!</h1>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}