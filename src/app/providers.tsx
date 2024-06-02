"use client"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import React from "react"

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
if (posthogKey && typeof window !== "undefined") {
  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  })
}

export const CSPostHogProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
