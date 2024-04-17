import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"
import { Trash } from "lucide-react"
import { EditSubjectDialog } from "../dashboard/Dialogs/subjects/EditSubjectDialog"
import Link from "next/link"
import { cn } from "@/lib/utils"

const colorMappings = [
  {
    name: "green-500",
    fromColor: "from-green-500",
    toColor: "to-green-600",
  },
  {
    name: "indigo-500",
    fromColor: "from-indigo-500",
    toColor: "to-indigo-600",
  },
  {
    name: "purple-500",
    fromColor: "from-purple-500",
    toColor: "to-purple-600",
  },
  {
    name: "teal-500",
    fromColor: "from-teal-500",
    toColor: "to-teal-600",
  },
  {
    name: "blue-500",
    fromColor: "from-blue-500",
    toColor: "to-blue-600",
  },
  {
    name: "yellow-500",
    fromColor: "from-yellow-500",
    toColor: "to-yellow-600",
  },
  {
    name: "pink-500",
    fromColor: "from-pink-500",
    toColor: "to-pink-600",
  },
  {
    name: "gray-500",
    fromColor: "from-gray-500",
    toColor: "to-gray-600",
  },
  {
    name: "orange-500",
    fromColor: "from-orange-500",
    toColor: "to-orange-600",
  },
  {
    name: "red-500",
    fromColor: "from-red-500",
    toColor: "to-red-600",
  },
]

const SubjectCard = ({ subject }: { subject: Doc<"subjects"> }) => {
  const colorMapping = colorMappings.find(
    color => color.name === subject.color
  )

  const { fromColor, toColor } = colorMapping || { fromColor: "", toColor: "" }

  return (
    <Card
      className={cn(
        "w-76 transition-all duration-150 ease-linear hover:scale-105",
        subject.color && `bg-gradient-to-r ${fromColor} ${toColor}`
      )}
    >
      <CardHeader>
        <Link
          href={`/dashboard/subjects/${subject._id}`}
          className="text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <CardTitle
            className={cn("text-2xl font-bold", subject.color && "text-white")}
          >
            {subject.name}
          </CardTitle>
        </Link>
      </CardHeader>
      {subject.addedByUser && (
        <CardContent className="p-0 px-2">
          <div className="mt-auto flex w-full items-center justify-end border-gray-200 py-2 text-white">
            <>
              <Trash
                size={20}
                className="mx-1 duration-300 hover:cursor-pointer hover:text-green-500 text-green-800"
              />
              <EditSubjectDialog
                name={subject.name}
                color={subject.color}
                id={subject._id}
              />
            </>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default SubjectCard