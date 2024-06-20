"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LabelSelector } from "./LabelSelector"
import { Dispatch, SetStateAction } from "react"

type Props = {
  entityId: any
  dialogOpen: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const LabelSelectorDialog = ({
  entityId,
  dialogOpen,
  setDialogOpen,
}: Props) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Label</DialogTitle>
          <DialogDescription>Add a new label for yourself.</DialogDescription>
        </DialogHeader>
        <LabelSelector entityId={entityId} />
      </DialogContent>
    </Dialog>
  )
}
