"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"

interface Props {
  isOpen?: boolean
  onClose: () => void
  onClickConfirm?: () => void
}

const RepeatDialog = ({ isOpen, onClose, onClickConfirm }: Props) => {
  return (
    <div>
      { isOpen && (
        <Dialog open={isOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Changing the number of minutes will reset your timer.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-2">
              <Button onClick={onClickConfirm}>Ok</Button>
              <DialogClose>
                <Button onClick={ onClose }>Cancel</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default RepeatDialog
