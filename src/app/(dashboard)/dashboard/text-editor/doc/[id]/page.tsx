"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useParams } from "next/navigation"
import ShareDocument from "./ShareDocument"
import Tiptap from "@/components/TipTap/TipTap"
import { useDebouncedCallback } from "use-debounce"
import { TriangleAlert } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const TextEditor = () => {
  const params = useParams<any>()
  const docId = params.id
  const user = useQuery(api.users.getMyUser)
  const documentQuery = useQuery(api.documents.getSpecificDocument, {
    documentId: docId,
  })

  const updateDocument = useMutation(api.documents.updateContent)

  const debouncedUpdates = useDebouncedCallback(
    async (editorString: any) => {
   
      await updateDocument({
        documentId: docId,
        newContent: editorString,
      })
      console.log("Content updated ran successfully")     
    },

    500
  )

  const isOwner = documentQuery?.owner === user?._id

//   const editor = useEditor({
//     extensions: [StarterKit.configure({})],
//     content: documentQuery?.content as JSONContent,
//     editable: true,
//     onUpdate: async ({ editor }) => {
//       const json = editor.getJSON()

//       await updateDocument({
//         documentId: docId,
//         newContent: json,
//       })
//       console.log("Content updated ran successfully")
//     },
//   })

const userId:any = user?._id

return (
  <>
    {documentQuery?.accessType === "EVERYONE" ? (
      <main className="flex flex-col items-center justify-between pr-10">
      <div className="flex w-full max-w-xl flex-col gap-6 rounded-md border bg-card p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[3rem] font-semibold">
            {!documentQuery ? (
              <Skeleton className="h-12 w-64 rounded-md" />
            ) : (
              documentQuery.name
            )}
          </h1>
          {isOwner && user && (
            <div>
              <ShareDocument document={documentQuery}/>
            </div>
          )}
        </div>
        {!documentQuery ? (
          <div>
            <Skeleton className="my-2 h-8 w-72 rounded-md" />
            <Skeleton className="my-2 h-8 w-48 rounded-md" />
            <Skeleton className="my-2 h-8 w-96 rounded-md" />
            <Skeleton className="my-2 h-8 w-56 rounded-md" />
          </div>
        ) : (
          <Tiptap description={documentQuery.content} onChange={debouncedUpdates}/>
        )}
      </div>
    </main>
    ) : (
      <>
        {documentQuery?.accessType === "RESTRICTED" && (!documentQuery?.allowedUsers || !documentQuery?.allowedUsers.includes(userId)) ? (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <TriangleAlert size={200}/>
        <p className="mt-6 text-2xl font-bold text-primaryGray">You are not allowed to view this document</p>
        <div className="flex">
          <Link href={"/dashboard/text-editor"} className="mt-6 text-primaryGray">
            <Button className="mx-2 w-40 bg-primaryGray hover:bg-primaryHoverGray hover:cursor-pointer transition-all ease-linear duration-300">Back</Button>
            <Button variant={"outline"} className="mx-2 w-40">Home</Button>
          </Link>
        </div>
      </div>
    ) : ( 
      <main className="flex flex-col items-center justify-between pr-10">
        <div className="flex w-full max-w-xl flex-col gap-6 rounded-md border bg-card p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-[3rem] font-semibold">
              {!documentQuery ? ( 
                <Skeleton className="h-12 w-64 rounded-md" />
              ) : (
                documentQuery.name
              )}
            </h1>
            {isOwner && user && (
              <div>
                <ShareDocument document={documentQuery}/>
              </div>
            )}
          </div>
          {!documentQuery ? (
            <div>
              <Skeleton className="my-2 h-8 w-72 rounded-md" />
              <Skeleton className="my-2 h-8 w-48 rounded-md" />
              <Skeleton className="my-2 h-8 w-96 rounded-md" />
              <Skeleton className="my-2 h-8 w-56 rounded-md" />
            </div>
          ) : (
            <Tiptap description={documentQuery.content} onChange={debouncedUpdates}/>
          )}
        </div>
      </main>
    )}
      </>
    )}
  </>
)


}

export default TextEditor
