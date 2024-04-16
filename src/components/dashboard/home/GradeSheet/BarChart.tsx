import { BarChart, Card } from "@tremor/react"
import { CardTitle, CardDescription } from "@/components/ui/card"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { convertLetterToGPA } from "@/utils/gpaCalculation"

export function GradeBarChart() {
  const studentSubjects = useQuery(api.studentSubjects.getStudentSubjects)
  const subjects = useQuery(api.studentSubjects.getUserSubjects)
  const user = useQuery(api.users.getMyUser)
  const countryId: any = user?.country
  const country: any = useQuery(api.countries.getSpecificCountry, { countryId })
  const gradingSystem = country?.system


  // Function to convert the Letter grade into GPA to display it corrctly in the bar chart
  const convertToGPA = (average: any) => {
    if (gradingSystem === "Letter") {
      if (!average) return 0
      console.log(average)
      const baseGPA = 4
      const gpaIncrement = baseGPA / (country?.possibleGrades?.length - 1)
      return convertLetterToGPA(average.toString(), baseGPA, gpaIncrement)
    }
    return average
  }

  const subjectData = subjects?.map((subject) => {
    return studentSubjects?.map((studentSubject) => {
      if (subject._id === studentSubject.subjectId) {
        return {
          "subjectName": subject.name,
          "Total Average": convertToGPA(studentSubject?.totalAverage),
        }
      }
      return null
    }).filter(Boolean)
  }).flat() || []

  return (
    <>
      <Card className="w-full ml-1">
        <CardTitle className='flex items-center justify-start'>Grades{country?.system === "Letter" && "*"}</CardTitle>
        <CardDescription>View your current grade averages </CardDescription>
        <BarChart
          data={subjectData}
          index="subjectName"
          categories={["Total Average"]}
          colors={["blue"]}
          yAxisWidth={32}
          className="mt-6 block h-60"
        />
        {country?.system === "Letter" && (
          <CardDescription>* Average is displayed in GPA insead of Letters</CardDescription>
        )}
      </Card>
    </>
  )
}

