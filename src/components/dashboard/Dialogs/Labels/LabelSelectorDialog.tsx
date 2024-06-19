"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LabelSelector } from "./LabelSelector"
import { Tags } from "lucide-react"

type Props = {
  entityId: any
}

export const LabelSelectorDialog = ({ entityId }: Props) => {
  return (
    <Dialog>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Tags
              size={22}
              className="text-[#5B4F4F] duration-300 hover:cursor-pointer hover:text-primaryBlue"
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
