import React from "react"
import NotificationDialog from "../../notification"
import { Search } from "lucide-react"

const ActionBar = () => {
  return (
    <div className='flex mb-5 w-full items-start justify-center mr-5 ml-5 p-4 md:p-0'>
      <div className="relative flex-1 mr-20">
        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
        <input placeholder="Search for Events" className="py-4 pl-12 pr-4 rounded-xl w-full border-none border-transparent focus:border-transparent focus:ring-0"/>
      </div>
      <NotificationDialog />
    </div>
  )
}

export default ActionBar
