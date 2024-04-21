import React, { useState, useTransition } from "react"
// convex
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Subjects from "../../Tutorial/Subjects"
import GradingSystem from "../../Tutorial/GradingSystem"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const TutorialDialog = ({ openDialog, setOpenDialog }: Props) => {
  // subjects
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const subjects = useQuery(api.subjects.getAllSubjects)
  const assignSubjects = useMutation(api.studentSubjects.assignStudentSubjects)

  //   grading system
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const updateGradeSystem = useMutation(api.users.updateGradeSystem)
  const countries = useQuery(api.countries.getCountries)

  //   component
  const [pending, startTransition] = useTransition()
  const [step, setStep] = useState<number>(1)
  const totalSteps = 2

  const handleStep = () => {
    if (step === 1) {
      if (selectedSubjects.length === 0) {
        return toast.error("You need to select atleast one subject.")
      }
      startTransition(async () => {
        try {
          await assignSubjects({
            subjectIds: selectedSubjects as Id<"subjects">[],
          })
          if (step < totalSteps) {
            toast.success("Thank you.")
            setStep(current => current + 1)
          }
        } catch (error) {
          toast.error("Error Adding Subjects.")
        }
      })
    }
    if (step === 2) {
      if (!selectedCountry) {
        toast.error("Please select your country for your grading system.")
        return
      } else {
        startTransition(async () => {
          try {
            await updateGradeSystem({ gradeSystem: selectedCountry })
            toast.success("Thank you.")
            setOpenDialog(false)
          } catch (error) {
            toast.error("Error updating grade system.")
          }
        })
      }
    }
  }

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-muted sm:rounded-3xl" hideCloseButton>
        <div className="flex flex-row items-center justify-between">
          {step === 1 && <SubjectsHeader />}
          {step === 2 && <GradingSystemHeader />}
          <p className="text-sm text-muted-foreground">
            Step {step}/{totalSteps}
          </p>
        </div>
        <ScrollArea className="max-h-96 lg:max-h-[550px]">
          {step === 1 && (
            <Subjects
              selectedSubjects={selectedSubjects}
              setSelectedSubjects={setSelectedSubjects}
              subjects={subjects}
            />
          )}
          {step === 2 && (
            <GradingSystem
              countries={countries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          )}
        </ScrollArea>

        <DialogFooter>
          <Button
            className="h-12 w-full"
            onClick={handleStep}
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : step === 1 ? (
              "Continue"
            ) : (
              "Get Started"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TutorialDialog

const SubjectsHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle>Select your Subjects</DialogTitle>
      <DialogDescription>
        (You can later add Subjects that don’t appear here)
      </DialogDescription>
    </DialogHeader>
  )
}
const GradingSystemHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle>Select your Country</DialogTitle>
    </DialogHeader>
  )
}
