import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"
import dayjs from "dayjs"
import { CalendarIcon } from "lucide-react"


type Props = {
    grade: Doc<"grades">
}

const GradeCard = ({grade}: Props) => {
  return (
    <Card key={grade._id}>
      <CardHeader>
        <CardTitle>{grade.topic}</CardTitle>
        <CardDescription className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{dayjs(grade.date).format("DD.MM.YYYY")}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="text-xl font-bold">Grade: </p>
          <p className="text-xl font-bold">{grade.grade}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default GradeCard
