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
import { useTranslations } from "next-intl"

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
  const t = useTranslations()
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
        <DialogHeader className="text-left">
          <DialogTitle>
            {t("Dashboard.dialogs.labels.addLabelTo.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.labels.addLabelTo.description")}
          </DialogDescription>
        </DialogHeader>
        <LabelSelector entityId={entityId} />
      </DialogContent>
    </Dialog>
  )
}
