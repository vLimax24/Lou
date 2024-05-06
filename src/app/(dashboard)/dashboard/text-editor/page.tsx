"use client"

import { AddDocumentDialog } from "./AddDocumentDialog"
import { useConvexAuth, useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"


const Page = () => {
  const { isAuthenticated } = useConvexAuth()
  const documents = useQuery(
    api.documents.getDocuments,
    !isAuthenticated ? "skip" : undefined
  )
  const user = useQuery(api.users.getMyUser)
  const deleteDocument = useMutation(api.documents.deleteDocument)
  const leaveDocument = useMutation(api.documents.leaveDocument)

  const checkIfDocumentOwner = (documentId:any) => {
    const document = documents?.find((doc:any) => doc._id === documentId)
    if (document?.owner === user?._id) {
      return true
    } else {
      return false
    }
  }


  const GetUserProfileImage = ({ document }: { document: Id<"documents"> }) => {
    const getAllowedUsersProfileImages = useQuery(api.documents.getAllowedUsersProfileImages, { documentId: document })
  
    return (
      <div className="flex mr-10 size-12 items-center justify-center">
        {getAllowedUsersProfileImages?.map((userImage, index) => (
          <Image
            src={userImage}
            alt="test"
            width={30}
            height={30}
            className="rounded-full mx-0.5 h-6 w-6"
            key={userImage}
            style={{ position: "absolute", left: `${index * 12}px`, zIndex: index }}
          />
        ))}
      </div>
    )
  }


  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Documents</h1>
        <AddDocumentDialog />
      </div>
      <div className="flex flex-col">
        {documents?.map((document) => (
          <Card key={document._id} className="w-full p-5 h-20 flex justify-between my-2 items-center border-noen">
              <Link href={`/dashboard/text-editor/doc/${document._id}`}>
                <h1>{document.name}</h1>
              </Link>
              <div className="flex items-center">
                <div className="relative">
                  <GetUserProfileImage document={document._id} />
                </div>
                <Link href={`/dashboard/text-editor/doc/${document._id}`} className="w-16">
                  <Button className="w-12 text-sm h-8 bg-primaryGray hover:bg-primaryHoverGray">
                    Go
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className="size-6 ml-4 hover:cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    {checkIfDocumentOwner(document._id) ? (
                        <DropdownMenuItem 
                          className="text-red-500 hover:text-red-600" 
                          onClick={async () => {
                            await deleteDocument({ documentId: document._id })
                            toast.success("Document deleted")
                        }}>
                          Delete
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          className="text-red-500 hover:text-red-600" 
                          onClick={async () => {
                            if (user?._id) {
                              await leaveDocument({ documentId: document._id, userId: user._id })
                              toast.success("You left the document")
                            }
                          }}
                        >
                          Leave
                        </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
          </Card>
        ))}
      </div>
    </div>
  )

  
}

export default Page

