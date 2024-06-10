import { TiptapCollabProvider } from "@hocuspocus/provider"
import type { Doc as YDoc } from "yjs"

export interface TiptapProps {
  hasCollab: boolean
  isOwner?: boolean
  ydoc: YDoc
  provider?: TiptapCollabProvider | null | undefined
}

export type EditorUser = {
  clientId: string
  name: string
  color: string
  initials?: string
}
