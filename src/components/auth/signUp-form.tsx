"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { env } from "@/env"
import { useSession } from "next-auth/react"

const SignUpForm = () => {
  const { data: session } = useSession()
  const signUp = async () => {
    await signIn("google", { callbackUrl: env.NEXT_PUBLIC_URL })

    console.log(session)


  }
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign up</h1>
        {/* <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p> */}
      </div>
      <div className="grid gap-4">
        {/* <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="John Doe" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Confirm Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Signup
        </Button> */}
        <Button variant="outline" className="w-full" onClick={signUp}>
          Sign up with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an Account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  )
}

export default SignUpForm
