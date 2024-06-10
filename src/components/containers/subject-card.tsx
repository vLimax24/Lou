import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"
import { Trash } from "lucide-react"
import { EditSubjectDialog } from "../dashboard/Dialogs/subjects/EditSubjectDialog"
import Link from "next/link"
import { cn } from "@/lib/utils"
import ChemistryTemplate from "../../../public/templates/chemistry_template.svg"
import PhysicsTemplate from "../../../public/templates/physics_template.svg"
import BiologyTemplate from "../../../public/templates/biology_template.svg"
import HistoryTemplate from "../../../public/templates/history_tempalte.svg"
import Image from "next/image"

const SubjectCard = ({ subject }: { subject: Doc<"subjects"> }) => {
  const template = subject.template

  return (
    <Card
      className={cn(
        "relative aspect-[143/40] w-full transition-all duration-150 ease-linear hover:scale-105",
        template && "bg-cover bg-no-repeat"
      )}
    >
      {template && (
        <Image
          src={
            template === "chemistry"
              ? ChemistryTemplate
              : template === "physics"
                ? PhysicsTemplate
                : template === "biology"
                  ? BiologyTemplate
                  : HistoryTemplate
          }
          alt="test"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
      )}
      <CardHeader className="relative z-10 flex h-full items-center justify-center text-center">
        <Link
          href={`/dashboard/subjects/${subject._id}`}
          className=" text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <CardTitle
            className={cn("text-center text-3xl font-bold text-black")}
          >
            {subject.name}
          </CardTitle>
        </Link>
      </CardHeader>
      {/* {subject.addedByUser && (
        <CardContent className="relative z-10 p-0 px-2">
          <div className="mt-auto flex w-full items-center justify-end border-gray-200 py-2 text-white">
            <>
              <Trash
                size={20}
                className="mx-1 text-green-800 duration-300 hover:cursor-pointer hover:text-green-500"
              />
              <EditSubjectDialog
                name={subject.name}
                color={subject.color}
                id={subject._id}
              />
            </>
          </div>
        </CardContent>
      )} */}
    </Card>
  )
}

export default SubjectCard
