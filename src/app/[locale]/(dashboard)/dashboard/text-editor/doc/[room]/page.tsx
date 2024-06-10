"use client"

import { TiptapCollabProvider } from "@hocuspocus/provider"
import "iframe-resizer/js/iframeResizer.contentWindow"
import { useSearchParams } from "next/navigation"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import { Doc as YDoc } from "yjs"

import { BlockEditor } from "@/components/BlockEditor"
import { createPortal } from "react-dom"
import { Surface } from "@/components/tiptapUI/Surface"
import { Toolbar } from "@/components/tiptapUI/Toolbar"
import { Icon } from "@/components/tiptapUI/Icon"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TriangleAlert } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const useDarkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => setIsDarkMode(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = useCallback(() => setIsDarkMode(isDark => !isDark), [])
  const lightMode = useCallback(() => setIsDarkMode(false), [])
  const darkMode = useCallback(() => setIsDarkMode(true), [])

  return {
    isDarkMode,
    toggleDarkMode,
    lightMode,
    darkMode,
  }
}

export default function Document({ params }: { params: { room: string } }) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null)
  const [collabToken, setCollabToken] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const { room } = params
  const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1
  const user = useQuery(api.users.getMyUser)
  const documentQuery = useQuery(api.documents.getSpecificDocument, {
    documentId: room as Id<"documents">,
  })

  const isOwner = documentQuery?.owner === user?._id
  const userId: any = user?._id

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch("/api/collaboration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json()

      const { token } = data

      // set state when the data received
      setCollabToken(token)
    }

    dataFetch()
  }, [])

  const ydoc = useMemo(() => new YDoc(), [])

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${room}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? "",
          token: collabToken,
          document: ydoc,
        })
      )
    }
  }, [setProvider, collabToken, ydoc, room, hasCollab])

  if (hasCollab && (!collabToken || !provider)) return
  return (
    <>
      {documentQuery?.accessType === "EVERYONE" ? (
        <BlockEditor
          hasCollab={hasCollab}
          ydoc={ydoc}
          provider={provider}
          isOwner={isOwner}
        />
      ) : (
        <>
          {documentQuery?.accessType === "RESTRICTED" &&
          (!documentQuery?.allowedUsers ||
            !documentQuery?.allowedUsers.includes(userId)) ? (
            <div className="flex h-full w-full flex-col items-center justify-center ">
              <TriangleAlert size={200} className="text-black" />
              <p className="mt-6 text-2xl font-bold text-black">
                You are not allowed to view this document
              </p>
              <div className="flex">
                <Link
                  href={"/dashboard/text-editor"}
                  className="mt-6 text-black"
                >
                  <Button className="mx-2 w-40 bg-black transition-all duration-300 ease-linear hover:cursor-pointer hover:bg-black">
                    Back
                  </Button>
                </Link>
                <Link href={"/dashboard"} className="mt-6 text-black">
                  <Button variant={"outline"} className="mx-2 w-40">
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {!documentQuery ? (
                <div>
                  <Skeleton className="my-2 h-8 w-72 rounded-md" />
                  <Skeleton className="my-2 h-8 w-48 rounded-md" />
                  <Skeleton className="my-2 h-8 w-96 rounded-md" />
                  <Skeleton className="my-2 h-8 w-56 rounded-md" />
                </div>
              ) : (
                <BlockEditor
                  hasCollab={hasCollab}
                  ydoc={ydoc}
                  provider={provider}
                  isOwner={isOwner}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
