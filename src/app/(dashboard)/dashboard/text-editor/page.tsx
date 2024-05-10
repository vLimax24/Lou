"use client"

import { LabelSelectorDialog } from "@/components/dashboard/Dialogs/Labels/LabelSelectorDialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useConvexAuth, useMutation, useQuery } from "convex/react"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { AddDocumentDialog } from "./AddDocumentDialog"
import LabelBadge from "@/components/common/LabelBadge"
import { TooltipProvider } from "@radix-ui/react-tooltip"

const Page = () => {
  const { isAuthenticated } = useConvexAuth()
  const documents = useQuery(
    api.documents.getDocuments,
    !isAuthenticated ? "skip" : undefined
  )
  const user = useQuery(api.users.getMyUser)
  const deleteDocument = useMutation(api.documents.deleteDocument)
  const leaveDocument = useMutation(api.documents.leaveDocument)

  const checkIfDocumentOwner = (documentId: any) => {
    const document = documents?.find((doc: any) => doc._id === documentId)
    if (document?.owner === user?._id) {
      return true
    } else {
      return false
    }
  }

  const GetUserProfileImage = ({ document }: { document: Id<"documents"> }) => {
    const getAllowedUsersProfileImages = useQuery(
      api.documents.getAllowedUsersProfileImages,
      { documentId: document }
    )

    return (
      <div className="m-4 flex size-12 items-center justify-center">
        {getAllowedUsersProfileImages?.map(userImage => (
          <Image
            src={userImage}
            alt="test"
            width={30}
            height={30}
            className="mx-0.5 h-6 w-6 rounded-full"
            key={userImage}
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
        {documents?.map(document => (
          <Card
            key={document._id}
            className="border-noen my-2 flex h-20 w-full items-center justify-between p-5"
          >
            <Link href={`/dashboard/text-editor/doc/${document._id}`}>
              <h1>{document.name}</h1>
            </Link>
            <div className="flex items-center gap-2">
              <GetUserProfileImage document={document._id} />
              <LabelBadge labels={document.labels} />
              <Link
                href={`/dashboard/text-editor/doc/${document._id}`}
                className="w-16"
              >
                <Button className="h-8 w-12 bg-primaryGray text-sm hover:bg-primaryHoverGray">
                  Go
                </Button>
              </Link>
              <TooltipProvider>
            
            
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreHorizontal className="ml-4 size-6 hover:cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={e => e.preventDefault()}>
                    <LabelSelectorDialog entityId={document._id} />
                  </DropdownMenuItem>
                  {checkIfDocumentOwner(document._id) ? (
                    <DropdownMenuItem
                      className="text-red-500 hover:text-red-600"
                      onClick={async () => {
                        await deleteDocument({ documentId: document._id })
                        toast.success("Document deleted")
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="text-red-500 hover:text-red-600"
                      onClick={async () => {
                        if (user?._id) {
                          await leaveDocument({
                            documentId: document._id,
                            userId: user._id,
                          })
                          toast.success("You left the document")
                        }
                      }}
                    >
                      Leave
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              </TooltipProvider>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Page
