"use client"

import { AddDocumentDialog } from "./AddDocumentDialog"
import { useConvexAuth, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Id } from "@/convex/_generated/dataModel"

const Page = () => {
  const { isAuthenticated } = useConvexAuth()
  const documents = useQuery(
    api.documents.getDocuments,
    !isAuthenticated ? "skip" : undefined
  )

  const user = useQuery(api.users.getMyUser)

  const checkIfDocumentOwner = (documentId:any) => {
    const document = documents?.find((doc:any) => doc._id === documentId)
    if (document?.owner === user?._id) {
      return true
    } else {
      return false
    }
  }

  const GetUserProfileImage = (document:Id<"documents">) => {

    const getAllowedUsersProfileImages = useQuery(api.documents.getAllowedUsersProfileImages, { documentId: document })

    return (
      <>
        {getAllowedUsersProfileImages?.map((userImage) => (
          <Image src={userImage} alt={"test"} width={30} height={30} className="rounded-full" key={userImage} />
        ))}
      </>
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
          <Card key={document._id} className="w-full p-5 h-20 flex justify-between my-2 items-center">
              <Link href={`/dashboard/text-editor/doc/${document._id}`}>
                <h1>{document.name}</h1>
              </Link>
              <div className="flex items-center">
                <div>
                  {/* <GetUserProfileImage document={document._id} /> */}
                </div>
                <Link href={`/dashboard/text-editor/doc/${document._id}`} className="w-16">
                  <Button className="w-16">
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
                      <DropdownMenuItem className="text-red-500 hover:text-red-600">Delete</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-red-500 hover:text-red-600">Leave</DropdownMenuItem>
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