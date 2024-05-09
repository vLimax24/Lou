"use client"
import "./tiptap.style.css"
import { useMemo } from "react"
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
const getRandomElement = ( list:Array<string >) => list[Math.floor(Math.random() * list.length)]

const getRandomColor = () => getRandomElement(colors)
const doc = new Y.Doc()

const Tiptap = ({
  onChange,
  documentId
}: {
  description: string;
  onChange: (richText: any) => void;
  documentId: string;
}) => {
  const [status, setStatus] = useState("connecting")
  const {session} = useSession()
// wra[ provider in useMemo hook
  const provider = useMemo(() => new TiptapCollabProvider({
    name: documentId,
    appId: "6kpgeqkq",
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTUwMDk4NjIsIm5iZiI6MTcxNTAwOTg2MiwiZXhwIjoxNzE1MDk2MjYyLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiI2a3BnZXFrcSJ9.pefyBhJgsarPA7cb6ngc-GbHd7jSh4sjFbDic3Q6JAk", // Your JWT token
    document: doc,
    // onSynced: () => {
    //   if (!doc.getMap("config").get("initialContentLoaded") && editor) {
      
    //     doc.getMap("config").set("initialContentLoaded", true)
      
    //     editor.commands.setContent(description)
    //   }
    // },
  }), [documentId])



  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false,}),
      Collaboration.configure({
        document: doc,
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
    provider.on("status", (event:any) => {
      setStatus(event.status)
    })

  }, [provider])


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
