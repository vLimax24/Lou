"use client"

import { useParams } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Editor from "@/components/editor/advanced-editor"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const TextEditor = () => {
    const params = useParams<any>()
    const docId = params.id
    const updateDocument = useMutation(api.documents.updateContent)
    const documentQuery = useQuery(api.documents.getSpecificDocument, { documentId: docId })
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState("")
    const [editedContent] = useState("")

    useEffect(() => {
        if (documentQuery?.content !== undefined) {
            setContent(documentQuery?.content)
            setLoading(false)
        }
    }, [documentQuery?.content])

    useEffect(() => {
        const updateContent = async () => {
            await updateDocument({
                documentId: docId,
                newContent: editedContent
            })
            console.log("Content updated ran successfully")
        }

        if (editedContent !== "") {
            updateContent()
        }
    }, [editedContent, docId, updateDocument])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col p-6 border max-w-xl w-full gap-6 rounded-md bg-card">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-semibold">{loading ? (<Skeleton className="w-64 h-12 rounded-md"/>) : documentQuery?.name}</h1>
                </div>
                {loading ? (
                    <div>
                        <Skeleton className="w-72 h-8 rounded-md my-2"/>
                        <Skeleton className="w-48 h-8 rounded-md my-2"/>
                        <Skeleton className="w-96 h-8 rounded-md my-2"/>
                        <Skeleton className="w-56 h-8 rounded-md my-2"/>
                    </div>
                ) : (
                    <Editor textContent={content} docId={docId} />
                )}
            </div>
        </main>
    )
}

export default TextEditor
