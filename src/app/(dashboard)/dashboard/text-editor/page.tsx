"use client"

import { AddDocumentDialog } from "./AddDocumentDialog"
import { useConvexAuth, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Page = () => {
  const { isAuthenticated } = useConvexAuth()
  const documents = useQuery(
    api.documents.getDocuments,
    !isAuthenticated ? "skip" : undefined
  )


  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Documents</h1>
        <AddDocumentDialog />
      </div>
      <div className="flex flex-wrap">
        {documents?.map((document) => (
          <Card key={document._id} className="w-80 p-5 h-52 flex flex-col justify-between m-4">
            <CardTitle>{document.name}</CardTitle>
              <Link href={`/dashboard/text-editor/doc/${document._id}`} className="w-full">
                <Button className="w-full">
                  Go to Document
                </Button>
              </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Page