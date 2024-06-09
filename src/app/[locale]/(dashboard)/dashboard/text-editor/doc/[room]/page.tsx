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

  const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1

  const { room } = params

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
      <BlockEditor hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
    </>
  )
}
