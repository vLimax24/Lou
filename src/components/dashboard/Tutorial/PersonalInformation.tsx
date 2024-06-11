"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  username: any
  setUsername: React.Dispatch<any>
}

const PersonalInformation = ({ username, setUsername }: Props) => {
  return (
    <form data-cy="form">
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="username" data-cy="label">
          Username
        </Label>
        <Input
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full"
          data-cy="input"
        />
      </div>
    </form>
  )
}

export default PersonalInformation
