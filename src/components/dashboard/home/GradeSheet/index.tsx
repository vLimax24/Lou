import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { subjectColors } from '@/utils/subjectColors';
 
const grades = [
    {
        subject: 'German',
        gradeAverage: 1.3
    },
    {
        subject: 'English',
        gradeAverage: 1.5
    },
    {
        subject: 'Mathematics',
        gradeAverage: 1.7
    },
    {
        subject: 'Chemistry',
        gradeAverage: 1.9
    },
    {
        subject: 'History',
        gradeAverage: 2.1
    },
    {
        subject: 'Geography',
        gradeAverage: 2.3
    },
    {
        subject: 'Physics',
        gradeAverage: 2.5
    },
    {
        subject: 'Biology',
        gradeAverage: 2.5
    },
    {
        subject: 'Mathematics',
        gradeAverage: 2.1
    },
    {
        subject: 'German',
        gradeAverage: 2.3
    },
    {
        subject: 'ComputerScience',
        gradeAverage: 2.5
    },
    {
        subject: 'Economics',
        gradeAverage: 2.5
    }
]
 
type CardProps = React.ComponentProps<typeof Card>;

export default function GradeSheetCard({ className, ...props }: CardProps) {

  return (
    <Card className={cn("w-3/5 h-96 max-h-96 mx-1", className)} {...props}>
      <CardHeader>
        <CardTitle>Grades</CardTitle>
        <CardDescription>Your current averages</CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <div className='grid grid-cols-4 '>
          {grades.map((grade, index) => (
            <div key={index} className={`w-52 h-20 ${subjectColors[grade.subject]} my-1 rounded-md px-2 flex flex-col items-start justify-center hover:scale-105 transition-all duration-300 ease-in-out hover:cursor-pointer`}>
                <h1 className={`${subjectColors[grade.subject]} text-md font-semibold text-white`}>{grade.subject}</h1>
                <h1 className='text-3xl text-white font-bold'>{grade.gradeAverage}</h1>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}