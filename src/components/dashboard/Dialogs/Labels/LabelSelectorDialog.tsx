"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LabelSelector } from "./LabelSelector"
import { TagIcon } from "lucide-react"

type Props = {
  entityId: any;
};

export const LabelSelectorDialog = ({ entityId }: Props) => {
  return (
    <Dialog>
      <Tooltip delayDuration={50} >
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <TagIcon
              size={20}
              className="duration-300 hover:cursor-pointer hover:text-green-500"
            />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Label</p>
        </TooltipContent>
      </Tooltip>
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