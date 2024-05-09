"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { LabelSelector } from "./LabelSelector"

type Props = {
  entityId: any;
};

export const LabelSelectorDialog = ({ entityId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
          Add Label
      </DialogTrigger>
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