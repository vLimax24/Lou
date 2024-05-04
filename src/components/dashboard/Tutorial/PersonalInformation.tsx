"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  username: any;
  setUsername: React.Dispatch<any>;
};

const PersonalInformation = ({username, setUsername}: Props) => {

  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        <Label>Username</Label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full"/>
      </div>
    </div>
  )
}

export default PersonalInformation
