// NotificationDialog.js
import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

const NotificationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="ml-auto size-[3.45rem] border-none rounded-lg bg-primaryGray text-white hover:text-white hover:bg-primaryHoverGray">
          <Bell className="size-6" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Notifications</DialogTitle>
          <DialogDescription>
            Make changes to your notifications here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between w-full space-x-2">
            <Label htmlFor="grade-not">Grade Notifications</Label>
            <Switch id="grade-not" checked={true}/>
          </div>
          <div className="flex items-center justify-between w-full space-x-2">
            <Label htmlFor="exam-not">Exam Notifications</Label>
            <Switch id="exam-not" checked={true}/>
          </div>
          <div className="flex items-center justify-between w-full space-x-2">
            <Label htmlFor="assignment-not">Assignment Notifications</Label>
            <Switch id="assignment-not" checked={true}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className='w-full'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NotificationDialog
