import { Icon } from "@/components/tiptapUI/Icon"
import { EditorInfo } from "./EditorInfo"
import { EditorUser } from "../types"
import { WebSocketStatus } from "@hocuspocus/provider"
import { Toolbar } from "@/components/tiptapUI/Toolbar"
import ShareDocument from "./ShareDocument"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { usePathname } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

export type EditorHeaderProps = {
  isSidebarOpen?: boolean
  toggleSidebar?: () => void
  characters: number
  words: number
  collabState: WebSocketStatus
  users: EditorUser[]
  isOwner?: boolean
}

export const EditorHeader = ({
  characters,
  collabState,
  users,
  words,
  isSidebarOpen,
  isOwner,
  toggleSidebar,
}: EditorHeaderProps) => {
  const pathname = usePathname()

  const segments = pathname.split("/")
  const documentIdStr = segments[segments.indexOf("doc") + 1]

  if (!documentIdStr) {
    throw new Error("Document ID not found in the URL")
  }

  const documentId: Id<"documents"> = documentIdStr as Id<"documents">

  const document = useQuery(api.documents.getSpecificDocument, {
    documentId: documentId,
  })
  return (
    <div className="flex flex-none flex-row items-center justify-between border-b border-neutral-200 bg-white py-2 pl-6 pr-3 text-black dark:border-neutral-800 dark:bg-black dark:text-white">
      <div className="flex flex-row items-center gap-x-1.5">
        <div className="flex items-center gap-x-1.5">
          <Toolbar.Button
            tooltip={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={isSidebarOpen ? "bg-transparent" : ""}
          >
            <Icon name={isSidebarOpen ? "PanelLeftClose" : "PanelLeft"} />
          </Toolbar.Button>
        </div>
      </div>
      <div className="flex gap-4">
        {isOwner && (
          <div>{document && <ShareDocument document={document} />}</div>
        )}
        <EditorInfo
          characters={characters}
          words={words}
          collabState={collabState}
          users={users}
        />
      </div>
    </div>
  )
}
