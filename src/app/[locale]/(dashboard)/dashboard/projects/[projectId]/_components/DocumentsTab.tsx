import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { AddDocumentDialog } from "../../../text-editor/AddDocumentDialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import Link from "next/link"


const DocumentsTab = ({ project }: { project: any}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const linkDocument = useMutation(api.projects.linkDocument)

  const documents = useQuery(api.documents.getEveryoneDocuments)
  return (
    <div className="mt-4 flex flex-col mx-4 lg:mx-0">
      <div className="flex">
        <Input placeholder="Search for Documents" className="h-10" />
        <AddDocumentDialog accessType="EVERYONE" className="mx-4"/>
        <Dialog open={dialogOpen}>
          <DialogTrigger asChild onClick={() => setDialogOpen(true)}>
            <Button variant={"outline"}>Link Existing</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Link Existing Document</DialogTitle>
              <DialogDescription>Link an existing document to your project.</DialogDescription>
            </DialogHeader>
            <div>
              {documents?.length === 0 ? (
                <p>No documents found.</p>
              ) : (
                <div>
                  {documents?.map((document: any) => (
                    <div key={document._id} className="flex items-center justify-between">
                      <p>{document.name}</p>
                      <Button variant={"outline"} onClick={async () => {
                        await linkDocument({ projectId: project._id, documentId: document._id })
                        setDialogOpen(false)
                        toast.success("Document linked!")
                      }}>Link</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        {documents?.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documents?.map((document: any) => (
              <Link href={`/dashboard/text-editor/doc/${document._id}`} key={document._id} className="w-full md:w-[700px]">
                <Card className="flex items-center justify-between w-full md:w-[400px] px-3 py-4">
                  <p>{document.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentsTab
