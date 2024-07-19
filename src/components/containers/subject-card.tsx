import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"
import { Trash } from "lucide-react"
import { EditSubject } from "../dashboard/Dialogs/subjects/SubjectDialog"
import Link from "next/link"
import { cn } from "@/lib/utils"
import ChemistryTemplate from "../../../public/templates/chemistry_template.svg"
import PhysicsTemplate from "../../../public/templates/physics_template.svg"
import BiologyTemplate from "../../../public/templates/biology_template.svg"
import HistoryTemplate from "../../../public/templates/history_tempalte.svg"
import CSTemplate from "../../../public/templates/cs_template.svg"
import EnglishTemplate from "../../../public/templates/english_template.svg"
import GermanTemplate from "../../../public/templates/german_template.svg"
import MathTemplate from "../../../public/templates/maths_template.svg"
import SpanishTemplate from "../../../public/templates/spanish_template.svg"
import FrenchTemplate from "../../../public/templates/french_template.svg"
import ItalianTemplate from "../../../public/templates/italian_template.svg"
import RussianTemplate from "../../../public/templates/russian_template.svg"
import LatinTemplate from "../../../public/templates/latin_template.svg"

import Image from "next/image"

const SubjectCard = ({ subject }: { subject: Doc<"subjects"> }) => {
  const template = subject.template

  return (
    <Link
      href={`/dashboard/subjects/${subject._id}`}
      className=" text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
    >
      <Card
        className={cn(
          "relative aspect-[143/40] w-full rounded-2xl transition-all duration-150 ease-linear hover:scale-105",
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
                    : template === "history"
                      ? HistoryTemplate
                      : template === "cs"
                        ? CSTemplate
                        : template === "english"
                          ? EnglishTemplate
                          : template === "german"
                            ? GermanTemplate
                            : template === "maths"
                              ? MathTemplate
                              : template === "spanish"
                                ? SpanishTemplate
                                : template === "french"
                                  ? FrenchTemplate
                                  : template === "italian"
                                    ? ItalianTemplate
                                    : template === "russian"
                                      ? RussianTemplate
                                      : template === "latin"
                                        ? LatinTemplate
                                        : ''
            }
            alt="test"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
          />
        )}
        <CardHeader className="relative z-10 flex h-full items-center justify-center">
          <CardTitle
            className={cn(
              "ml-28 w-full text-left text-3xl font-bold text-black"
            )}
          >
            {subject.name}
          </CardTitle>
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
    </Link>
  )
}

export default SubjectCard
