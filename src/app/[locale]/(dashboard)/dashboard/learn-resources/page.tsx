import { AddLabelDialog } from "@/components/dashboard/Dialogs/Labels/AddNewLabel"
import React from "react"


const page = () => {


  return (
    <div className="flex flex-col gap-6 space-y-4">
      <AddLabelDialog/>
    </div>
  )
}

export default page