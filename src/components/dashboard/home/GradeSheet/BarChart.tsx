import { BarChart } from "@tremor/react"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import {
  convertLetterToGPA,
  convertNumberToGPA,
  convertPercentageToGPA,
} from "@/utils/gpaCalculation"

export const GradeBarChart = () => {
  const studentSubjects = useQuery(api.studentSubjects.getStudentSubjects)
  const subjects = useQuery(api.studentSubjects.getUserSubjects)
  const user = useQuery(api.users.getMyUser)
  const countryId: any = user?.country
  const country: any = useQuery(api.countries.getSpecificCountry, { countryId })
  const gradingSystem = country?.system

  const convertToGPA = (average: any) => {
    if (gradingSystem === "Letter") {
      if (!average) return 0
      const baseGPA = 4
      const gpaIncrement = baseGPA / (country?.possibleGrades?.length - 1)
      return convertLetterToGPA(average.toString(), baseGPA, gpaIncrement)
    } else if (gradingSystem === "Number") {
      if (!average) return 0
      const baseGPA = 4
      const gpaIncrement = baseGPA / (country?.possibleGrades?.length - 1)
      return convertNumberToGPA(
        average.toString(),
        baseGPA,
        gpaIncrement
      ).toFixed(2)
    } else if (gradingSystem === "Percentage") {
      if (!average) return 0
      return convertPercentageToGPA(average.toString())
    }
    return average
  }

  const subjectData =
    subjects
      ?.map(subject => {
        return studentSubjects
          ?.map(studentSubject => {
            if (subject._id === studentSubject.subjectId) {
              return {
                subjectName: subject.name,
                "Total Average": convertToGPA(studentSubject?.totalAverage),
              }
            }
            return null
          })
          .filter(Boolean)
      })
      .flat() || []

  return (
    <>
      <Card className="m-5 mb-5 ml-5 mr-5 w-full border-none bg-white shadow-none">
        <CardTitle className="ml-2 flex items-center justify-start text-3xl font-semibold">
          Grades{country?.system === "Letter" && "*"}
        </CardTitle>
        <BarChart
          data={subjectData}
          index="subjectName"
          categories={["Total Average"]}
          colors={["#0089EC"]}
          yAxisWidth={32}
          className="mt-6 block h-60"
          onValueChange={() => {}}
        />
        {country?.system === "Letter" && (
          <CardDescription>
            * Average is displayed in GPA instead of Letters
          </CardDescription>
        )}
      </Card>
    </>
  )
}
