import { BarChart, Card } from "@tremor/react"
import { CardTitle, CardDescription } from "@/components/ui/card"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"


export function GradeBarChart() {

  const studentSubjects = useQuery(api.studentSubjects.getStudentSubjects)
  const subjects = useQuery(api.studentSubjects.getUserSubjects)

  
  const subjectData = subjects?.map((subject) => {
    return studentSubjects?.map((studentSubject) => {
      if (subject._id === studentSubject.subjectId) {
        return {
          "subjectName": subject.name,
          "Total Average": Number(studentSubject?.totalAverage),
        }
      }
      return null
    }).filter(Boolean)
  }).flat() || []


  return (
    <>
      <Card className="w-full ml-1">
        <CardTitle className='flex items-center justify-start'>Grades</CardTitle>
        <CardDescription>View your current grade averages</CardDescription>
        <BarChart
          data={subjectData}
          index="subjectName"
          categories={
            ["Total Average"]
          }
          colors={["blue"]}
          yAxisWidth={32}
          className="mt-6 block h-60"
        />
      </Card>
    </>
  )
}
