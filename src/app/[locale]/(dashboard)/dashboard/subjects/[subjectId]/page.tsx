"use client"
import { useParams } from "next/navigation"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
// 
import { Loader2 } from "lucide-react"
import { AddNoteDialog } from "@/components/dashboard/Dialogs/notes/AddNoteDialog"
import { AddTaskDialog } from "@/components/dashboard/Dialogs/tasks/AddTaskDialog"
import GradeCard from "@/components/dashboard/Grades/GradeCard"
import NoteCard from "@/components/dashboard/Notes/NoteCard"
import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { AddGradeDialogWithSubject } from "@/components/dashboard/Dialogs/grades/AddGradeDialogWithSubject"
import SubjectSection from "@/components/containers/SubjectSection"


const SubjectPage = () => {
  const params = useParams<{ subjectId: Id<"subjects"> }>()
  const subjectId = params?.subjectId
  const subject = useQuery(api.subjects.getSubjectData, {
    subjectId: subjectId!,
  })

  const grades = useQuery(api.grades.getSubjectGrades, {
    subjectId: subjectId!,
  })

  if (!subject) {
    return <Loader2 className="h-12 w-12 animate-spin" />
  }

  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{subject?.subject.name}</h1>
        {subject.subject.addedByUser && (
          <Badge variant="outline">Your Subject</Badge>
        )}
      </div>
      <div className="grid gap-8">
        <SubjectSection
          title="Assignments"
          description="Assignments for your subject"
        >
          <h1>Here will be content for assignments</h1>
        </SubjectSection>
        <SubjectSection
          title="Grades"
          description="All your grades"
          addDialog={<AddGradeDialogWithSubject subjectId={subjectId} />}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {!grades ? (
              <Loader2 className="h-12 w-12 animate-spin" />
            ) : (
              grades?.map(grade => <GradeCard grade={grade} key={grade._id} />)
            )}
          </div>
        </SubjectSection>
        <SubjectSection
          title="Tasks"
          description="Tasks for your subject"
          addDialog={<AddTaskDialog subjectId={subject.subject._id} />}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {!subject.subjectTasks ? (
              <Loader2 className="h-12 w-12 animate-spin" />
            ) : (
              subject.subjectTasks.map(task => (
                <Card key={task._id}>
                  <CardHeader>
                    <p>{task.text}</p>
                  </CardHeader>
                  <CardFooter>
                    <Badge variant="outline">{task.status}</Badge>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </SubjectSection>
        <SubjectSection
          title="Notes"
          description="Notes for your subject"
          addDialog={<AddNoteDialog subjectId={subject.subject._id} />}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {!subject.subjectNotes ? (
              <Loader2 className="h-12 w-12 animate-spin" />
            ) : (
              subject.subjectNotes.map((note:any) => (
                <NoteCard note={note} key={note._id}/>
              ))
            )}
          </div>
        </SubjectSection>
        <SubjectSection title="Exams" description="Exmas in your subject">
          <h1>Here will be content for exams</h1>
        </SubjectSection>
      </div>
    </div>
  )
}

export default SubjectPage
