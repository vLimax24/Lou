"use client"
import "./tiptap.style.css"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Toolbar from "./Toolbar"

import Collaboration from "@tiptap/extension-collaboration"
import * as Y from "yjs"
import { TiptapCollabProvider } from "@hocuspocus/provider"
import CollaborationCursor from "@tiptap/extension-collaboration-cursor"
import { useEffect, useState } from "react"
import { useSession } from "@clerk/nextjs"

const colors = ["#958DF1", "#F98181", "#FBBC88", "#FAF594", "#70CFF8", "#94FADB", "#B9F18D"]
const getRandomElement = list => list[Math.floor(Math.random() * list.length)]

const getRandomColor = () => getRandomElement(colors)
const doc = new Y.Doc()
const provider = new TiptapCollabProvider({
  name: "StudentOS.123w", // Unique document identifier for syncing. This is your document name.
  appId: "j9y886k1", // Your Cloud Dashboard AppID or `baseURL` for on-premises
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTQ1MTg1MjAsIm5iZiI6MTcxNDUxODUyMCwiZXhwIjoxNzE0NjA0OTIwLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJqOXk4ODZrMSJ9.TJRACww8IuPqo0f4UVgd2DQfeZh3TvzV48s5BGu8d0M", // Your JWT token
  document: doc,
  // onSynced: () => {
  //   if (!doc.getMap("config").get("initialContentLoaded") && editor) {
  //     doc.getMap("config").set("initialContentLoaded", true)

  //     editor.commands.setContent(description)
  //   }
  // },
})
const Tiptap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: any) => void;
}) => {
  const [status, setStatus] = useState("connecting")
  const {session} = useSession()


  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false,}),
      Collaboration.configure({
        document: doc, // Configure Y.Doc for collaboration
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: session?.user.fullName,
          color: getRandomColor(),
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input bg-back",
      },
    },
    
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
      console.log(editor.getJSON())
    },
  })

  useEffect(() => {
    // Update status changes
    provider.on("status", event => {
      setStatus(event.status)
    })

  }, [])


  return (
    <div className="flex min-h-[250px] flex-col justify-stretch">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="focus:outline-none" />
      {status === "connected"
            ? `${editor?.storage.collaborationCursor.users.length} user${editor?.storage.collaborationCursor.users.length === 1 ? "" : "s"} online in room`
            : "offline"}
    </div>
  )
}

export default Tiptap
