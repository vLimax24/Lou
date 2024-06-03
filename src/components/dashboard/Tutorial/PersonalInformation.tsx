"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const schema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(/^[a-zA-Z0-9]+$/, "Invalid username format"),
})

type FormData = z.infer<typeof schema>

type Props = {
  username: any
  setUsername: React.Dispatch<any>
}

const PersonalInformation = ({ username, setUsername }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy="form">
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="username" data-cy="label">
          Username
        </Label>
        <Input
          id="username"
          {...register("username")}
          defaultValue={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full"
          data-cy="input"
        />
        {errors.username && (
          <span className="error-message" data-cy="error-message">
            {errors.username.message}
          </span>
        )}
      </div>
      <button type="submit" className="submit-button" data-cy="submit">
        Submit
      </button>
    </form>
  )
}

export default PersonalInformation
